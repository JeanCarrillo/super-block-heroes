import { heroSprites } from '../constants/sprites';

export class Hero {
  id: number;
  price: number;
  name: string;
  sprite: number;
  status: string;
  animationTime: number;
  animationDelay: number;
  sprites: any;
  facingMonster: boolean;

  constructor(hero: any) {
    this.name = hero.name;
    // Animation init
    this.changeStatus('Idle');
    this.animationTime = Date.now();
    this.animationDelay = 20;
  }

  public move() {
    const now = Date.now();
    if (now - this.animationTime > this.animationDelay) {
      this.animationTime = Date.now();
      this.animate();
    }
  }

  private animate() {
    if (this.facingMonster && this.status === 'Walk') {
      this.changeStatus('Idle');
    }
    if (!this.facingMonster && this.status === 'Idle') {
      this.changeStatus('Walk');
    }

    if (this.sprite < heroSprites[this.status].end) {
      this.sprite += 1;
    } else {
      if (this.status === 'Death') {
        return;
      }

      if (this.status === 'GetHit' || this.status === 'Attack' || this.status === 'Throw') {
        this.changeStatus('Idle');
      }

      this.sprite = heroSprites[this.status].start;
    }
  }

  public changeStatus(status: string) {
    this.status = status;
    this.sprite = heroSprites[this.status].start;
  }
}
