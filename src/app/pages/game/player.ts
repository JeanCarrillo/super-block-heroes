// tslint:disable: prefer-for-of
import { Board } from '../../models/board';
import { Block } from '../../models/block';
import { Piece } from '../../models/piece';

export class Player {
  isFastForwarding = false;
  gameOver = false;
  name: string;
  score: number;
  board: Board;
  rowNumbers = 10;
  colNumbers = 20;
  currentBlocks: Block[];
  currentPiece: Piece;
  fallingSpeed: number;

  constructor(name: string) {
    this.name = name;
    this.score = 0;
    this.board = new Board(this.rowNumbers, this.colNumbers);
    this.currentBlocks = [];
  }

  public loop(): void {
    let didCollide = false;
    for (let i = 0; i < this.currentBlocks.length; i++) {
      const block = this.currentBlocks[i];
      if (this.isColliding(block.x, block.y, 1)) {
        didCollide = true;
        break;
      }
    }
    if (didCollide) {
      this.handleCollision();
    } else {
      this.letCurrentBlocksFall();
    }
    this.createPiece();
  }

  // If there is no currentBlocks, creates a new piece
  // => calls Piece constructor to get the shape and color
  // => then recreates it with individual blocks (added to currentBlocks)
  // Piece and currentBlocks are two different entities sharing the same coordinates and updated at the same times
  private createPiece(): void {
    if (this.currentBlocks.length > 0) {
      return;
    }
    this.currentPiece = new Piece(5, 0);
    for (let i = 0; i < this.currentPiece.shape.length; i++) {
      for (let j = 0; j < this.currentPiece.shape[i].length; j++) {
        const color = this.currentPiece.shape[i][j];
        if (color !== 0) {
          this.currentBlocks.push(new Block(color, 5 + i, 0 + j));
        }
      }
    }
  }

  // direction: number of indexes to rotate
  // => direction 1 : rotate right, direction -1 : rotate left
  public rotateCurrentPiece(direction: number): void {
    this.currentPiece.rotate(direction);
    // Check collisions after rotating piece
    let rotationCollide = false;
    for (let i = 0; i < this.currentPiece.shape.length; i++) {
      for (let j = 0; j < this.currentPiece.shape[i].length; j++) {
        const color = this.currentPiece.shape[i][j];
        if (
          color !== 0 &&
          this.board.tiles[this.currentPiece.y + j][this.currentPiece.x + i] !==
            0
        ) {
          rotationCollide = true;
        }
      }
    }
    // If piece collides after rotating, rotate back and return
    // TO DO : handle different scenarios ?
    if (rotationCollide) {
      this.currentPiece.rotate(-direction);
      return;
    }
    // If no collision: clear currentBlocks and replace by new blocks (rotated piece)
    this.currentBlocks = [];
    for (let i = 0; i < this.currentPiece.shape.length; i++) {
      for (let j = 0; j < this.currentPiece.shape[i].length; j++) {
        const color = this.currentPiece.shape[i][j];
        if (color !== 0) {
          this.currentBlocks.push(
            new Block(color, this.currentPiece.x + i, this.currentPiece.y + j)
          );
        }
      }
    }
  }

  // Y + 1 to all currentBlocks and currentPiece (fall by 1)
  private letCurrentBlocksFall(): void {
    for (let i = 0; i < this.currentBlocks.length; i++) {
      this.currentBlocks[i].y += 1;
    }
    if (this.currentPiece) {
      this.currentPiece.y += 1;
    }
  }

  // When current blocks collide with matrix or existing blocks
  // => add them to the board.tiles matrix permanently
  // => game over check
  // => reset current blocks
  private handleCollision(): void {
    let gameOver = false;
    for (let i = 0; i < this.currentBlocks.length; i++) {
      const block = this.currentBlocks[i];
      // If there is already a block where current block is, then it is likely we are on top of the board
      // => game over
      if (this.board.tiles[block.y][block.x] !== 0) {
        gameOver = true;
      }
      // Current block is now part of the board matrix
      this.board.tiles[block.y][block.x] = block.color;
    }
    this.currentBlocks = [];
    if (gameOver) {
      this.handleGameOver();
    }
    this.checkCompletedLines();
  }

  // Checks board.tiles matrix for full lines
  // => add all indexes to an array
  // => call deleteRows method to clear them
  private checkCompletedLines(): void {
    const rowsToDelete = [];
    for (let i = 0; i < this.board.tiles.length; i++) {
      let completed = true;
      for (let j = 0; j < this.board.tiles[i].length; j++) {
        if (this.board.tiles[i][j] === 0) {
          completed = false;
          break;
        }
      }
      if (completed) {
        rowsToDelete.push(i);
      }
    }
    if (rowsToDelete.length > 0) {
      this.deleteRows(rowsToDelete);
    }
  }

  // delete all lines in the rowsToDelete array from the board.tiles matrix
  // => replace them by empty lines (filled by 0) at the 0 index of the matrix (top)
  private deleteRows(rowsToDelete: number[]): void {
    const emptyRow = new Array(this.rowNumbers).fill(0);
    for (let i = 0; i < rowsToDelete.length; i++) {
      this.board.tiles.splice(rowsToDelete[i], 1);
      this.board.tiles.splice(0, 0, emptyRow);
    }
    this.handleScore(rowsToDelete.length);
  }

  // Score calculation
  // TODO: something more complex ;-)
  private handleScore(nbOfRows: number): void {
    switch (nbOfRows) {
      case 1:
        this.score += 10;
        break;
      case 2:
        this.score += 24;
        break;
      case 3:
        this.score += 39;
        break;
      case 4:
        this.score += 56;
        break;
    }
  }

  private handleGameOver(): void {
    this.gameOver = true;
  }

  // Returns true if something is colliding
  // Y axis only
  private isColliding(x: number, y: number, dirY: number): boolean {
    if (y + dirY < 0 || y + dirY >= this.board.tiles.length) {
      return true;
    }
    if (this.board.tiles[y + dirY][x] !== 0) {
      return true;
    }
    return false;
  }

  // Linked to Keyboard events : actions
  // Moves current blocks left/right, X axis only, no Y axis checks
  public moveCurrentBlocks(x: number): void {
    let canMove = true;
    for (const block of this.currentBlocks) {
      if (!this.canMove(block.x, block.y, x)) {
        canMove = false;
      }
    }
    if (canMove) {
      for (const block of this.currentBlocks) {
        block.x += x;
      }
      if (this.currentPiece) {
        this.currentPiece.x += x;
      }
    }
  }

  // Method used when moving current blocks (key pressed)
  // checks left and right, returns false if illegal move (out of matrix or existing block)
  // X axis only
  private canMove(x: number, y: number, dirX: number): boolean {
    if (x + dirX < 0 || x + dirX >= this.board.tiles[0].length) {
      return false;
    }
    if (this.board.tiles[y][x + dirX] !== 0) {
      return false;
    }
    return true;
  }

  // When key is pressed
  // => current blocks fall until collision (fast forward)
  // TO DO: DEBUG
  public dropCurrentBlocks(): void {
    let didCollide = false;
    while (!didCollide) {
      for (let i = 0; i < this.currentBlocks.length; i++) {
        const block = this.currentBlocks[i];
        if (this.isColliding(block.x, block.y, 1)) {
          didCollide = true;
          break;
        }
      }
      if (didCollide) {
        this.handleCollision();
      } else {
        this.letCurrentBlocksFall();
      }
    }
  }
}
