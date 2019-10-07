import { pieces } from './pieces';

export class Piece {
  x: number;
  y: number;
  shape: number[][];
  rotationIndex: number;
  pieceIndex: number;
  color: any;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.rotationIndex = 0;
    this.color = Math.ceil(Math.random() * 4);
    // random piece index, T = 1, Z = 2 etc.
    this.pieceIndex = Math.floor(Math.random() * pieces.length);
    this.createShape();
    // type (string), (example: "J")
  }

  public rotate(num: number) {
    let index = this.rotationIndex + num;
    if (!pieces[this.pieceIndex].shapes[this.rotationIndex + num]) {
      index = 0;
    }
    this.rotationIndex = index;
    this.createShape();
  }

  public createShape() {
    const shape = [];
    for (
      let i = 0;
      i < pieces[this.pieceIndex].shapes[this.rotationIndex].length;
      i++
    ) {
      shape.push([]);
      // tslint:disable-next-line: prefer-for-of
      for (
        let j = 0;
        j < pieces[this.pieceIndex].shapes[this.rotationIndex][i].length;
        j++
      ) {
        shape[i].push(
          pieces[this.pieceIndex].shapes[this.rotationIndex][i][j] === 0
            ? 0
            : this.color
        );
      }
    }
    this.shape = shape;
  }
}
