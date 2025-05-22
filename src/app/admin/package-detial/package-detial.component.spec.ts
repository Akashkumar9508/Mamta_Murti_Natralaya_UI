import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetialComponent } from './package-detial.component';

describe('PackageDetialComponent', () => {
  let component: PackageDetialComponent;
  let fixture: ComponentFixture<PackageDetialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageDetialComponent]
    });
    fixture = TestBed.createComponent(PackageDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
