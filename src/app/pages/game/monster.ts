export class Monster {
  startingLife: number;
  currentLife: number;
  x: number;
  name: string;
  movingDirection: number;
  movingSpeed: number;
  background: string;
  moveTime: number;
  moveDelay: number;
  handleMonsterAction: any;

  constructor(name: string, handleMonsterAction: any) {
    this.handleMonsterAction = handleMonsterAction;
    this.background = '1';
    this.startingLife = 100;
    this.currentLife = this.startingLife;
    this.x = -10;
    this.name = name;
    this.movingDirection = 1; // 1 = right, -1 = left
    this.moveTime = Date.now();
    this.moveDelay = 80; // monster moves every this.moveDelay ms
    this.movingSpeed = 0.5; // one monster move = this.movingSpeed percent
  }

  public move() {
    const now = Date.now();
    if (now - this.moveTime > this.moveDelay) {
      this.moveTime = Date.now();
      // right
      if (this.movingDirection === 1 && this.x < 100) {
        this.x += this.movingSpeed;
      }
      if (this.x >= 100) {
        this.movingDirection = -1;
      }
      // left
      if (this.movingDirection === -1 && this.x > 0) {
        this.x -= this.movingSpeed;
      }
      if (this.x <= 0) {
        this.movingDirection = 1;
      }
    }
  }

  private animate() {
    // if (this.spriteX < this.sprites.moving.xMax) {
    //   this.spriteX += 1;
    // } else {
    //   this.spriteX = this.sprites.moving.xMin;
    // }
  }

  public takeDamage(hitpoints: number) {
    this.currentLife -= hitpoints;
  }
}
