import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostJobComponent } from './post-a-job/post-a-job.component';
import { HomeComponent } from './home/home.component';
import { PlumberComponent } from './home/tradeperson-pages/plumber/plumber.component'
import { CarpenterComponent } from './home/tradeperson-pages/carpenter/carpenter.component';
import { ElectricianComponent } from './home/tradeperson-pages/electrician/electrician.component';
import { DecoratorComponent } from './home/tradeperson-pages/decorator/decorator.component';
import { KitchenSpecialistComponent } from './home/tradeperson-pages/kitchen specialist/kitchenSpecialist.component';
import { RooferComponent } from './home/tradeperson-pages/roofer/roofer.component';
import { CleanerComponent } from './home/tradeperson-pages/cleaner/cleaner.component';
import { BuilderComponent } from './home/tradeperson-pages/builder/builder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    children: [
      { path: 'plumber', component: PlumberComponent },
      { path: 'carpenter', component: CarpenterComponent },
      { path: 'electrician', component: ElectricianComponent },
      { path: 'builder', component: BuilderComponent },
      { path: 'decorator', component: DecoratorComponent },
      { path: 'kitchenspecialist', component: KitchenSpecialistComponent },
      { path: 'roofer', component: RooferComponent  },
      { path: 'cleaner', component: CleanerComponent }
    ], 
  },    
  { path: 'post-a-job/:selectedTradepersonId/:selectedJobId/:startQuestionId', component: PostJobComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
