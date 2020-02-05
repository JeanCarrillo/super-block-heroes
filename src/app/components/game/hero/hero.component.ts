import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { heroSprites } from '../../../shared/constants/sprites';
import { MonsterService } from 'src/app/shared/services/monster.service';
import { Monster } from 'src/app/shared/models/monster';
import { Hero } from 'src/app/shared/models/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, AfterViewInit {
  // @ViewChild('hero', { static: false }) heroRef: ElementRef;
  @Input() hero: Hero;
  @Input() monster: Monster;
  img: string;
  // initialX: number;
  // initialY: number;

  constructor(private monsterService: MonsterService) {}

  ngOnInit(): void {
    this.img = `url(/assets/img/heroes/${this.hero.name.replace(' ', '')}.png)`;
    // setInterval(() => {
    //   if (this.monsterService.ref) {
    //     console.log(
    //       'gg1',
    //       this.monsterService.ref.nativeElement.offsetLeft,
    //       this.monsterService.ref.nativeElement.offsetTop
    //     );
    //   }
    // }, 1000);
  }

  ngAfterViewInit(): void {
    // console.log(this.heroRef.nativeElement.offsetLeft);
    // console.log(this.heroRef.nativeElement.offsetTop);
    // this.initialX = this.heroRef.nativeElement.offsetLeft;
    // this.initialY = this.heroRef.nativeElement.offsetTop;
  }

  getBackgroundPosition(): string {
    return `0 ${this.hero.sprite === 0 ? 0 : (100 / heroSprites.total) * this.hero.sprite}%`;
  }

  getHeroPosition(): any {
    if (this.hero.status === 'Attack') {
      return {
        top: `calc(${window.innerHeight}px - 8vw - 4vh)`,
        left: `${this.monster.x - 8}vw`,
      };
    }
    return {
      top: '',
      left: '',
    };
  }

  // getCurrentPosition(direction: string): string {
  //   if (this.hero.status === 'Attack') {
  //     if (direction === 'top') {
  //       return `${window.innerHeight - this.monsterService.ref.nativeElement.offsetTop}px`;
  //     }
  //     if (direction === 'left') {
  //       return `calc(${this.monster.x}vw - 30px)`;
  //     }
  //   }
  //   if (this.heroRef) {
  //     if (direction === 'top') {
  //       return `${this.initialY}px`;
  //     }
  //     if (direction === 'left') {
  //       return `${this.initialX}px`;
  //     }
  //   }
  //   return '0px';
  // }
}
