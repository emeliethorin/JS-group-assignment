import React, { useState, useEffect } from 'react';
import './MemoryGame.css'; 
import ResetButton from './ResetButton';
import Card from './Card';
import { supabase } from '../supabaseClient';
import GameStats from './Gamestats';
import LogoutButton from './LogoutButton';

//emojis
const generateShuffledCards = () => {
const cardValues = ['🐶','🐶','🐱','🐱','🦊','🦊','🐻','🐻','🐸','🐸','🐵','🐵','🐔','🐔','🐧','🐧'];

// Shuffle the cards randomly
const shuffledCards = cardValues.sort(() => Math.random() - 0.5);
  return shuffledCards.map((value, index) => ({
  id: index,
  value,
  isFlipped: false,
  isMatched: false,
  }));
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateShuffledCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [userName, setUserName] = useState('');
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [playerScore, setPlayerScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  const resetGame = () => {
    setCards(generateShuffledCards());
    setFlippedIndices([]);
    setMatchedPairs(0);
    setMoves(0);
    setTime(0);
    setTimerActive(false);
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setMoves ((m) => m + 1);
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.value === secondCard.value) {
        // Cards match
        setMatchedPairs(prev => prev + 1);
        setCards(prevCards =>
          prevCards.map(card =>
            card.value === firstCard.value ? { ...card, isMatched: true } : card
          )
        );
        
      } else {
        // Cards don't match, flip them back after delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.isMatched ? card : { ...card, isFlipped: false }
            )
          );
        }, 1500);
      }
      // Clear flipped cards
      setFlippedIndices([]);
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index) => {
    const card = cards[index];
    if (card.isFlipped || card.isMatched || flippedIndices.length === 2) {
      return;
    }

    // Start the timer 
    if (!timerActive && moves === 0 && flippedIndices.length === 0) {
      setTimerActive(true);
    }

    // Flip the card
    setCards(prevCards =>
      prevCards.map((c, idx) =>
        idx === index ? { ...c, isFlipped: true } : c
      )
    );
    setFlippedIndices(prev => [...prev, index]);
  };
  
  // Insert the score into Supabase
  const postScoreAndFetchLeaderboard = async () => {
    console.log("Posting score to Supabase");

    try {
    const { error: insertError } = await supabase
      .from('scores')
      .insert([
      {
        player_name: userName || 'Player 1', 
        moves,
        time
      }
      ])
      .select()
      .single();
  
      if (insertError) {
        console.error('Error inserting score:', insertError);
        return;
      }
      

    // Set player score
    setPlayerScore({ name: userName || 'Player 1', moves, time });
    
    // Fetch leaderbord, ranked by time
    const { data, error: fetchError } = await supabase
    .from('scores')
    .select('*')
    .order('time', { ascending: true })
    .limit(5);

  if (fetchError) {
    console.error('Error fetching leaderboard:', fetchError);
    return;
  }

  setLeaderboard(data);
  } catch (err) {
  console.error('Unexpected error:', err);
  }
  };

  useEffect(() => {
  const allMatched = cards.every((card) => card.isMatched);
  if (allMatched) {
    setTimerActive(false);
    postScoreAndFetchLeaderboard(); 
  }
  }, [cards]);
  

  return (
    <div className="memory-game">
      <div className="header">
        <h1>🐾 Memory game</h1>
          <div className="game-stats">
            <span className="stats">Player: {userName}</span>
            <span className="stats">Moves: {moves}</span>
            <span className="stats">
              Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
            </span>
          </div>
      </div>
      <div className="grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {matchedPairs === 8 && (
        <div className="win-overlay">
          <div className="win-message">
            <h2>🥳🎉 You Win! 🎉🏆</h2>
            <button className="play-again-btn" onClick={resetGame}>
              Play again!
            </button>

            {/* "Your Score" */}
            {playerScore && (
              <div className="your-score">
                <h3>🧍 Your Score</h3>
                <p>
                  {playerScore.name} — {playerScore.moves} moves, {playerScore.time}s
                </p>
              </div>
            )}
            {/* Leaderboard section */}
            {leaderboard.length > 0 && (
              <div className="leaderboard-container">
                <h3>🏅 Leaderboard (Top 5 by Time)</h3>
                <ul className="leaderboard">
                  {leaderboard.map((entry, index) => (
                    <li key={entry.id}>
                      {index + 1}. {entry.player_name} — {entry.moves} moves, {entry.time}s
              </li>
            ))}
          </ul>
        </div>
      )}
          </div>
        </div>
      )}
      <ResetButton onReset={resetGame} />
      
    </div>
  );
};

export default MemoryGame;
