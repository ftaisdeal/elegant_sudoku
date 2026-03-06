import React from 'react'

export default function Status({ gameCompleted, errorCount }) {
  return (
    <div className="status-container">
      {gameCompleted ? (
        <div className="status-success">
          🎉 Congratulations! Puzzle Solved! 🎉
        </div>
      ) : errorCount > 0 ? (
        <div className="status-error">
          ⚠️ {errorCount} error{errorCount > 1 ? 's' : ''} found - check highlighted squares
        </div>
      ) : null}
    </div>
  )
}
