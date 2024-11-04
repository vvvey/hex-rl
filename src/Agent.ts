import { Board } from "./Board";

export class Agent {
    board: Board;
    color: number;

    qTable: { [state: string]: { [action: string]: number } } = {};
    alpha: number = 0.1;  // Learning rate
    gamma: number = 0.9;  // Discount factor
    epsilon: number = 0.1; // Exploration rate

    constructor(board: Board, color: number) {
        this.board = board;
        this.color = color;
    }
    
    getStateKey(): string {
        const board = this.board.getBoard(); // Assuming this returns a 2D array
        return board.map(row => row.join(',')).join(';'); // Convert 2D array to unique string
    }

    getMove(board: Board, color: number): [number, number] {
        const moves = board.getLegalMoves();
        if (Math.random() < this.epsilon) {
            // Explore: choose a random move
            const randomIndex = Math.floor(Math.random() * moves.length);
            return moves[randomIndex];
        } else {
            // Exploit: choose the best move based on Q-Table
            let bestMove: [number, number] | null = null;
            let bestValue = -Infinity;

            for (const move of moves) {
                const stateKey = this.getStateKey();
                const actionKey = `${move[0]},${move[1]}`;
                const qValue = this.qTable[stateKey] && this.qTable[stateKey][actionKey] !== undefined
                    ? this.qTable[stateKey][actionKey]
                    : 0;

                if (qValue > bestValue) {
                    bestValue = qValue;
                    bestMove = move;
                }
            }

            return bestMove || moves[0]; // Fallback to some move if bestMove is null
        }
    }

    updateQValue(previousState: string, action: string, reward: number, currentState: string): void {
        if (!this.qTable[previousState]) {
            this.qTable[previousState] = {};
        }
        const currentBestQ = Math.max(...Object.values(this.qTable[currentState] || {}).map(v => v || 0));

        // Q-learning formula
        const oldQValue = this.qTable[previousState][action] || 0;
        this.qTable[previousState][action] = oldQValue + this.alpha * (reward + this.gamma * currentBestQ - oldQValue);
    }

    // Call this method after each game to train the agent
    train(previousState: string, action: string, reward: number): void {
        const currentState = this.getStateKey();
        this.updateQValue(previousState, action, reward, currentState);
    }
    
    // Resets the agent's knowledge (if necessary)
    reset(): void {
        this.qTable = {};
    }

    
}