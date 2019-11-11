// import { Block } from './block';
export class Board {
  tiles: any[];
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.generateMatrix();
  }

  generateMatrix() {
    for (let i = 0; i < this.height; i += 1) {
      this.tiles.push([]);
      for (let j = 0; j < this.width; j += 1) {
        this.tiles[i].push(0);
      }
    }
  }

  // generateNewRow() {
  //   const row = [];
  //   for (let i = 0; i < this.width; i += 1) {
  //     row[i].push(0);
  //   }
  //   return row;
  // }
}
