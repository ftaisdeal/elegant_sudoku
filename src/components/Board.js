import React, { Component } from 'react'
import Square from './Square'

class Board extends Component {
  render() {
    return (
      <div>
        <div>
          <Square id={0} value={this.state.values[0]} readOnly={this.state.squares[0].readOnly} />
          <Square id={1} value={this.state.values[1]} />
          <Square id={2} value={this.state.values[2]} />
          <Square id={3} value={this.state.values[3]} />
          <Square id={4} value={this.state.values[4]} />
          <Square id={5} value={this.state.values[5]} />
          <Square id={6} value={this.state.values[6]} />
          <Square id={7} value={this.state.values[7]} />
          <Square id={8} value={this.state.values[8]} />
        </div>
        <div>
          <Square id={9} value={this.state.values[9]} readOnly={this.state.squares[0].readOnly} />
          <Square id={10} value={this.state.values[10]} />
          <Square id={11} value={this.state.values[11]} />
          <Square id={12} value={this.state.values[12]} />
          <Square id={13} value={this.state.values[13]} />
          <Square id={14} value={this.state.values[14]} />
          <Square id={15} value={this.state.values[15]} />
          <Square id={16} value={this.state.values[16]} />
          <Square id={17} value={this.state.values[17]} />
        </div>
      </div>
    )
  }
}

export default Board
