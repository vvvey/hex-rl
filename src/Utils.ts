export class Utils {

    static getNeighbors(x: number, y: number, board_size: number): [number, number][] {
        let neighbours: [number, number][] = [];

        if (x > 0) { neighbours.push([x - 1, y]); }
        if (x < board_size - 1) { neighbours.push([x + 1, y]); }
        if (y > 0) { neighbours.push([x, y - 1]); }
        if (y < board_size - 1) { neighbours.push([x, y + 1]); }
        if (x > 0 && y > 0) { neighbours.push([x - 1, y - 1]); }
        if (x < board_size - 1 && y < board_size - 1) { neighbours.push([x + 1, y + 1]); }

        return neighbours;
    }
}