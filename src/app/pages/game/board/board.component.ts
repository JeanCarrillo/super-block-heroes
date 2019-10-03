import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../../../models/board';
import { Block } from '../../../models/block';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  board: Board;
  blocks: Block[];
  interval: any;

  constructor() {
    const rowNumbers = 10;
    const colNumbers = 20;
    this.board = new Board(rowNumbers, colNumbers);
    // this.board.blocks[5][5] = new Block(1, true);
    this.blocks = [];
    this.blocks.push(new Block(1, 0, 0, true));
    this.blocks.push(new Block(2, 5, 0, true));
  }

  ngOnInit() {
    this.interval = setInterval(() => this.gameLoop(), 200);
  }

  private gameLoop(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].isMoving) {
        if (!this.isColliding(this.blocks[i].x, this.blocks[i].y, 0, 1)) {
          this.blocks[i].y += 1;
        } else {
          this.blocks[i].isMoving = false;
        }
      }
    }
  }

  private isColliding(x: number, y: number, dirX: number, dirY: number) {
    if (
      x + dirX < 0 ||
      x + dirX > this.board.tiles[0].length ||
      y + dirY < 0 ||
      y + dirY >= this.board.tiles.length
    ) {
      return true;
    }
    return false;
  }

  public getBlock(y: number, x: number) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].x === x && this.blocks[i].y === y) {
        return this.blocks[i].color;
      }
    }
    return false;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
