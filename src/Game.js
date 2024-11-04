import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon } from 'react-hexgrid';
import { Board } from './Board.ts';
import { Agent } from './Agent.ts';
import { BLACK, WHITE } from './Constants.ts';
import { Utils } from './Utils.ts';
import './App.css';

let board = new Board(8);
let ai = new Agent(board, WHITE);
let player = {color: BLACK};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeCoords: [[]],
      turn: WHITE
    };

    this.previousState = null
    this.action = null
    
  }

  componentDidMount() {
    this.setState({
      cubeCoords: board.getBoardCubeCoords(),
    });

    
  }

  startGame = () => {
    board = new Board(8);
    ai = ai
    player = {color: BLACK};

    if (ai.color === WHITE) {
      this.makeAIMove();
      console.log('AI made first move');
    }
  }

  handleHexClick = (x, y) => {
    console.log(`Hex clicked: x=${x}, y=${y}`);
    if (this.state.turn === player.color) {
      this.makePlayerMove(x, y);
    }
  };

  makePlayerMove = (x, y) => {
    let color = player.color;
    console.log(`Color: ${color}`);
    if (board.makeMove(x, y, color)) {
      this.playAudio('mixkit-typewriter-soft-click-1125.wav');
      this.setState({
        cubeCoords: board.getBoardCubeCoords(),
        turn: ai.color, // Switch turn to AI
      }, this.makeAIMove);
    } else {
      this.playAudio('mixkit-click-error-1110.wav');
    }

    if (board.isWin(color)) {
      this.handleWin(color);
    }
  };

  makeAIMove = () => {
    const aiMove = ai.getMove(board);
    board.makeMove(aiMove[0], aiMove[1], ai.color);
    this.setState({
      cubeCoords: board.getBoardCubeCoords(),
      turn: player.color, // Switch turn back to player
    });

    if (board.isWin(ai.color)) {
      this.handleWin(ai.color);
    }

    this.previousState = ai.getStateKey();
    this.action = `${aiMove[0]},${aiMove[1]}`;
  };

  handleWin = (color) => {
    console.log(`${color === BLACK ? "Black" : "White"} wins`);
    this.playAudio('mixkit-video-game-win-2016.wav');
    board = new Board(8);
    this.setState({
      cubeCoords: board.getBoardCubeCoords(),
      turn: WHITE, // Reset turn to player
    });

    if (ai.color === color) {
      ai.train(this.previousState, this.action, 1);
      console.log("AI wins");
    } else {
      ai.train(this.previousState, this.action, -1);
      console.log("AI loses");
    }

  };

  playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  render() {
    const hexagonSize = { x: 5, y: 5 };
    return (
      <div className="App">
        <h2>Hex Game Battle</h2>
        <button onClick={() => this.startGame()}>Start Game</button>
        <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
          <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: -40 }}>
            {this.state.cubeCoords.map((coord, index) => (
              <Hexagon key={index} q={coord.q} r={coord.r} s={coord.s} onClick={() => this.handleHexClick(coord.x, coord.y)}>
                {coord.color === 1 ? (
                  <image x={-3} y={-3} width="6" height="6" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_shiro-8.png" />
                ) : coord.color === -1 ? (
                  <image x={-3.25} y={-3.25} width="6.5" height="6.5" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_kuro-8_dd5c4dd6-54f8-41f4-a3e3-fabc9fd4c904.png" />
                ) : null}
              </Hexagon>
            ))}
            <image x={-35} y={10} width="6.5" height="6.5" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_kuro-8_dd5c4dd6-54f8-41f4-a3e3-fabc9fd4c904.png" />
            <image x={27} y={-36} width="6.5" height="6.5" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_kuro-8_dd5c4dd6-54f8-41f4-a3e3-fabc9fd4c904.png" />
            <image x={-35} y={-36} width="6.5" height="6.5" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_shiro-8.png" />
            <image x={27} y={10} width="6.5" height="6.5" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_shiro-8.png" />
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default Game;
