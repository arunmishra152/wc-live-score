import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveScoreComponent} from '../app/live-score/live-score.component'

const routes: Routes = [
  {
    path:'live-score' , component: LiveScoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
