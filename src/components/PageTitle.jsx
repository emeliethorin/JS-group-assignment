import React from 'react'
import { Card } from "react-bootstrap";
import './Login.css'; 

const PageTitle = () => {
  return (
    <>
      <div className="container">
        <Card className="title-container">
          <Card.Title>
            <h1 className="pagetitle">Memory Game</h1>
          </Card.Title>
        </Card>
      </div>
    </>
  )
}

export default PageTitle;
