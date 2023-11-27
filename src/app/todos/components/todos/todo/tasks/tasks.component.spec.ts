import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from 'rxjs';
import { TasksComponent } from "./tasks.component";
import { TasksService } from "src/app/todos/services/tasks.service";
import { TodosService } from "src/app/todos/services/todos.service";
import { TaskStatusEnum } from "src/app/core/enums/taskStatus.enum";

describe('TasksComponent', () => {
    let component: TasksComponent;
    let fixture: ComponentFixture<TasksComponent>;
    let tasksServiceMock: jasmine.SpyObj<TasksService>;
    let todosServiceMock: jasmine.SpyObj<TodosService>;

    beforeEach(async () => {
        tasksServiceMock = jasmine.createSpyObj('TasksService', ['getTasks', 'addTask', 'deleteTask', 'updateTask']);
        todosServiceMock = jasmine.createSpyObj('TodosService', ['getTodos']);

        await TestBed.configureTestingModule({
            declarations: [
                TasksComponent
            ],
            providers: [
                { provide: TasksService, useValue: tasksServiceMock },
                { provide: TodosService, useValue: todosServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TasksComponent);
        component = fixture.componentInstance;
        component.todoId = '1';
        fixture.detectChanges();
    });

    it('should create tasks component', () => {
        expect(component).toBeTruthy();
    });

    it('should call tasksService.getTasks on ngOnInit', () => {
        expect(tasksServiceMock.getTasks).toHaveBeenCalledWith(component.todoId);
    });

    it('should call tasksService.addTask on addTaskHandler', () => {
        component.taskTitle = 'New Task';
        component.addTaskHandler();
        expect(tasksServiceMock.addTask).toHaveBeenCalledWith(component.todoId, 'New Task');
    });

    it('should call tasksService.deleteTask on deleteTask', () => {
        const taskId = 'taskId123';
        component.deleteTask(taskId);
        expect(tasksServiceMock.deleteTask).toHaveBeenCalledWith(component.todoId, taskId);
    });

    it('should call tasksService.updateTask on changeTaskStatus', () => {
        const taskId = 'taskId123';
        const newTask = {
            title: 'Updated Title',
            description: 'Updated Description',
            completed: true,
            status: TaskStatusEnum.completed,
            priority: 1,
            startDate: '2023-01-01',
            deadline: '2023-01-31',
        };
        component.changeTaskStatus({ taskId, newTask });
        expect(tasksServiceMock.updateTask).toHaveBeenCalledWith(component.todoId, taskId, newTask);
    });
});
