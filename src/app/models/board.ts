// import { Block } from './block';
export class Board {
  tiles: any[];
  constructor(width: number, height: number) {
    this.tiles = [];
    for (let i = 0; i < height; i += 1) {
      this.tiles.push([]);
      for (let j = 0; j < width; j += 1) {
        this.tiles[i].push(0);
      }
    }
  }
}
