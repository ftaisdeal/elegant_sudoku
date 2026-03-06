import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import sudoku from 'sudoku'
import Square from './components/Square'
import Number from './components/Number'
import Status from './components/Status'

function generateNewPuzzle() {
  const puzzle = sudoku.makepuzzle().map(e => (e != null) ? e + 1 : e)
  const solution = sudoku.solvepuzzle(sudoku.makepuzzle()).map(e => e + 1)
  const squares = []
  
  function setSquareProps(item, index) {
    const readOnly = (item != null) ? true : false
    squares.push({
      id: index,
      readOnly: readOnly
    })
  }
  
  puzzle.forEach(setSquareProps)
  
  return { puzzle, solution, squares }
}

const initialPuzzle = generateNewPuzzle()

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPuzzle: initialPuzzle.puzzle.slice(),
      currentValues: initialPuzzle.puzzle.slice(),
      solution: initialPuzzle.solution,
      squares: initialPuzzle.squares,
      selectedSquare: null,
      selectedNumber: null,
      gameCompleted: false,
      errors: new Set()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress = (event) => {
    // Ignore if game is completed
    if (this.state.gameCompleted) return
    
    const key = event.key
    
    // Handle number keys 1-9
    if (key >= '1' && key <= '9') {
      event.preventDefault()
      const number = parseInt(key)
      this.handleNumberClick(number)
    }
    
    // Handle delete/backspace keys
    else if (key === 'Delete' || key === 'Backspace') {
      event.preventDefault()
      this.clearSquare()
    }
    
    // Handle escape to deselect
    else if (key === 'Escape') {
      event.preventDefault()
      this.setState({ selectedSquare: null, selectedNumber: null })
    }
  }

  newGame = () => {
    const newPuzzle = generateNewPuzzle()
    this.setState({
      initialPuzzle: newPuzzle.puzzle.slice(),
      currentValues: newPuzzle.puzzle.slice(),
      solution: newPuzzle.solution,
      squares: newPuzzle.squares,
      selectedSquare: null,
      selectedNumber: null,
      gameCompleted: false,
      errors: new Set()
    })
  }

  validateSudoku = (values) => {
    const errors = new Set()
    
    // Check rows
    for (let row = 0; row < 9; row++) {
      const seen = new Set()
      for (let col = 0; col < 9; col++) {
        const index = row * 9 + col
        const value = values[index]
        if (value !== null) {
          if (seen.has(value)) {
            errors.add(index)
            // Mark all duplicates in this row
            for (let c = 0; c < 9; c++) {
              if (values[row * 9 + c] === value) {
                errors.add(row * 9 + c)
              }
            }
          }
          seen.add(value)
        }
      }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const seen = new Set()
      for (let row = 0; row < 9; row++) {
        const index = row * 9 + col
        const value = values[index]
        if (value !== null) {
          if (seen.has(value)) {
            errors.add(index)
            // Mark all duplicates in this column
            for (let r = 0; r < 9; r++) {
              if (values[r * 9 + col] === value) {
                errors.add(r * 9 + col)
              }
            }
          }
          seen.add(value)
        }
      }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const seen = new Set()
        for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
          for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
            const index = row * 9 + col
            const value = values[index]
            if (value !== null) {
              if (seen.has(value)) {
                errors.add(index)
                // Mark all duplicates in this box
                for (let r = boxRow * 3; r < boxRow * 3 + 3; r++) {
                  for (let c = boxCol * 3; c < boxCol * 3 + 3; c++) {
                    if (values[r * 9 + c] === value) {
                      errors.add(r * 9 + c)
                    }
                  }
                }
              }
              seen.add(value)
            }
          }
        }
      }
    }

    return errors
  }

  checkWinCondition = (values) => {
    // Check if all squares are filled
    for (let i = 0; i < 81; i++) {
      if (values[i] === null) return false
    }
    
    // Check if no errors exist
    const errors = this.validateSudoku(values)
    return errors.size === 0
  }

  handleSquareClick = (index) => {
    if (this.state.squares[index].readOnly || this.state.gameCompleted) return
    
    this.setState({ selectedSquare: index })
    
    // If we have a selected number, place it
    if (this.state.selectedNumber !== null) {
      this.placeNumber(index, this.state.selectedNumber)
    }
  }

  handleNumberClick = (number) => {
    this.setState({ selectedNumber: number })
    
    // If we have a selected square, place the number
    if (this.state.selectedSquare !== null && !this.state.squares[this.state.selectedSquare].readOnly) {
      this.placeNumber(this.state.selectedSquare, number)
    }
  }

  placeNumber = (index, number) => {
    const newValues = this.state.currentValues.slice()
    newValues[index] = number
    
    const errors = this.validateSudoku(newValues)
    const gameCompleted = this.checkWinCondition(newValues)
    
    this.setState({
      currentValues: newValues,
      errors: errors,
      gameCompleted: gameCompleted,
      selectedSquare: null,
      selectedNumber: null
    })
  }

  clearSquare = () => {
    if (this.state.selectedSquare !== null && !this.state.squares[this.state.selectedSquare].readOnly) {
      const newValues = this.state.currentValues.slice()
      newValues[this.state.selectedSquare] = null
      
      const errors = this.validateSudoku(newValues)
      
      this.setState({
        currentValues: newValues,
        errors: errors,
        selectedSquare: null
      })
    }
  }

  render() {
    return (
      <div className="game-container">        
        <div className="sudoku-grid">
          {this.state.currentValues.map((value, index) => (
            <Square
              key={index}
              id={index}
              value={value}
              readOnly={this.state.squares[index].readOnly}
              isSelected={this.state.selectedSquare === index}
              hasError={this.state.errors.has(index)}
              onClick={() => this.handleSquareClick(index)}
            />
          ))}
        </div>

        <div className="control-panel">
          <div className="button-row">
            {[1,2,3,4,5,6,7,8,9].map(number => (
              <Number
                key={number}
                value={number}
                onClick={() => this.handleNumberClick(number)}
                isSelected={this.state.selectedNumber === number}
              />
            ))}
            <div className="button-spacer"></div>
            <button
              onClick={this.clearSquare}
              className={`clear-button ${
                (this.state.selectedSquare !== null && 
                 this.state.currentValues[this.state.selectedSquare] !== null && 
                 !this.state.squares[this.state.selectedSquare]?.readOnly) ? 
                'enabled' : 'disabled'
              }`}
              disabled={this.state.selectedSquare === null || 
                       this.state.squares[this.state.selectedSquare]?.readOnly ||
                       this.state.currentValues[this.state.selectedSquare] === null}
            >
              clear
            </button>
          </div>
        </div>

        <Status 
          gameCompleted={this.state.gameCompleted}
          errorCount={this.state.errors.size}
        />

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={this.newGame}
            className="new-game-button"
          >
            new game
          </button>
        </div>
        <div className="keyboard-hint">
          Keyboard: Press 1-9 to enter numbers, Delete or Backspace to clear, Esc to deselect.
        </div>
      </div>
    )
  }
}

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

ReactDOM.render(<Game />, document.getElementById("root"));