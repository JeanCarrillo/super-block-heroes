// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';

// authentification
import { LoginComponent } from './pages/authentification/login.component';
import { SignInComponent } from './pages/authentification/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentification/sign-up/sign-up.component';
import { ForgotPwComponent } from './pages/authentification/forgot-pw/forgot-pw.component';

// components
// dumbComponents
import { ButtonComponent } from './components/button/button.component';
import { BackgroundComponent } from './components/background/background.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BoardComponent } from './components/game/board/board.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { CapacityIconComponent } from './components/capacity-icon/capacity-icon.component';
import { MonsterCardComponent } from './components/monster-card/monster-card.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';

// game
import { HeroComponent } from './components/game/hero/hero.component';
import { MonsterComponent } from './components/game/monster/monster.component';
import { ScoreComponent } from './components/game/score/score.component';
import { SocialComponent } from './pages/home/social/social.component';
import { RankingComponent } from './pages/home/ranking/ranking.component';
import { PlayerContainerComponent } from './components/game/player-container/player-container.component';

// page components
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { LobbyComponent } from './pages/home/lobby/lobby.component';
import { MyaccountComponent } from './pages/home/myaccount/myaccount.component';
import { StoreComponent } from './pages/home/store/store.component';
import { CollectionComponent } from './pages/home/collection/collection.component';
import { MonstersListComponent } from './pages/home/collection/monsters-list/monsters-list.component';
import { HeroesListComponent } from './pages/home/collection/heroes-list/heroes-list.component';

// fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// bootstrap

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
    CapacityIconComponent,
    HeroCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
