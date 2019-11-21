export class Hero {
  name: string;
  sprite: number;
  status: string;
  animationTime: number;
  animationDelay: number;
  sprites: any;

  constructor(hero: Hero) {
    this.name = hero.name;
    this.sprite = 0;
    // Animation init
    this.animationTime = Date.now();
    this.animationDelay = 20;
    this.sprites = hero.sprites;
    this.changeStatus('Idle');
  }

  public move() {
    const now = Date.now();
    if (now - this.animationTime > this.animationDelay) {
      this.animationTime = Date.now();
      this.animate();
    }
  }

  private animate() {
    if (this.sprite < this.sprites[this.status]) {
      this.sprite += 1;
    } else {
      // if (this.status === 'attacking') {
      //   this.changeStatus('moving');
      // }
      this.sprite = 0;
    }
  }

  public changeStatus(status: string) {
    this.status = status;
    this.sprite = 0;
  }
}
