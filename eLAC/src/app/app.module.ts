import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
/** Statefull Components */
import { AppComponent } from './app.component';
/** Services */
import { ElacApiServices } from './services/elac-api-services';
/** http interceptor */
import { ElacApiInterceptor } from './services/elac-api.interceptor';
import { ElacAudioPlayerComponent } from './elac-audio/elac-audio-player.component';
import { ElacCollectionComponent } from './elac-collection/elac-collection.component';
import { ElacMainComponent } from './elac-main/elac-main.component';
/** stateless Components */
import { ElacVideoPlayerComponent } from './elac-video/elac-video-player.component';
import { ElacSearchComponent } from './elac-search/elac-search.component';
/** Angular Material Module */
import { UiMaterialDesignModule } from './shared/ui-material-design.module';
import { ElacDataService } from './services/elac-data.service';
import { ElacSearchHitsComponent } from './elac-search-hits/elac-search-hits.component';


// ########### Router/Routing-Paths ##########
const routes: Routes = [
  { path: '', component: ElacMainComponent },
  { path: 'collection/:name/:prefix/:id', component: ElacCollectionComponent },
  { path: 's', component: ElacSearchHitsComponent },
  { path: 'videoplayer/:prefix/:id/:contentType/:suffix', component: ElacVideoPlayerComponent },
  { path: 'audioplayer/:prefix/:id/:contentType/:suffix', component: ElacAudioPlayerComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
// ########### /Router/Routing-Paths ##########

@NgModule({
  declarations: [
    AppComponent,
    ElacMainComponent,
    ElacSearchComponent,
    ElacCollectionComponent,
    ElacAudioPlayerComponent,
    ElacVideoPlayerComponent,
    ElacSearchHitsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    UiMaterialDesignModule
  ],
  providers: [
    ElacApiServices,
    ElacDataService,
    { provide: HTTP_INTERCEPTORS, useClass: ElacApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('elac-dark-theme');
  }
}
