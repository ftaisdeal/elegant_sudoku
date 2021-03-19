import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Square from './components/Square';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8
      ],
      squares: [{
        readOnly: true,
      }]
    }
  }

  render() {
    return <div>
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
    </div>;
  }
}


// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

ReactDOM.render(<Game />, document.getElementById("root"));