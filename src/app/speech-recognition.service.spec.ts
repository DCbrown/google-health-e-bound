import { TestBed } from '@angular/core/testing';

import { SpeechRecognitionservice } from './speech-recognition.service';

describe('SpeechRecognition.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechRecognitionservice = TestBed.get(SpeechRecognitionsservice);
    expect(service).toBeTruthy();
  });
});
