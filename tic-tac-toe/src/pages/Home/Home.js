import React, { Component } from "react";
import "./Home.css"
class Home extends Component{
    state = {
        board:[
            ["","",""],
            ["","",""],
            ["","",""]
        ]
    }
    showState = ()=>{
        let table = [];
        this.state.board.forEach((element,rowNum) => {
            let row = [];
            element.forEach((val,itemNum)=>{
                row.push(<p className = "shower" key = {rowNum.toString() + itemNum.toString()}  onClick = {()=>{if(val ==="")this.makeMove(rowNum,itemNum)}}>{val}</p>)
            });
            table.push(<div className = "row"key = {rowNum}>{row}</div>);
        })
        return table;
    }

    makeMove = (i,j)=>{
        console.log("Called!")
        let state = this.state;
        state.board[i][j] = "X";
        this.setState(state);
        
    }

    render(){
       return (<div>
            {this.showState()}
        </div>)
    }
}
export default Home;