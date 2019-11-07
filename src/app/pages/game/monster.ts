export class Monster {
  id: number;
  startingLife: number;
  currentLife: number;
  x: number;
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
  attackTime: number;
  attackDelay: number;
  attackAnimationTime: number;
  attackAnimationDelay: number;
  status: string;

  constructor(monster: any, handleMonsterAction: any) {
    this.handleMonsterAction = handleMonsterAction;
    // Initial values
    // monster.time_min ?
    // monster.time_max ?
    this.id = monster.id;
    this.name = monster.name;
    this.background = monster.background.toString();
    this.startingLife = monster.hp;
    this.currentLife = this.startingLife;
    this.x = -10;
    this.movingDirection = 1; // 1 = right, -1 = left
    // Moving init
    this.moveTime = Date.now();
    this.moveDelay = 80; // monster moves every this.moveDelay ms
    this.movingSpeed = monster.speed; // one monster move = this.movingSpeed percent
    // Animation init
    this.animationTime = Date.now();
    this.animationDelay = 200;
    this.sprites = monster.sprites;
    this.changeStatus('moving');
    // Attack init
    this.attackTime = Date.now();
    this.attackDelay = 10000;
    this.attackAnimationTime = Date.now();
    this.attackAnimationDelay = 2000;
  }

  public move() {
    const now = Date.now();
    if (now - this.moveTime > this.moveDelay && this.status === 'moving') {
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
    if (now - this.attackAnimationTime > this.attackAnimationDelay) {
      this.changeStatus('moving');
    }
    if (now - this.attackTime > this.attackDelay) {
      this.attackTime = Date.now();
      this.attackAnimationTime = Date.now();
      this.changeStatus('attacking');
      this.attack();
    }
  }

  private attack() {
    this.handleMonsterAction();
  }

  private animate() {
    if (this.spriteX < this.sprites[this.status].xMax) {
      this.spriteX += 1;
    } else {
      // if (this.status === 'attacking') {
      //   this.changeStatus('moving');
      // }
      this.spriteX = this.sprites[this.status].xMin;
    }
  }

  private changeStatus(status: string) {
    this.status = status;
    this.spriteX = this.sprites[this.status].xMin;
    this.spriteY = this.sprites[this.status].y;
  }

  public takeDamage(hitpoints: number) {
    this.currentLife -= hitpoints;
  }
}
