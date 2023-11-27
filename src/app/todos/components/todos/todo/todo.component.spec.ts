import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoComponent } from "./todo.component";
import { TodosService } from "src/app/todos/services/todos.service";
import { DomainTodo, FilterType } from "src/app/todos/models/todos.models";
import { By } from "@angular/platform-browser";

describe('TodoComponent', () => {
    let fixture: ComponentFixture<TodoComponent>;
    let component: TodoComponent;
    let todosServiceMock: jasmine.SpyObj<TodosService>;
    const mockTodo: DomainTodo = { id: '1', title: 'Test Todo', filter: 'all', addedDate:'20.12.2022', order: 1 };

    beforeEach(() => {
        todosServiceMock = jasmine.createSpyObj('TodosService', ['changeFilter']);

        TestBed.configureTestingModule({
            providers: [
                { provide: TodosService, useValue: todosServiceMock }
            ],
            declarations: [TodoComponent],
        });

        fixture = TestBed.createComponent(TodoComponent);
        component = fixture.componentInstance;
        component.todo = mockTodo;
        fixture.detectChanges();
    });

    it('should create todo component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit deleteTodoEvent on deleteTodoHandler', () => {
        spyOn(component.deleteTodoEvent, 'emit');
        component.deleteTodoHandler();
        expect(component.deleteTodoEvent.emit).toHaveBeenCalledWith(mockTodo.id);
    });

    it('should set isEditMode to true on activateEditModeHandler', () => {
        component.activateEditModeHandler();
        expect(component.isEditMode).toBe(true);
    });

    it('should emit editTodoEvent on editTitleHandler', () => {
        spyOn(component.editTodoEvent, 'emit');
        component.newTitle = 'Updated Todo';
        component.editTitleHandler();
        expect(component.editTodoEvent.emit).toHaveBeenCalledWith({ todoId: mockTodo.id, title: component.newTitle });
    });

    it('should call changeFilter on changeFilter', () => {
        const mockTodo: DomainTodo = { id: '1', title: 'Test Todo', filter: 'all', addedDate:'20.12.2022', order: 1 };
        component.todo = mockTodo;
    
        fixture.detectChanges();
    
        component.changeFilter('completed');
    
        expect(todosServiceMock.changeFilter).toHaveBeenCalledWith(mockTodo.id, 'completed');
    });
});
