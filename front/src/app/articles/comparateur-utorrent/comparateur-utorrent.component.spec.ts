import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparateurUtorrentComponent } from './comparateur-utorrent.component';

describe('ComparateurUtorrentComponent', () => {
  let component: ComparateurUtorrentComponent;
  let fixture: ComponentFixture<ComparateurUtorrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparateurUtorrentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparateurUtorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
