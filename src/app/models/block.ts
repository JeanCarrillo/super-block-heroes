export class Block {
  color: number;
  isMoving: boolean;
  x: number;
  y: number;

  constructor(color, x, y, isMoving) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.isMoving = isMoving;
  }
}
