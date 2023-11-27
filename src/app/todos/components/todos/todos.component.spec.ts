import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "src/app/core/services/auth.service";
import { TodosComponent } from "./todos.component";

describe('TodosComponent', () => {
    let authServiceMock: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
        authServiceMock = jasmine.createSpyObj('AuthService', ['me']);

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                { provide: AuthService, useValue: authServiceMock }
            ],
            declarations: [
                TodosComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    })

    xit('should create todos component', () => {
        const fixture = TestBed.createComponent(TodosComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    })
})