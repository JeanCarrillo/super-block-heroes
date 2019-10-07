import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  Input
} from '@angular/core';
import { Board } from '../../../models/board';
import { Block } from '../../../models/block';
import { Piece } from '../../../models/piece';
// tslint:disable: prefer-for-of
// tslint:disable: deprecation

// Keyboard buttons
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  SPACEBAR = 32
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input() player: string;
  score: number;
  board: Board;
  rowNumbers = 10;
  colNumbers = 20;
  currentBlocks: Block[];
  currentPiece: Piece;
  interval: any;
  fallingSpeed: number;

  // Listens to keyboard events
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.moveCurrentBlocks(1);
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.moveCurrentBlocks(-1);
    }
    if (event.keyCode === KEY_CODE.SPACEBAR) {
      this.rotateCurrentPiece(1);
    }
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.dropCurrentBlocks();
    }
  }

  constructor() {
    this.fallingSpeed = 200;
    this.score = 0;
    this.board = new Board(this.rowNumbers, this.colNumbers);
    this.currentBlocks = [];
  }

  ngOnInit() {
    this.interval = setInterval(() => this.gameLoop(), this.fallingSpeed);
  }

  // MAIN LOOP
  // Loop through current active blocks
  // => each block falls (y + 1) if it doesn't collide
  private gameLoop(): void {
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

  private createPiece() {
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
  private rotateCurrentPiece(direction: number) {
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
  // => reset current blocks
  private handleCollision(): void {
    for (let i = 0; i < this.currentBlocks.length; i++) {
      const block = this.currentBlocks[i];
      // Current block is now part of the board matrix
      this.board.tiles[block.y][block.x] = block.color;
    }
    this.currentBlocks = [];
    this.checkCompletedLines();
  }

  // Checks board.tiles matrix for full lines
  // => add all indexes to an array
  // => call deleteRows method to clear them
  private checkCompletedLines() {
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

  // delete all lines in the rowsToDelete array
  // => replace them by empty lines (filled by 0) at the 0 index of the matrix (top)
  // => update score
  private deleteRows(rowsToDelete: number[]) {
    // TO DO : refactor to get new line from board.ts ?
    const emptyRow = new Array(this.rowNumbers).fill(0);
    for (let i = 0; i < rowsToDelete.length; i++) {
      this.board.tiles.splice(rowsToDelete[i], 1);
      this.board.tiles.splice(0, 0, emptyRow);
    }
    this.score += rowsToDelete.length * 10;
  }

  // Returns true if something is colliding
  // Y axis only
  private isColliding(x: number, y: number, dirY: number) {
    if (y + dirY < 0 || y + dirY >= this.board.tiles.length) {
      return true;
    }
    if (this.board.tiles[y + dirY][x] !== 0) {
      return true;
    }
    return false;
  }

  // Method used in render template: returns color (img) to display (an integer)
  public getBlock(y: number, x: number) {
    if (this.board.tiles[y][x] !== 0) {
      return this.board.tiles[y][x];
    }
    for (let i = 0; i < this.currentBlocks.length; i++) {
      if (this.currentBlocks[i].x === x && this.currentBlocks[i].y === y) {
        return this.currentBlocks[i].color;
      }
    }
    return false;
  }

  // Linked to Keyboard events : actions
  private moveCurrentBlocks(x: number) {
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
  private canMove(x: number, y: number, dirX: number) {
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
  private dropCurrentBlocks() {
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

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
