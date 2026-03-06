import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import sudoku from 'sudoku'
import Square from './components/Square'
import Number from './components/Number'
import Status from './components/Status'

function generateNewPuzzle() {
  // Generate a single puzzle and its solution (FIXED: was generating different puzzles)
  const rawPuzzle = sudoku.makepuzzle()
  const puzzle = rawPuzzle.map(e => (e != null) ? e + 1 : e)
  const solution = sudoku.solvepuzzle(rawPuzzle).map(e => e + 1)
  
  // Create square metadata more efficiently
  const squares = puzzle.map((item, index) => ({
    id: index,
    readOnly: item !== null
  }))
  
  return { puzzle, solution, squares }
}

const initialPuzzle = generateNewPuzzle()
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] // Avoid recreating array on each render

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
    
    // Helper function to check for duplicates in a group
    const checkGroup = (indices) => {
      const seen = new Map() // Track value -> first index
      for (const index of indices) {
        const value = values[index]
        if (value !== null) {
          if (seen.has(value)) {
            // Mark both original and duplicate as errors
            errors.add(seen.get(value))
            errors.add(index)
          } else {
            seen.set(value, index)
          }
        }
      }
    }
    
    // Check all rows
    for (let row = 0; row < 9; row++) {
      const rowIndices = Array.from({ length: 9 }, (_, col) => row * 9 + col)
      checkGroup(rowIndices)
    }
    
    // Check all columns  
    for (let col = 0; col < 9; col++) {
      const colIndices = Array.from({ length: 9 }, (_, row) => row * 9 + col)
      checkGroup(colIndices)
    }
    
    // Check all 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const boxIndices = []
        for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
          for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
            boxIndices.push(row * 9 + col)
          }
        }
        checkGroup(boxIndices)
      }
    }
    
    return errors
  }

  checkWinCondition = (values, errors = null) => {
    // Check if all squares are filled
    if (values.some(value => value === null)) return false
    
    // If errors already computed, use them; otherwise validate
    const validationErrors = errors !== null ? errors : this.validateSudoku(values)
    return validationErrors.size === 0
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
    const newValues = [...this.state.currentValues]
    newValues[index] = number
    
    // Single validation pass - reuse errors for win check
    const errors = this.validateSudoku(newValues)
    const gameCompleted = this.checkWinCondition(newValues, errors)
    
    this.setState({
      currentValues: newValues,
      errors,
      gameCompleted,
      selectedSquare: null,
      selectedNumber: null
    })
  }

  clearSquare = () => {
    const { selectedSquare, squares, currentValues } = this.state
    
    if (selectedSquare !== null && !squares[selectedSquare].readOnly) {
      const newValues = [...currentValues]
      newValues[selectedSquare] = null
      
      const errors = this.validateSudoku(newValues)
      
      this.setState({
        currentValues: newValues,
        errors,
        selectedSquare: null
      })
    }
  }

  renderClearButton = () => {
    const { selectedSquare, squares, currentValues } = this.state
    const canClear = selectedSquare !== null && 
                    currentValues[selectedSquare] !== null && 
                    !squares[selectedSquare]?.readOnly
    
    return (
      <button
        onClick={this.clearSquare}
        className={`clear-button ${canClear ? 'enabled' : 'disabled'}`}
        disabled={!canClear}
      >
        clear
      </button>
    )
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
          <div className="number-buttons-row">
            {NUMBERS.map(number => (
              <Number
                key={number}
                value={number}
                onClick={() => this.handleNumberClick(number)}
                isSelected={this.state.selectedNumber === number}
              />
            ))}
          </div>
          <div className="clear-button-row">
            {this.renderClearButton()}
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