import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostJobComponent } from './post-a-job/post-a-job.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'post-a-job/:selectedTradepersonId/:selectedJobId/:startQuestionId', component: PostJobComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
