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
  sprite: number;
  sprites: any;
  attackTime: number;
  attackDelay: number;
  attackAnimationTime: number;
  attackAnimationDelay: number;
  status: string;
  frozenDelay: number;
  frozenTime: number;
  isFrozen: boolean;
  isTaunt: boolean;
  isHeadingTo: number;
  addToGameStream: any;
  myPlayerIndex: number;

  constructor(monster: any, handleMonsterAction: any, addToGameStream: any, myPlayerIndex: number) {
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
    this.moveDelay = 15; // monster moves every this.moveDelay ms
    // this.movingSpeed = monster.speed; // one monster move = this.movingSpeed percent
    this.movingSpeed = 0.1; // one monster move = this.movingSpeed percent
    // Animation init
    this.animationTime = Date.now();
    this.animationDelay = 40;
    this.sprites = monster.sprites;
    this.changeStatus('Walk');
    // Attack init
    this.attackTime = Date.now();
    this.attackDelay = 10000;
    this.attackAnimationTime = Date.now();
    this.attackAnimationDelay = 2000;
    // Frozen init
    this.frozenTime = null;
    this.frozenDelay = 2000;
    this.isFrozen = false;
    this.isTaunt = false;
    this.addToGameStream = addToGameStream;
    this.myPlayerIndex = myPlayerIndex;
  }

  public move(): void {
    const now = Date.now();
    // Handle freeze capacity timer
    if (this.isFrozen) {
      this.attackTime = Date.now();
      if (now - this.frozenTime > this.frozenDelay) {
        this.isFrozen = false;
      }
      return;
    }
    if (now - this.moveTime > this.moveDelay && this.status === 'Walk') {
      this.moveTime = Date.now();
      // right
      if (this.movingDirection === 1 && this.x < 100) {
        this.x += this.movingSpeed;
      }
      if (this.x >= 100 || (this.isTaunt && this.x >= this.isHeadingTo)) {
        this.movingDirection = -1;
      }
      // left
      if (this.movingDirection === -1 && this.x > 0) {
        this.x -= this.movingSpeed;
      }
      if (this.x <= 0 || (this.isTaunt && this.x <= this.isHeadingTo)) {
        this.movingDirection = 1;
      }
    }
    if (now - this.animationTime > this.animationDelay) {
      this.animationTime = Date.now();
      this.animate();
    }
    if (now - this.attackAnimationTime > this.attackAnimationDelay && this.status === 'Attack') {
      this.changeStatus('Walk');
    }
    if (now - this.attackTime > this.attackDelay) {
      // Taunt check
      if (this.isTaunt && this.x >= this.isHeadingTo - 1 && this.x <= this.isHeadingTo + 1) {
        this.isTaunt = false;
      }
      if (!this.isTaunt) {
        this.attack();
      }
    }
  }

  private attack(): void {
    // TODO: something depending on monster
    // need to update database and create capacities
    const isPlayerAlive = this.handleMonsterAction();
    if (isPlayerAlive) {
      this.attackTime = Date.now();
      this.attackAnimationTime = Date.now();
      this.changeStatus('Attack');
      this.handleMonsterAction(true);
    }
  }

  private animate(): void {
    if (this.sprite < this.sprites[this.status].end) {
      this.sprite += 1;
    } else {
      if (this.status === 'Death') {
        return;
      }
      if (this.status === 'GetHit') {
        this.changeStatus('Walk');
      }
      this.sprite = this.sprites[this.status].start;
    }
  }

  private changeStatus(status: string): void {
    this.status = status;
    this.sprite = this.sprites[this.status].start;
  }

  public handleDamage(hitpoints: number): void {
    this.currentLife -= hitpoints;
    this.sendEvent('monsterLife', this.currentLife);
    if (this.currentLife > 0) {
      this.changeStatus('GetHit');
    } else {
      this.changeStatus('Death');
    }
  }

  public handleCapacity(capacity: string, options?: any): void {
    switch (capacity) {
      case 'Frost Blast': {
        this.frozenTime = Date.now();
        this.isFrozen = true;
        break;
      }
      case 'Taunt': {
        this.isTaunt = true;
        this.isHeadingTo = options.isHeadingTo;
        break;
      }
      default:
        break;
    }
  }

  private sendEvent(eventType: string, data: any): void {
    this.addToGameStream({
      playerIndex: this.myPlayerIndex,
      eventType,
      data,
    });
  }
}
