import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login/sign-up/sign-up.component';
import { ForgotPwComponent } from './pages/login/forgot-pw/forgot-pw.component';
import { HomeComponent } from './pages/home/home.component';
import { LobbyComponent } from './pages/home/lobby/lobby.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { GameComponent } from './pages/game/game.component';
import { BoardComponent } from './components/game/board/board.component';
import { MonsterComponent } from './components/game/monster/monster.component';
import { ScoreComponent } from './components/game/score/score.component';
import { ButtonComponent } from './components/button/button.component';
import { PlayerContainerComponent } from './components/game/player-container/player-container.component';
import { StoreComponent } from './pages/home/store/store.component';
import { SocialComponent } from './pages/home/social/social.component';
import { MyaccountComponent } from './pages/home/myaccount/myaccount.component';
import { RankingComponent } from './pages/home/ranking/ranking.component';
import { CollectionComponent } from './pages/home/collection/collection.component';
import { BackgroundComponent } from './components/background/background.component';
import { HeroesListComponent } from './pages/home/collection/heroes-list/heroes-list.component';
import { MonstersListComponent } from './pages/home/collection/monsters-list/monsters-list.component';
import { MonsterCardComponent } from './pages/home/collection/monsters-list/monster-card/monster-card.component';
import { HeroComponent } from './components/hero/hero.component';

import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LogoComponent } from './components/logo/logo.component';
import { UserCardComponent } from './components/user-card/user-card.component';

const serverURL = `http://localhost`;
const serverPort = 5000;
const socketConfig: SocketIoConfig = {
  url: `${serverURL}:${serverPort}`,
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPwComponent,
    HomeComponent,
    LobbyComponent,
    NavMenuComponent,
    GameComponent,
    BoardComponent,
    MonsterComponent,
    ScoreComponent,
    ButtonComponent,
    PlayerContainerComponent,
    StoreComponent,
    SocialComponent,
    MyaccountComponent,
    RankingComponent,
    CollectionComponent,
    BackgroundComponent,
    HeroesListComponent,
    MonstersListComponent,
    MonsterCardComponent,
    LogoComponent,
    UserCardComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
