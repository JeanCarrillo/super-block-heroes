const pieces = [
  {
    type: 'T',
    shape: [[1, 1, 1], [0, 1, 0]]
  },
  {
    type: 'O',
    shape: [[1, 1], [1, 1]]
  }
];

export class Piece {
  type: string;
  shape: number[][];

  constructor() {
    const color = Math.ceil(Math.random() * 4);
    const rdm = Math.floor(Math.random() * pieces.length);
    const shape = [];
    for (let i = 0; i < pieces[rdm].shape.length; i++) {
      shape.push([]);
      for (let j = 0; j < pieces[rdm].shape[i].length; j++) {
        shape[i].push(pieces[rdm].shape[i][j] === 0 ? 0 : color);
      }
    }
    this.shape = shape;
    this.type = pieces[rdm].type;
  }
}
