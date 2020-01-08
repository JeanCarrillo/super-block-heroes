import { heroSprites } from '../constants/sprites';

export class Hero {
  id: number;
  price: number;
  name: string;
  sprite: number;
  status: string;
  animationTime: number = Date.now();
  animationDelay = 20;
  sprites: any;
  facingMonster: boolean;
  gameOverAlreadySet = false;
  setGameOver: any;

  constructor(hero: any, setGameOver: any = () => {}) {
    this.setGameOver = setGameOver;
    this.name = hero.name;
    // Animation init
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
        if (!this.gameOverAlreadySet) {
          this.gameOverAlreadySet = true;
          this.setGameOver();
        }
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
