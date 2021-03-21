import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import sudoku from 'sudoku'
import Square from './components/Square'

let values = sudoku.makepuzzle().map(e => (e != null) ? e + 1 : e)

let squares = []

function setSquareProps(item, index) {
  let readOnly = false
  if (item != null) {
    readOnly = true
  }

  squares.push({
    id: index,
    readOnly: readOnly
  })
}

values.forEach(setSquareProps)

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: values,
      squares: [squares]
    }
  }

  render() {
    return <div>
      <div>
        <Square id={0} value={this.state.values[0]} readOnly={this.state.squares[0][0].readOnly} />
        <Square id={1} value={this.state.values[1]} readOnly={this.state.squares[0][1].readOnly} />
        <Square id={2} value={this.state.values[2]} readOnly={this.state.squares[0][2].readOnly} />
        <Square id={3} value={this.state.values[3]} readOnly={this.state.squares[0][3].readOnly} />
        <Square id={4} value={this.state.values[4]} readOnly={this.state.squares[0][4].readOnly} />
        <Square id={5} value={this.state.values[5]} readOnly={this.state.squares[0][5].readOnly} />
        <Square id={6} value={this.state.values[6]} readOnly={this.state.squares[0][6].readOnly} />
        <Square id={7} value={this.state.values[7]} readOnly={this.state.squares[0][7].readOnly} />
        <Square id={8} value={this.state.values[8]} readOnly={this.state.squares[0][8].readOnly} />
      </div>
      <div>
        <Square id={9} value={this.state.values[9]} readOnly={this.state.squares[0][9].readOnly} />
        <Square id={10} value={this.state.values[10]} readOnly={this.state.squares[0][10].readOnly} />
        <Square id={11} value={this.state.values[11]} readOnly={this.state.squares[0][11].readOnly} />
        <Square id={12} value={this.state.values[12]} readOnly={this.state.squares[0][12].readOnly} />
        <Square id={13} value={this.state.values[13]} readOnly={this.state.squares[0][13].readOnly} />
        <Square id={14} value={this.state.values[14]} readOnly={this.state.squares[0][14].readOnly} />
        <Square id={15} value={this.state.values[15]} readOnly={this.state.squares[0][15].readOnly} />
        <Square id={16} value={this.state.values[16]} readOnly={this.state.squares[0][16].readOnly} />
        <Square id={17} value={this.state.values[17]} readOnly={this.state.squares[0][17].readOnly} />
      </div>
      <div className="rowEdge">
        <Square id={18} value={this.state.values[18]} readOnly={this.state.squares[0][18].readOnly} />
        <Square id={19} value={this.state.values[19]} readOnly={this.state.squares[0][19].readOnly} />
        <Square id={20} value={this.state.values[20]} readOnly={this.state.squares[0][20].readOnly} />
        <Square id={21} value={this.state.values[21]} readOnly={this.state.squares[0][21].readOnly} />
        <Square id={22} value={this.state.values[22]} readOnly={this.state.squares[0][22].readOnly} />
        <Square id={23} value={this.state.values[23]} readOnly={this.state.squares[0][23].readOnly} />
        <Square id={24} value={this.state.values[24]} readOnly={this.state.squares[0][24].readOnly} />
        <Square id={25} value={this.state.values[25]} readOnly={this.state.squares[0][25].readOnly} />
        <Square id={26} value={this.state.values[26]} readOnly={this.state.squares[0][26].readOnly} />
      </div>
      <div>
        <Square id={27} value={this.state.values[27]} readOnly={this.state.squares[0][27].readOnly} />
        <Square id={28} value={this.state.values[28]} readOnly={this.state.squares[0][27].readOnly} />
        <Square id={29} value={this.state.values[29]} readOnly={this.state.squares[0][29].readOnly} />
        <Square id={30} value={this.state.values[30]} readOnly={this.state.squares[0][30].readOnly} />
        <Square id={31} value={this.state.values[31]} readOnly={this.state.squares[0][31].readOnly} />
        <Square id={32} value={this.state.values[32]} readOnly={this.state.squares[0][32].readOnly} />
        <Square id={33} value={this.state.values[33]} readOnly={this.state.squares[0][33].readOnly} />
        <Square id={34} value={this.state.values[34]} readOnly={this.state.squares[0][34].readOnly} />
        <Square id={35} value={this.state.values[35]} readOnly={this.state.squares[0][35].readOnly} />
      </div>
      <div>
        <Square id={36} value={this.state.values[36]} readOnly={this.state.squares[0][36].readOnly} />
        <Square id={37} value={this.state.values[37]} readOnly={this.state.squares[0][37].readOnly} />
        <Square id={38} value={this.state.values[38]} readOnly={this.state.squares[0][38].readOnly} />
        <Square id={39} value={this.state.values[39]} readOnly={this.state.squares[0][39].readOnly} />
        <Square id={40} value={this.state.values[40]} readOnly={this.state.squares[0][40].readOnly} />
        <Square id={41} value={this.state.values[41]} readOnly={this.state.squares[0][41].readOnly} />
        <Square id={42} value={this.state.values[42]} readOnly={this.state.squares[0][42].readOnly} />
        <Square id={43} value={this.state.values[43]} readOnly={this.state.squares[0][43].readOnly} />
        <Square id={44} value={this.state.values[44]} readOnly={this.state.squares[0][44].readOnly} />
      </div>
      <div className="rowEdge">
        <Square id={45} value={this.state.values[45]} readOnly={this.state.squares[0][45].readOnly} />
        <Square id={46} value={this.state.values[46]} readOnly={this.state.squares[0][46].readOnly} />
        <Square id={47} value={this.state.values[47]} readOnly={this.state.squares[0][47].readOnly} />
        <Square id={48} value={this.state.values[48]} readOnly={this.state.squares[0][48].readOnly} />
        <Square id={49} value={this.state.values[49]} readOnly={this.state.squares[0][49].readOnly} />
        <Square id={50} value={this.state.values[50]} readOnly={this.state.squares[0][50].readOnly} />
        <Square id={51} value={this.state.values[51]} readOnly={this.state.squares[0][51].readOnly} />
        <Square id={52} value={this.state.values[52]} readOnly={this.state.squares[0][52].readOnly} />
        <Square id={53} value={this.state.values[53]} readOnly={this.state.squares[0][53].readOnly} />
      </div>
      <div>
        <Square id={54} value={this.state.values[54]} readOnly={this.state.squares[0][54].readOnly} />
        <Square id={55} value={this.state.values[55]} readOnly={this.state.squares[0][55].readOnly} />
        <Square id={56} value={this.state.values[56]} readOnly={this.state.squares[0][56].readOnly} />
        <Square id={57} value={this.state.values[57]} readOnly={this.state.squares[0][57].readOnly} />
        <Square id={58} value={this.state.values[58]} readOnly={this.state.squares[0][58].readOnly} />
        <Square id={59} value={this.state.values[59]} readOnly={this.state.squares[0][59].readOnly} />
        <Square id={60} value={this.state.values[60]} readOnly={this.state.squares[0][60].readOnly} />
        <Square id={61} value={this.state.values[61]} readOnly={this.state.squares[0][61].readOnly} />
        <Square id={62} value={this.state.values[62]} readOnly={this.state.squares[0][62].readOnly} />
      </div>
      <div>
        <Square id={63} value={this.state.values[63]} readOnly={this.state.squares[0][63].readOnly} />
        <Square id={64} value={this.state.values[64]} readOnly={this.state.squares[0][64].readOnly} />
        <Square id={65} value={this.state.values[65]} readOnly={this.state.squares[0][65].readOnly} />
        <Square id={66} value={this.state.values[66]} readOnly={this.state.squares[0][66].readOnly} />
        <Square id={67} value={this.state.values[67]} readOnly={this.state.squares[0][67].readOnly} />
        <Square id={68} value={this.state.values[68]} readOnly={this.state.squares[0][68].readOnly} />
        <Square id={69} value={this.state.values[69]} readOnly={this.state.squares[0][69].readOnly} />
        <Square id={70} value={this.state.values[70]} readOnly={this.state.squares[0][70].readOnly} />
        <Square id={71} value={this.state.values[71]} readOnly={this.state.squares[0][71].readOnly} />
      </div>
      <div>
        <Square id={72} value={this.state.values[72]} readOnly={this.state.squares[0][72].readOnly} />
        <Square id={73} value={this.state.values[73]} readOnly={this.state.squares[0][73].readOnly} />
        <Square id={74} value={this.state.values[74]} readOnly={this.state.squares[0][74].readOnly} />
        <Square id={75} value={this.state.values[75]} readOnly={this.state.squares[0][75].readOnly} />
        <Square id={76} value={this.state.values[76]} readOnly={this.state.squares[0][76].readOnly} />
        <Square id={77} value={this.state.values[77]} readOnly={this.state.squares[0][77].readOnly} />
        <Square id={78} value={this.state.values[78]} readOnly={this.state.squares[0][78].readOnly} />
        <Square id={79} value={this.state.values[79]} readOnly={this.state.squares[0][79].readOnly} />
        <Square id={80} value={this.state.values[80]} readOnly={this.state.squares[0][80].readOnly} />
      </div>
    </div>;
  }
}

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

ReactDOM.render(<Game />, document.getElementById("root"));