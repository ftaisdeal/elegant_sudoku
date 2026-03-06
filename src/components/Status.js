import React from 'react'

export default function Status({ gameCompleted, errorCount }) {
  return (
    <div style={{ 
      textAlign: 'center', 
      marginBottom: '10px',
      padding: '5px',
      borderRadius: '8px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {gameCompleted ? (
        <div style={{ 
          backgroundColor: '#4caf50', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '6px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          🎉 Congratulations! Puzzle Solved! 🎉
        </div>
      ) : errorCount > 0 ? (
        <div style={{ 
          backgroundColor: '#ff9800', 
          color: 'white', 
          padding: '8px 16px', 
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          ⚠️ {errorCount} error{errorCount > 1 ? 's' : ''} found - check highlighted squares
        </div>
      ) : null}
    </div>
  )
}
