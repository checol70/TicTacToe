import React, { Component } from "react";
import "./Home.css";
class Home extends Component {
  state = {
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    decode: ["X", "", "O"],
    winner: ""
  };
  showState = () => {
    let table = [];
    this.state.board.forEach((element, rowNum) => {
      let row = [];
      element.forEach((val, itemNum) => {
        row.push(
          <p
            className="shower"
            key={rowNum.toString() + itemNum.toString()}
            onClick={() => {
              if (val === 0) this.makeMove(rowNum, itemNum);
            }}
          >
            {"\u00a0" + this.state.decode[val + 1] + "\u00a0"}
          </p>
        );
      });
      table.push(
        <div className="row" key={rowNum}>
          {row}
        </div>
      );
    });
    return table;
  };

  checkWin = board => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][2] === board[i][1] &&
        board[i][0] !== 0
      ) {
        return board[i][0];
      }
      if (
        board[0][i] === board[1][i] &&
        board[2][i] === board[1][i] &&
        board[0][i] !== 0
      ) {
        return board[0][i];
      }
    }
    if (
      board[0][0] === board[1][1] &&
      board[2][2] === board[1][1] &&
      board[1][1] !== 0
    ) {
      return board[0][0];
    }
    if (
      board[0][2] === board[1][1] &&
      board[2][0] === board[1][1] &&
      board[1][1] !== 0
    ) {
      return board[0][2];
    }
    return 0;
  };

  makeMove = (i, j) => {
    if (this.state.winner === "") {
      let state = this.state;
      state.board[i][j] = -1;

      let winner = this.checkWin(state.board);
      let draw =
        state.board[0]
          .concat(state.board[1])
          .concat(state.board[2])
          .indexOf(0) === -1;
      if (winner === 0 && !draw) {
        state = this.computerMakeMove(state);
        winner = this.checkWin(state.board);
      }
      if (draw) {
        state.winner = "Stalemate";
      } else {
        state.winner = state.decode[winner + 1];
      }
      this.setState(state);
    }
  };

  getPossibleMoves = (board, value) => {
    let possibleMoves = [];
    board.forEach((row, rowNum) => {
      row.forEach((value, valueNum) => {
        if (value === 0) possibleMoves.push([rowNum, valueNum]);
      });
    });
    const possibleBoardStates = [];
    possibleMoves.forEach(e => {
      let tempBoard = JSON.parse(JSON.stringify(board));
      possibleBoardStates.push(tempBoard);
    });
    possibleBoardStates.forEach((e, i) => {
      e[possibleMoves[i][0]][possibleMoves[i][1]] = value;
    });
    return possibleBoardStates;
  };

  test = (board, recursionLevel, previousLevel, minMax) => {
    let possibles = this.getPossibleMoves(
      board,
      recursionLevel % 2 !== 1 ? 1 : -1
    );
    let chances = possibles.map(e => this.checkWin(e));
    let currentLevel = {
      possibles,
      chances,
      recursionLevel
    };
    const twoMoves = [];
    if (recursionLevel < 3 && !currentLevel.chances.includes(-1)) {
      recursionLevel++;
      for (let i = 0; i < possibles.length; i++) {
        if (chances[i] === 0) {
          const check = this.test(
            possibles[i],
            parseInt(recursionLevel.toString()),
            currentLevel
          );

          twoMoves.push(check);
        }
      }
    }
    currentLevel.twoMoves = twoMoves;
    return currentLevel;
  };

  getDifferentLevel(twoMoves) {
    twoMoves.forEach((e, i) => {
      if (!e.chances.includes(-1) && e.chances.includes(1)) {
        return i;
      }
    });
    return 0;
  }

  getIdealChoice(results) {
    const win = results.chances.indexOf(1);
    if (win > -1) {
      return results.possibles[win];
    }
    const minResults = results.twoMoves.map(move => Math.min(...move.chances));
    let correctChoice = minResults.indexOf(Math.max(...minResults));
    return results.possibles[correctChoice];
  }

  computerMakeMove = state => {
    //first we check to see if we are in the first turn, since this will simplify the number of calculations, and guarantee the correct first choice.
    const filledPlaces = state.board.map(row =>
      row.map(value => Math.abs(value))
    );
    const totalMoves = filledPlaces.reduce(
      (a, b) => a + b.reduce((c, d) => c + d, 0),
      0
    );
    if (totalMoves === 1) {
      if (state.board[1][1] !== -1) {
        state.board[1][1] = 1;
        return state;
      }
      const corner = Math.floor(Math.random() * 4);
      switch (corner) {
        case 0:
          state.board[0][0] = 1;
          break;
        case 1:
          state.board[2][0] = 1;
          break;
        case 2:
          state.board[0][2] = 1;
          break;
        default:
          state.board[2][2] = 1;
          break;
      }
      return state;
    }
    let results = this.test(state.board, 0, null);
    state.board = this.getIdealChoice(results);
    return state; //Math.max(results);
  };

  render() {
    return (
      <div>
        <p>{this.state.winner}</p>
        {this.showState()}
      </div>
    );
  }
}
export default Home;
