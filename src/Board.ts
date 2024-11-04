import { EMPTY, BLACK, WHITE } from './Constants.ts';
import { Utils } from './Utils.ts';

export class Board {
    board_size: number;
    board: number[][];

    constructor(board_size: number) {
        this.board_size = board_size;
        this.board = new Array(board_size).fill(0).map(() => new Array(board_size).fill(EMPTY)); // Fill the board with EMPTY
    }

    isLegalMove(x: number, y: number, color: number): boolean {
        if (x < 0 || x >= this.board_size || y < 0 || y >= this.board_size || this.board[x][y] !== EMPTY) {
            return false;
        }
        return true;
    }

    makeMove(x: number, y: number, color: number): boolean {
        if (this.isLegalMove(x, y, color)) {
            this.board[x][y] = color;
            return true;
        }
        return false;
    }

    getBoard(): number[][] {
        return this.board;
    }

    getStateKey(): string {
        const board = this.board; 
        return board.map(row => row.join(',')).join(';'); // Convert 2D array to unique string
    }

    getLegalMoves(): [number, number][] {
        let emptyCells: [number, number][] = [];

        for (let x = 0; x < this.board.length; x++) {
            for (let y = 0; y < this.board[x].length; y++) {
                if (this.board[x][y] === EMPTY) {
                    emptyCells.push([x, y]);
                }
            }
        }

        return emptyCells;
    }

    getBoardCubeCoords(): {q: number, r: number, s: number, x: number, y: number, color: number}[] {
        let cubeCoordinates: {q: number, r: number, s: number, x: number, y: number, color: number}[] = [];

        for (let x: number = 0; x < this.board.length; x++) {
          for (let y: number = 0; y < this.board[x].length; y++) {
            const r: number = x;
            const q: number = y - r;
            const s: number = -q - r;
            const color: number = this.board[x][y];
            cubeCoordinates.push({q, r, s, x, y, color});
          }
        }
      
        return cubeCoordinates;
    }

    isWin(color: number): boolean {
        let start = new Set<string>();
        let end = new Set<string>();

        if (color === BLACK) { // Top to Bottom
            for (let i = 0; i < this.board_size; i++) {
            if (this.board[0][i] === color) {
                start.add(`0,${i}`);
            }
            if (this.board[this.board_size - 1][i] === color) {
                end.add(`${this.board_size - 1},${i}`);
            }
            }
        }

        if (color === WHITE) { // Left to Right
            for (let i = 0; i < this.board_size; i++) {
            if (this.board[i][0] === color) {
                start.add(`${i},0`);
            }
            if (this.board[i][this.board_size - 1] === color) {
                end.add(`${i},${this.board_size - 1}`);
            }
            }
        }

        if (start.size === 0 || end.size === 0) { // If either ends is empty then it is not a win
            return false;
        }

        let visited = new Set<string>();
        let stack: [number, number][] = [];

        for (const pos of start) {
            const [x, y] = pos.split(',').map(Number);
            visited.add(pos);
            stack.push([x, y]);
        }

        while (stack.length > 0) {
            let pos = stack.pop();
            if (!pos) continue;
            let [x, y] = pos;
            let neighbors = Utils.getNeighbors(x, y, this.board_size);

            for (const [nx, ny] of neighbors) {
            const neighborPos = `${nx},${ny}`;
            if (this.board[nx][ny] === color && !visited.has(neighborPos)) {
                if (end.has(neighborPos)) {
                return true;
                }
                visited.add(neighborPos);
                stack.push([nx, ny]);
            }
            }
        }

        return false;
    }



    
}