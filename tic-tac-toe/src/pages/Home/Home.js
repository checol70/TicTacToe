import React, { Component } from "react";
import "./Home.css"
class Home extends Component{
    state = {
        board:[
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ],
        decode:["X","","O"],
        winner:""
    }
    showState = ()=>{
        let table = [];
        this.state.board.forEach((element,rowNum) => {
            let row = [];
            element.forEach((val,itemNum)=>{
                row.push(<p className = "shower" key = {rowNum.toString() + itemNum.toString()}  onClick = {()=>{if(val ===0)this.makeMove(rowNum,itemNum)}}>{"\u00a0"+this.state.decode[val+1]+"\u00a0"}</p>)
            });
            table.push(<div className = "row"key = {rowNum}>{row}</div>);
        })
        return table;
    }

    checkWin = (board)=>{
        for(let i = 0; i<3; i++)
        {
            if(board[i][0] === board[i][1] && board[i][2] === board[i][1] && board[i][0] !== 0)
            {
                return board[i][0];
            } 
            if(board[0][i] === board[1][i] && board[2][i] === board[1][i] && board[0][i] !== 0)
            {
                return board[0][i];
            }
        }
        if(board[0][0] === board[1][1] && board[2][2] === board[1][1] && board[1][1] !== 0)
        {
            return board[0][0];
        }
        if(board[0][2] === board[1][1] && board[2][0] === board[1][1] && board[1][1] !== 0){
            return board[0][2];
        }
        return 0;
    }

    makeMove = (i,j)=>{
        console.log("Called!")
        let state = this.state;
        state.board[i][j] = -1;
        let winner = this.checkWin(state.board);
        if(winner === 0){
            state = this.computerMakeMove(state);
            winner = this.checkWin(state.board);
        }else{
            state.winner = state.decode[winner + 1];
        }
        this.setState(state);
        
    }

    test=(board, recursionLevel,previousLevels)=>{
        let possibleMoves =[];
        board.forEach((row,rowNum)=>{
            row.forEach((value, valueNum)=>{
                if(value === 0)
                possibleMoves.push([rowNum,valueNum])
            })
        })
        console.log(possibleMoves)
    }

    computerMakeMove = (state)=>{
        let results = this.test(state.board,0);
        return state;//Math.max(results);
    }

    render(){
       return (<div>
           <p>{this.state.winner}</p>
            {this.showState()}
        </div>)
    }
}
export default Home;