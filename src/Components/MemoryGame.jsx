import React, { useState, useEffect } from 'react';
import './MemoryGame.css'; 
import ResetButton from './ResetButton';
import Card from './Card';
import { supabase } from './supabaseClient';

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
  const [userName, setUserName] = useState('Player 1');
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

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
    // Flip the card
    setCards(prevCards =>
      prevCards.map((c, idx) =>
        idx === index ? { ...c, isFlipped: true } : c
      )
    );
    setFlippedIndices(prev => [...prev, index]);
  };

  // Win - all cards matched
  useEffect(() => {
    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched) {
      setTimerActive(false);
  
      const postScore = async () => {
        const { error } = await supabase
          .from('Leaderboard')
          .insert([
            {
              name: userName,
              moves,
              time
            }
          ]);
  
        if (error) {
          console.error('Error posting score:', error);
        } else {
          console.log('Score successfully posted to Supabase!');
        }
      };
  
      postScore();
    }
  }, [cards]);
  


  return (
    <div className="memory-game">
      <div className="header">
        <h1>🐾 Memory game</h1>
          <div className="stats">
            <span>Player: {userName}</span>
            <span>Moves: {moves}</span>
            <span>
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
            <p>🥳🎉 You Win! 🎉🏆</p>
            <button className="play-again-btn" onClick={resetGame}>
              🔁 Play Again
            </button>

            {/* Leaderboard section */}
            {leaderboard.length > 0 && (
              <div className="leaderboard-container">
                <h3>🏅 Leaderboard (Top 5 by Time)</h3>
                <ul className="leaderboard">
                  {leaderboard.map((entry, index) => (
                    <li key={entry.id}>
                      {index + 1}. {entry.name} — {entry.moves} moves, {entry.time}s
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
