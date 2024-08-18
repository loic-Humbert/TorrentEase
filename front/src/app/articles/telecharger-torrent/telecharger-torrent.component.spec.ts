import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargerTorrentComponent } from './telecharger-torrent.component';

describe('TelechargerTorrentComponent', () => {
  let component: TelechargerTorrentComponent;
  let fixture: ComponentFixture<TelechargerTorrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelechargerTorrentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelechargerTorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
