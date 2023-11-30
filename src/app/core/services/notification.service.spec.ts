import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { Notify } from 'src/app/core/models/notify.models';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });

    notificationService = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should handle error and emit notify$ with severity "error"', () => {
    const errorMessage = 'An error occurred';
    
    notificationService.handleError(errorMessage);

    notificationService.notify$.subscribe((notification: Notify | null) => {
      expect(notification).toBeTruthy();
      expect(notification!.severity).toBe('error');
      expect(notification!.message).toBe(errorMessage);
    });
  });

  it('should handle success and emit notify$ with severity "success"', () => {
    const successMessage = 'Operation completed successfully';
    
    notificationService.handleSuccess(successMessage);

    notificationService.notify$.subscribe((notification: Notify | null) => {
      expect(notification).toBeTruthy();
      expect(notification!.severity).toBe('success');
      expect(notification!.message).toBe(successMessage);
    });
  });

  it('should clear notification and emit notify$ with null', () => {
    notificationService.clear();

    notificationService.notify$.subscribe((notification: Notify | null) => {
      expect(notification).toBeNull();
    });
  });
});
