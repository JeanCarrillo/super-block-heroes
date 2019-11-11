import { Component, OnInit, Input } from "@angular/core";
import { Board } from "../../../shared/models/board";
import { Block } from "../../../shared/models/block";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Input() currentBlocks: Block[];
  @Input() facingMonster: boolean;

  constructor() {}

  ngOnInit() {}

  public getBlock(y: number, x: number): any {
    const { board, currentBlocks } = this;
    if (board.tiles[y][x] !== 0) {
      return board.tiles[y][x];
    }
    for (const block of currentBlocks) {
      if (block.x === x && block.y === y) {
        return block.color;
      }
    }
    return false;
  }

  private getBackgroundColor(): string {
    return this.facingMonster
      ? "rgba(252, 99, 71, 0.2)"
      : "rgba(255, 255, 255, 0.2)";
  }
}
