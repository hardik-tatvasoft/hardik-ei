import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HitsComponent } from './component/hits/hits.component';

const routes: Routes = [
  {path:'hits', component: HitsComponent},
  {path:'**', redirectTo:'hits'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
