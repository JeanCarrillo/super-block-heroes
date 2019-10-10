import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/home/sign-in/sign-in.component';
import { SignUpComponent } from './pages/home/sign-up/sign-up.component';
import { ForgotPwComponent } from './pages/home/forgot-pw/forgot-pw.component';
import { MainComponent } from './pages/main/main.component';
import { LobbyComponent } from './pages/main/lobby/lobby.component';
import { MenuComponent } from './pages/main/menu/menu.component';
import { GameComponent } from './pages/game/game.component';
import { BoardComponent } from './pages/game/board/board.component';
import { MonsterComponent } from './pages/game/monster/monster.component';
import { ScoreComponent } from './pages/game/score/score.component';
import { PlayerContainerComponent } from './pages/game/player-container/player-container.component';
import { StoreComponent } from './pages/store/store.component';
import { SocialComponent } from './pages/social/social.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { CollectionComponent } from './collection/collection.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPwComponent,
    MainComponent,
    LobbyComponent,
    MenuComponent,
    GameComponent,
    BoardComponent,
    MonsterComponent,
    ScoreComponent,
    PlayerContainerComponent,
    StoreComponent,
    SocialComponent,
    MyaccountComponent,
    RankingComponent,
    CollectionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
