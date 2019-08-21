import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMetaComponent } from './post-meta.component';

describe('PostMetaComponent', () => {
  let component: PostMetaComponent;
  let fixture: ComponentFixture<PostMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
