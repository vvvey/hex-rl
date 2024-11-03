import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon } from 'react-hexgrid';
import { Board } from './Board.ts';
import { BLACK, WHITE } from './Constants.ts';
import { Utils } from './Utils.ts';
import './App.css';

let toggle = true

let board = new Board(8);

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeCoords: [[]],
    };
  }

  componentDidMount() {
    this.setState({
      cubeCoords: board.getBoardCubeCoords(),
    });
  }


  handleHexClick = (x,y) => {
      console.log(`Hex clicked: x=${x}, y=${y}`);
      let color = BLACK;
      if (toggle) {
          color = WHITE;
          toggle = false;
      } else {
          color = BLACK;
          toggle = true;
      }
      console.log(`Color: ${color}`);
      if (board.makeMove(x, y, color)) {
        const audio = new Audio('mixkit-typewriter-soft-click-1125.wav');
        audio.play();
      } else {
        const audio = new Audio('mixkit-click-error-1110.wav');
        audio.play();
      }
      
      
      

      this.setState({
        cubeCoords: board.getBoardCubeCoords(),
      });

      if (board.isWin(BLACK)) {
        console.log("Black wins");
        const audio = new Audio('mixkit-video-game-win-2016.wav');
        audio.play();
        board = new Board(9);
      }
      if (board.isWin(WHITE)) {
        console.log("White wins");
      }


  };

  render() {
    const hexagonSize = { x: 5, y: 5 };
    return (
      <div className="App">
        
        <h2>Hex Game Battle</h2>
       
        <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
          {/* Main grid with bit hexagons, all manual */}
          <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: -40 }}>
            
            
            {this.state.cubeCoords.map((coord, index) => (
              <Hexagon key={index} q={coord.q} r={coord.r} s={coord.s} onClick={() => this.handleHexClick(coord.x, coord.y)}>
                
                {coord.color === 1 ? (
                  <image x={-3} y={-3} width="6" height="6" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_shiro-8.png" />
                ) : coord.color == -1 ? (
                  <image x={-3.25} y={-3.25} width="6.5" height="6.5" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_kuro-8_dd5c4dd6-54f8-41f4-a3e3-fabc9fd4c904.png" />
                ) : null}
                
              </Hexagon>
            ))}

            {/* More compact way of rendering a grid */}
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