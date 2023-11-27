import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodosComponent } from "./todos.component";
import { AuthService } from "src/app/core/services/auth.service";
import { TodosService } from "src/app/todos/services/todos.service";
import { of } from "rxjs";

describe('TodosComponent', () => {
    let fixture: ComponentFixture<TodosComponent>;
    let component: TodosComponent;
    let authServiceMock: jasmine.SpyObj<AuthService>;
    let todosServiceMock: jasmine.SpyObj<TodosService>;

    beforeEach(() => {
        authServiceMock = jasmine.createSpyObj('AuthService', ['logout']);
        todosServiceMock = jasmine.createSpyObj('TodosService', ['getTodos', 'addTodo', 'deleteTodo', 'updateTodoTitle', 'todos$']);

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: TodosService, useValue: todosServiceMock }
            ],
            declarations: [TodosComponent],
        });

        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
    });

    it('should create todos component', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit() correctly', () => {
        component.ngOnInit();
        expect(todosServiceMock.getTodos).toHaveBeenCalled();
    });

    it('should call addTodoHandler() correctly', () => {
        const todoTitle = 'New Todo';
        component.todoTitle = todoTitle;

        component.addTodoHandler();

        expect(todosServiceMock.addTodo).toHaveBeenCalledWith(todoTitle);
        expect(component.todoTitle).toBe('');
    });

    it('should call deleteTodo() correctly', () => {
        const todoId = '123';
        component.deleteTodo(todoId);

        expect(todosServiceMock.deleteTodo).toHaveBeenCalledWith(todoId);
    });

    it('should call editTodo() correctly', () => {
        const todoId = '123';
        const newTitle = 'Updated Title';
        component.editTodo({ todoId, title: newTitle });

        expect(todosServiceMock.updateTodoTitle).toHaveBeenCalledWith(todoId, newTitle);
    });

    it('should call logoutHandler() correctly', () => {
        component.logoutHandler();

        expect(authServiceMock.logout).toHaveBeenCalled();
    });
});
