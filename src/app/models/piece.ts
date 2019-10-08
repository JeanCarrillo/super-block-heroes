import { pieces } from './pieces';
import { rdmFloor, rdmCeil } from '../helpers/functions';
// tslint:disable: prefer-for-of

export class Piece {
  x: number;
  y: number;
  shape: number[][];
  rotationIndex: number;
  // index in the pieces.js array
  pieceIndex: number;
  color: any;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.rotationIndex = 0;
    this.color = rdmCeil(4);
    // random piece index, T = 1, Z = 2 etc.
    this.pieceIndex = rdmFloor(pieces.length);
    this.createShape();
    // type (string), (example: "J")
  }

  public rotate(num: number) {
    let index = this.rotationIndex + num;
    // Out of bounds checks
    if (index < 0) {
      index = pieces[this.pieceIndex].shapes.length - 1;
    } else if (
      index >= pieces[this.pieceIndex].shapes.length ||
      !pieces[this.pieceIndex].shapes[index]
    ) {
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
