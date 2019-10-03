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
  currentBlocks: Block[];
  interval: any;

  constructor() {
    const rowNumbers = 10;
    const colNumbers = 20;
    this.board = new Board(rowNumbers, colNumbers);
    this.currentBlocks = [];
  }

  ngOnInit() {
    this.interval = setInterval(() => this.gameLoop(), 200);
  }

  private gameLoop(): void {
    this.currentBlocks.push(
      new Block(
        Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 10),
        0
      )
    );
    for (let i = 0; i < this.currentBlocks.length; i++) {
      const block = this.currentBlocks[i];
      if (!this.isColliding(block.x, block.y, 0, 1)) {
        block.y += 1;
      } else {
        this.board.tiles[block.y][block.x] = block.color;
        this.currentBlocks.splice(i, 1);
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
    if (this.board.tiles[y + dirY][x + dirX] !== 0) {
      return true;
    }
    return false;
  }

  public getBlock(y: number, x: number) {
    if (this.board.tiles[y][x] !== 0) {
      return this.board.tiles[y][x];
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.currentBlocks.length; i++) {
      if (this.currentBlocks[i].x === x && this.currentBlocks[i].y === y) {
        return this.currentBlocks[i].color;
      }
    }
    return false;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
