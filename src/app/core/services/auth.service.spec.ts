import { TodosModule } from './../../todos/todos.module';
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { NotificationService } from "./notification.service";
import { ResultCodeEnum } from "../enums/resultCode.enum";
import { environment } from "src/environments/environment";
import { LoginRequestData } from "../models/auth.models";
import { AuthModule } from 'src/app/auth/auth.module';

describe('AuthService', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;
    let notificationService: NotificationService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule, 
            RouterTestingModule.withRoutes([{ path: '', component: TodosModule }, { path: 'login', component: AuthModule }])],
        providers: [AuthService, NotificationService],
      });
  
      authService = TestBed.inject(AuthService);
      httpTestingController = TestBed.inject(HttpTestingController);
      notificationService = TestBed.inject(NotificationService);
    });
  
    afterEach(() => {
      httpTestingController.verify();
    });
  
    it('should be created', () => {
      expect(authService).toBeTruthy();
    });
  
    it('should set isAuth to true on successful me() call', () => {
      authService.me();
  
      const req = httpTestingController.expectOne(`${environment.baseUrl}/auth/me`);
      req.flush({ resultCode: ResultCodeEnum.success });

      expect(authService.isAuth).toBeTruthy();
    });

    it('should navigate to "/" on successful login() call', () => {
      const loginData: LoginRequestData = {
        email: 'p-pup1@mail.ru',
        password: "ntcn2614",
        rememberMe: false
      }

      authService.login(loginData);

      const req = httpTestingController.expectOne(`${environment.baseUrl}/auth/login`);
      req.flush({ resultCode: ResultCodeEnum.success });
    });

    it('should navigate to "/login" on successful logout() call', () => {
      authService.logout();
  
      const req = httpTestingController.expectOne(`${environment.baseUrl}/auth/login`);
      req.flush({ resultCode: ResultCodeEnum.success });
    });

    it('should handle error in login() and call notificationService.handleError', () => {
        spyOn(notificationService, 'handleError');
  
        const loginData: LoginRequestData = {
            email: 'wrongmail.ru',
            password: "wrong",
            rememberMe: false
        }
        authService.login(loginData);
  
        const req = httpTestingController.expectOne(`${environment.baseUrl}/auth/login`);
        req.error(new ErrorEvent('error'));
  
        expect(authService.isAuth).toBeFalsy();
        expect(notificationService.handleError).toHaveBeenCalled();
    });

    it('should handle error in me() and call notificationService.handleError', () => {
        spyOn(notificationService, 'handleError');
  
        authService.me();
  
        const req = httpTestingController.expectOne(`${environment.baseUrl}/auth/me`);
        req.error(new ErrorEvent('error'));
  
        expect(authService.isAuth).toBeFalsy();
        expect(notificationService.handleError).toHaveBeenCalled();
    });
});
