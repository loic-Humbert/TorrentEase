import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropZonePageComponent } from './drop-zone-page.component';

describe('DropZonePageComponent', () => {
  let component: DropZonePageComponent;
  let fixture: ComponentFixture<DropZonePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropZonePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropZonePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
