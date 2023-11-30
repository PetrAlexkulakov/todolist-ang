import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from "./core/services/auth.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let authServiceMock: jasmine.SpyObj<AuthService>;

    beforeEach(() => {
        authServiceMock = jasmine.createSpyObj('AuthService', ['me']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [{ provide: AuthService, useValue: authServiceMock }],
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(AppComponent);
    });

    it('should create app component', () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should call authService.me() on ngOnInit', () => {
        fixture.detectChanges();

        expect(authServiceMock.me).toHaveBeenCalled();
    });
});
