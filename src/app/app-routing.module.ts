import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostJobComponent } from './post-a-job/post-a-job.component';
import { HomeComponent } from './home/home.component';
import { PlumberComponent } from './home/tradeperson-pages/plumber/plumber.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plumber', component: PlumberComponent },
  { path: 'post-a-job/:selectedTradepersonId/:selectedJobId/:startQuestionId', component: PostJobComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
