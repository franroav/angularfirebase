import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatComfirmDialogComponent } from './mat-comfirm-dialog.component';

describe('MatComfirmDialogComponent', () => {
  let component: MatComfirmDialogComponent;
  let fixture: ComponentFixture<MatComfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatComfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatComfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
