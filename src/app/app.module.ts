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
import { ButtonComponent } from './components/button/button.component';
import { PlayerContainerComponent } from './pages/game/player-container/player-container.component';
import { StoreComponent } from './pages/main/store/store.component';
import { SocialComponent } from './pages/main/social/social.component';
import { MyaccountComponent } from './pages/main/myaccount/myaccount.component';
import { RankingComponent } from './pages/main/ranking/ranking.component';
import { CollectionComponent } from './pages/main/collection/collection.component';
import { BackgroundComponent } from './pages/game/background/background.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const serverURL = `http://localhost`;
const serverPort = 5000;
const socketConfig: SocketIoConfig = { url: `${serverURL}:${serverPort}`, options: {} };

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
    ButtonComponent,
    PlayerContainerComponent,
    StoreComponent,
    SocialComponent,
    MyaccountComponent,
    RankingComponent,
    CollectionComponent,
    BackgroundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SocketIoModule.forRoot(socketConfig)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
