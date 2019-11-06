export class Monster {
  startingLife: number;
  currentLife: number;
  x: number;
  monster: any;
  movingDirection: number;
  movingSpeed: number;
  background: string;
  moveTime: number;
  moveDelay: number;
  name: string;
  handleMonsterAction: any;
  animationTime: number;
  animationDelay: number;
  spriteX: number;
  spriteY: number;
  sprites: any;

  constructor(monster: any, handleMonsterAction: any) {
    // this.time_min
    // this.time_max
    this.handleMonsterAction = handleMonsterAction;
    this.name = monster.name;
    this.background = monster.background.toString();
    this.startingLife = monster.hp;
    this.currentLife = this.startingLife;
    this.x = -10;
    this.movingDirection = 1; // 1 = right, -1 = left
    this.moveTime = Date.now();
    this.moveDelay = 80; // monster moves every this.moveDelay ms
    this.movingSpeed = monster.speed; // one monster move = this.movingSpeed percent
    this.animationTime = Date.now();
    this.animationDelay = 200;
    this.sprites = monster.sprites;
    this.spriteX = monster.sprites.moving.xMin;
    this.spriteY = monster.sprites.moving.y;
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
    if (now - this.animationTime > this.animationDelay) {
      this.animationTime = Date.now();
      this.animate();
    }
  }

  private animate() {
    if (this.spriteX < this.sprites.moving.xMax) {
      this.spriteX += 1;
    } else {
      this.spriteX = this.sprites.moving.xMin;
    }
  }

  public takeDamage(hitpoints: number) {
    this.currentLife -= hitpoints;
  }
}
