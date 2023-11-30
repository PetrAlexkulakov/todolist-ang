import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifyComponent } from './notify.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { of } from 'rxjs';
import { Notify } from 'src/app/core/models/notify.models';

describe('NotifyComponent', () => {
  let component: NotifyComponent;
  let fixture: ComponentFixture<NotifyComponent>;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyComponent],
      providers: [NotificationService],
    }).compileComponents();

    fixture = TestBed.createComponent(NotifyComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should subscribe to notify$', () => {
//     const mockNotify: Notify = {
//       message: 'Test notification',
//       severity: 'success',
//     };

//     spyOnProperty(notificationService, 'notify$', 'get').and.returnValue(of(mockNotify));

//     component.ngOnInit();

//     expect(notificationService.notify$).toHaveBeenCalled();

//     component.notify$?.subscribe((notify) => {
//       expect(notify).toEqual(mockNotify);
//     });
//   });

  it('should call clear method on closeNotification', () => {
    spyOn(notificationService, 'clear');

    component.closeNotification();

    expect(notificationService.clear).toHaveBeenCalled();
  });
});
