import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JegyvetelComponent } from './jegyvetel.component';

describe('JegyvetelComponent', () => {
  let component: JegyvetelComponent;
  let fixture: ComponentFixture<JegyvetelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JegyvetelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JegyvetelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
