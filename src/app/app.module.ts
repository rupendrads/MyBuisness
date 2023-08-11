import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PopularJobsComponent } from './home/popular-jobs/popular-jobs.component';
import { HeaderComponent } from './header/header.component';
import { PostJobComponent } from './post-a-job/post-a-job.component';
import { HttpClientModule } from '@angular/common/http';
import { ScreenComponent } from './post-a-job/screen/screen.component';
import { JobtitleComponent } from './post-a-job/screen/static/job-title.component';
import { DescribeComponent } from './post-a-job/screen/static/describe.component';
import { DynamicComponent } from './post-a-job/screen/dynamic/dynamic.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { AddPhotosComponent } from './post-a-job/screen/static/add-photos.component';
import { LogInComponent } from './log-in/log-in.component';
import { BudgetComponent } from './post-a-job/screen/static/budget.component';
import { ContactDetailsComponent } from './post-a-job/screen/static/contact-details.component';
import { JobplaceComponent } from './post-a-job/screen/static/jobplace.component';
import { JobTermsComponent } from './post-a-job/screen/static/job-terms.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PopularJobsComponent,
    HeaderComponent,
    PostJobComponent,
    LogInComponent,
    ScreenComponent,
    DynamicComponent,
    JobtitleComponent,
    DescribeComponent,
    AddPhotosComponent,
    BudgetComponent,
    ContactDetailsComponent,
    JobplaceComponent,
    JobTermsComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    HttpClientModule,
    MatFormFieldModule,    
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatListModule
  ],
  providers: [provideClientHydration(),
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { 
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-icons-outlined');
  }
}
