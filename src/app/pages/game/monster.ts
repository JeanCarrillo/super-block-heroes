export class Monster {
  startingLife: number;
  currentLife: number;
  x: number;
  name: string;
  movingDirection: number;
  movingSpeed: number;
  background: string;

  constructor(name: string) {
    this.background = '1';
    this.startingLife = 100;
    this.currentLife = this.startingLife;
    this.x = 0;
    this.name = name;
    this.movingDirection = 1; // 1 = right, -1 = left
    this.movingSpeed = 1.5;
  }

  public move() {
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

  public takeDamage(hitpoints: number) {
    this.currentLife -= hitpoints;
  }
}
