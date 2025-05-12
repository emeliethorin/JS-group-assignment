import React from 'react'
import { Card } from "react-bootstrap";
import './Login.css'; 

const PageTitle = () => {
  return (
    <>
      <div className="container">
        <Card className="text-left p-1 mb-5 shadowrounded transparent-card">
          <Card.Title>
            <h1 className="title text-center text-info mb-0">Memory Game</h1>
          </Card.Title>
        </Card>
      </div>
    </>
  )
}

export default PageTitle
