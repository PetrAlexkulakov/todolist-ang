import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from "src/app/core/services/auth.service";
import { By } from "@angular/platform-browser";

describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;
    let authServiceMock: jasmine.SpyObj<AuthService>;

    beforeEach(() => {
        authServiceMock = jasmine.createSpyObj('AuthService', ['login']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [{ provide: AuthService, useValue: authServiceMock }],
            declarations: [LoginComponent],
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should create login component', () => {
        expect(component).toBeTruthy();
    });

    it('should have a login form with controls', () => {
        expect(component.loginForm.get('email')).toBeTruthy();
        expect(component.loginForm.get('password')).toBeTruthy();
        expect(component.loginForm.get('rememberMe')).toBeTruthy();
    });

    it('should get email control', () => {
        expect(component.email).toBe(component.loginForm.get('email'));
    });

    it('should get password control', () => {
        expect(component.password).toBe(component.loginForm.get('password'));
    });

    it('should call authService.login() on onLoginSubmit', () => {
        const loginData = {
            email: 'p-pup1@mail.ru',
            password: 'ntcn2614',
            rememberMe: false,
        };
    
        component.loginForm.setValue(loginData);
    
        component.onLoginSubmit();
    
        expect(authServiceMock.login).toHaveBeenCalledWith(loginData);
    });
});
