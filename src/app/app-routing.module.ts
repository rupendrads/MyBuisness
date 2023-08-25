import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostJobComponent } from './post-a-job/post-a-job.component';
import { HomeComponent } from './home/home.component';
import { PlumberComponent } from './home/tradeperson-pages/plumber/plumber.component'
import { CarpenterComponent } from './home/tradeperson-pages/carpenter/carpenter.component';
import { ElectricianComponent } from './home/tradeperson-pages/electrician/electrician.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plumber', component: PlumberComponent },
  { path: 'carpenter', component: CarpenterComponent },
  { path: 'electrician', component: ElectricianComponent },
  { path: 'post-a-job/:selectedTradepersonId/:selectedJobId/:startQuestionId', component: PostJobComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
