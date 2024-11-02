import React, { Component } from 'react';
import { GridGenerator, HexGrid, Layout, Hexagon } from 'react-hexgrid';
import './App.css';

function convertToCubeCoordinates(grid) {
  const cubeCoordinates = [];

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const r = x;
      const q = y-r;
      const s = -q - r;
      const st = `${x}${y}`;
      const content = grid[x][y];
      cubeCoordinates.push({ q, r, s, st, content,x,y});

    }
  }

  return cubeCoordinates;
}

let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

let cubeCoords = convertToCubeCoordinates(grid);
let toggle = true

class Board extends Component {

    handleHexClick = (x,y) => {
        console.log(`Hex clicked: x=${x}, y=${y}`);
        if (toggle) {
            grid[x][y] = -1;
            toggle = false;
        } else {
            grid[x][y] = 1;
            toggle = true;
        }
        // grid[x][y] = 1;
        cubeCoords = convertToCubeCoordinates(grid);
        this.forceUpdate();
    };

  render() {
    const hexagonSize = { x: 5, y: 5 };
    return (
      <div className="App">
        
        <h2>Hex Game Battle</h2>
       
        <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
          {/* Main grid with bit hexagons, all manual */}
          <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: -40 }}>
            
            
            {cubeCoords.map((coord, index) => (
              <Hexagon key={index} q={coord.q} r={coord.r} s={coord.s} onClick={() => this.handleHexClick(coord.x, coord.y)}>
                
                {coord.content === 1 ? (
                  <image x={-3} y={-3} width="6" height="6" xlinkHref="https://cdn.shopify.com/s/files/1/0606/1093/6995/files/goishi_shiro-8.png" />
                ) : coord.content == -1 ? (
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

export default Board;