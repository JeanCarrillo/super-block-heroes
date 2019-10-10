export class Monster {
  life: number;
  x: number;
  name: string;
  movingDirection: number;
  movingSpeed: number;

  constructor(name: string) {
    this.life = 100;
    this.x = 0;
    this.name = name;
    this.movingDirection = 1; // right
    this.movingSpeed = 1;
  }

  public move() {
    // right
    if (this.movingDirection === 1 && this.x < 96) {
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

  public takeDamage() {
    this.life -= 10;
  }
}
