import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { GameComponent } from './pages/game/game.component';
import { StoreComponent } from './pages/main/store/store.component';
import { SocialComponent } from './pages/main/social/social.component';
import { MyaccountComponent } from './pages/main/myaccount/myaccount.component';
import { RankingComponent } from './pages/main/ranking/ranking.component';
import { CollectionComponent } from './pages/main/collection/collection.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'accueil', component: MainComponent },
  { path: 'game', component: GameComponent },
  { path: 'store', component: StoreComponent },
  { path: 'social', component: SocialComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'collection', component: CollectionComponent },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
