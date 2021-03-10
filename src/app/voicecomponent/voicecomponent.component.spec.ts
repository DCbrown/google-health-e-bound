import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicecomponentComponent } from './voicecomponent.component';

describe('VoicecomponentComponent', () => {
  let component: VoicecomponentComponent;
  let fixture: ComponentFixture<VoicecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoicecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
