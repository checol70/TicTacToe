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

    getPossibleMoves = (board, value)=>{
        let possibleMoves =[];
        board.forEach((row,rowNum)=>{
            row.forEach((value, valueNum)=>{
                if(value === 0)
                possibleMoves.push([rowNum,valueNum])
            })
        })
        const possibleBoardStates = []
        possibleMoves.forEach(e=>{
            let tempBoard = JSON.parse(JSON.stringify(board));
            possibleBoardStates.push(tempBoard);
        })
        possibleBoardStates.forEach((e,i)=>{
            e[possibleMoves[i][0]][possibleMoves[i][1]] = value;
        })
        return possibleBoardStates;
    }

    test=(board, recursionLevel,previousLevel, minMax)=>{
        let functions = [
            (arr)=>Math.min(...arr),
            (arr)=>Math.max(...arr)
        ]
        let possibles = this.getPossibleMoves(board,recursionLevel%2!==1? 1:-1 );
        let chances = possibles.map(e=>this.checkWin(e));
        let currentLevel = {possibles,
            chances,
            likelyResult : 0
        }
        currentLevel.likelyResult = functions[recursionLevel%2](chances);
        
        // console.log("CurrentLevel: ");
        // console.log(currentLevel);
        const twoMoves = []
        //console.log(recursionLevel)
        if(recursionLevel<5 && currentLevel.likelyResult === 0){
            recursionLevel++;
            for(let i = 0; i<possibles.length; i++){
                if(chances[i] === 0){
                    const check = this.test(possibles[i], Math.parse(recursionLevel.toString()), currentLevel)
                    if(check !== undefined && check.likelyResult === -1){
                        currentLevel.likelyResult = -1;
                        return currentLevel;
                    }
                    twoMoves.push(check)}
                //console.log("here I am.")
                if(twoMoves[i] !== undefined){ 
                    if(twoMoves[i].chances.includes(-1)){
                        //currentLevel.likelyResult = twoMoves[i].likelyResult;
                        break;
                    }
                }
            }
        }
        currentLevel.twoMoves = twoMoves;
        return currentLevel
    }

    getDifferentLevel(twoMoves){
        twoMoves.forEach((e,i)=>{
            if(!e.chances.includes(-1) && e.chances.includes(1)){
                return i;
            }
        })
        return 0;
    }

    getIdealChoice(results){
        results.chances.forEach((e,i)=>{
            if(e>0){
                return(results.possibleMoves[i])
            }
        })

    }
    
    computerMakeMove = (state)=>{
        let results = this.test(state.board,0,null);
        console.log("results")
        console.log(results);
        console.log(this.getIdealChoice(results))
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