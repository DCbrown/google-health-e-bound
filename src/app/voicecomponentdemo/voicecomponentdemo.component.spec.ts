import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicecomponentdemoComponent } from './voicecomponentdemo.component';

describe('VoicecomponentdemoComponent', () => {
  let component: VoicecomponentdemoComponent;
  let fixture: ComponentFixture<VoicecomponentdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoicecomponentdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicecomponentdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
