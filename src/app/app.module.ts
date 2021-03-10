import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule, MatGridListModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoicecomponentComponent } from './voicecomponent/voicecomponent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AudioRecordingService } from './service/audio-recording.service';
import { VoicecomponentdemoComponent } from './voicecomponentdemo/voicecomponentdemo.component';
import { SpeechSynthesisModule } from '@kamiazya/ngx-speech-synthesis';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VoicecomponentComponent,
    VoicecomponentdemoComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SpeechSynthesisModule.forRoot({
      lang: 'en',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
  ],
  providers: [AudioRecordingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
