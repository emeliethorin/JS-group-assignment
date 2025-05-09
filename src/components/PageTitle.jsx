import React from 'react'
import { Card } from "react-bootstrap";
const PageTitle = () => {
  return (
    <>
      <div className="container">
        <Card className="text-left p-1 mb-5 shadowrounded transparent-card">
          <Card.Title>
            <h1 className="text-center text-info mb-0">Memory Game</h1>
          </Card.Title>
        </Card>
      </div>
    </>
  )
}

export default PageTitle
