import React, { Component } from 'react';
import './App.css';
import { Grid } from './components/grid';

let emptyMatrix = new Array(50).fill(new Array(50));
emptyMatrix.forEach(el => {
  el.fill(0);
});

class App extends Component {
  constructor(props) {
    super(props);
    const matrix = JSON.parse(JSON.stringify(emptyMatrix)).map(array =>
      array.map(el => {
        const num = Math.floor(Math.random() * 10) + 1;
        if (num % 2 === 0) return 0;
        else return 1;
      })
    );
    this.state = {
      matrix,
      newMatrix: JSON.parse(JSON.stringify(emptyMatrix))
    };
  }

  changeMatrixStateWIthLog(matrix) {
    this.setState({ matrix });
  }

  componentDidMount() {
    this.matrixChange();
    setInterval(() => {
      this.matrixChange();
      console.log(this.state.matrix);
    }, 4000);
  }

  matrixChange() {
    let { newMatrix } = this.state;
    for (let i = 0; i < this.state.matrix.length; i++) {
      for (let j = 0; j < this.state.matrix.length; j++) {
        const top =
          this.state.matrix[i - 1] === undefined
            ? 0
            : this.state.matrix[i - 1][j];
        const bottom =
          this.state.matrix[i + 1] === undefined
            ? 0
            : this.state.matrix[i + 1][j];
        const left =
          this.state.matrix[i][j - 1] === undefined
            ? 0
            : this.state.matrix[i][j - 1];
        const right =
          this.state.matrix[i][j + 1] === undefined
            ? 0
            : this.state.matrix[i][j + 1];
        const topLeft =
          this.state.matrix[i + 1] === undefined || j - 1 === -1
            ? 0
            : this.state.matrix[i + 1][j - 1];
        const topRight =
          this.state.matrix[i + 1] === undefined ||
          this.state.matrix[i + 1][j + 1] === undefined
            ? 0
            : this.state.matrix[i + 1][j + 1];
        const bottomLeft =
          i - 1 === -1 || j - 1 === -1 ? 0 : this.state.matrix[i - 1][j - 1];
        const bottomRight =
          i - 1 === -1 || this.state.matrix[i - 1][j + 1] === undefined
            ? 0
            : this.state.matrix[i - 1][j + 1];
        const sum =
          top +
          left +
          right +
          bottom +
          topLeft +
          topRight +
          bottomLeft +
          bottomRight;
        if (sum < 2) {
          newMatrix[i][j] = 0;
        } else if ((sum === 2 || sum === 3) && this.state.matrix[i][j] === 1) {
          newMatrix[i][j] = 1;
        } else if (sum > 3) {
          newMatrix[i][j] = 0;
        } else if (sum === 3 && this.state.matrix[i][j] === 0) {
          newMatrix[i][j] = 1;
        }
      }
    }
    this.setState({
      matrix: newMatrix,
      newMatrix: JSON.parse(JSON.stringify(emptyMatrix))
    });
  }

  render() {
    const gridList = this.state.matrix.map((list, id) => (
      <Grid key={id} list={list} />
    ));
    return (
      <div className="App">
        <header className="App-header">
          <p>Assignment Project By Ayush</p>
          <a className="App-link" href="/" rel="noopener noreferrer">
            Page refresh
          </a>
          <div className="grid-list">{gridList}</div>
        </header>
      </div>
    );
  }
}

export default App;
