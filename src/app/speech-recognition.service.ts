import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
declare var require: any

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  speechRecognition: any;

  constructor(private zone: NgZone, public http: HttpClient) {
  }

  data: any;  
  returnData: string
  url = 'https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=diabetes&retmax=50';

  getData(): Observable<any> {
    return this.http.get(this.url, {responseType: 'text'}).pipe(
        map((res => res)))
  }

  record(): Observable<string> {

      return Observable.create(observer => {
          const { webkitSpeechRecognition }: IWindow = <IWindow>window;
          this.speechRecognition = new webkitSpeechRecognition();
          this.speechRecognition.continuous = true;
          //this.speechRecognition.interimResults = true;
          this.speechRecognition.lang = 'en-us';
          this.speechRecognition.maxAlternatives = 1;

          this.speechRecognition.onresult = speech => {
              let term: string = "";
              if (speech.results) {
                  var result = speech.results[speech.resultIndex];
                  var transcript = result[0].transcript;
                  if (result.isFinal) {
                      if (result[0].confidence < 0.3) {
                          console.log("Unrecognized result - Please try again");
                      }
                      else {
                          term = _.trim(transcript);
                          console.log("Did you said? -> " + term + " , If not then say something else...");
                      }
                  }
              }
              this.zone.run(() => {
                  observer.next(term);
              });
          };

          this.speechRecognition.onerror = error => {
              observer.error(error);
          };

          this.speechRecognition.onend = () => {
              observer.complete();
          };

          this.speechRecognition.start();
          console.log("Say something - We are listening !!!");
      });
  }

  DestroySpeechObject() {
      if (this.speechRecognition)
          this.speechRecognition.stop();
  }

}
