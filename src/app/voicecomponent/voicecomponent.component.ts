
import { Component, OnInit, OnDestroy} from '@angular/core';
import { SpeechRecognitionService } from '../speech-recognition.service';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-voicecomponent',
  templateUrl: './voicecomponent.component.html',
  styleUrls: ['./voicecomponent.component.scss'],
  providers: [ SpeechSynthesisUtteranceFactoryService],
})
export class VoicecomponentComponent implements OnInit {

  showSearchButton: boolean;
  speechData: string;
  voiceContents = [];
  data: string;

  constructor(private speechRecognitionService: SpeechRecognitionService, public f: SpeechSynthesisUtteranceFactoryService,
              public svc: SpeechSynthesisService) {
      this.showSearchButton = true;
      this.speechData = "";
  }
  ngOnInit(): void {
    console.log("hello");
    (window as any).global = window;
      
     // this.speechRecognitionService.getData();

      this.speechRecognitionService.getData().subscribe( data => {
        let parseString = xml2js.parseString; 
        // console.log(data);
        parseString(data, (err, result) => {
          const str = JSON.stringify(result, undefined, 2); 
          // console.log(str);
          const newString = str.replace(/<(?:.|\n)*?>/gm, '');
          // console.log(newString);
          const newStr = JSON.parse(newString);
         // this.testdata = newStr.nlmSearchResult.list[0].document[0].content[5].toString();
          console.log(newStr.nlmSearchResult.list[0].document[0].content[5]._);
          this.data = newStr.nlmSearchResult.list[0].document[0].content[5]._
          return this.data;
          
          // console.dir(JSON.stringify(result, undefined, 2));
        });
      });
  }

  speech() {
    for (const text of this.voiceContents) {
      const v = this.f.text(text);
      this.svc.speak(this.f.text(text));
    }
  }

  OnDestroy() {
      this.speechRecognitionService.DestroySpeechObject();
      this.svc.cancel();
  }

  activateSpeechSearchMovie(): void {
      this.showSearchButton = false;

      this.speechRecognitionService.record()
          .subscribe(
          //listener
          (value) => {
              this.speechData = value;
              console.log(value);
              this.voiceContents.push(this.speechData);
              this.speech();
          },
          //errror
          (err) => {
              console.log(err);
              if (err.error == "no-speech") {
                  console.log("--restatring service--");
                  this.activateSpeechSearchMovie();
              }
          },
          //completion
          () => {
              this.showSearchButton = true;
              console.log("--complete--");
              this.activateSpeechSearchMovie();
          });
  }
}
