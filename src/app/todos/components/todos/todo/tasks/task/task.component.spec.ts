import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TaskStatusEnum } from 'src/app/core/enums/taskStatus.enum';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let deleteTaskSpy: jasmine.Spy;
  let changeTaskSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = {
        id: '1',
        todoListId: 'todo',
        order: 3,
        addedDate: '20.10.2020',
        title: 'string',
        description: 'string',
        completed: true,
        status: 1,
        priority: 1,
        startDate: '20.10.2020',
        deadline: '20.10.2020'
    };

    deleteTaskSpy = spyOn(component.deleteTaskEvent, 'emit');
    changeTaskSpy = spyOn(component.changeTaskEvent, 'emit');

    fixture.detectChanges();
  });

  it('should create task component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteTaskEvent on deleteTaskHandler', () => {
    component.deleteTaskHandler();
    expect(deleteTaskSpy).toHaveBeenCalledWith(component.task.id);
  });

//   it('should emit changeTaskEvent on changeTaskStatusHandler', () => {
//     const event = { currentTarget: { checked: true } } as unknown as MouseEvent;
//     component.changeTaskStatusHandler(event);
//     const expectedTask = { status: TaskStatusEnum.completed };
//     expect(changeTaskSpy).toHaveBeenCalledWith({ taskId: component.task.id, newTask: expectedTask });
//   });

  it('should set editMode to true on activateEditModeHandler', () => {
    component.activateEditModeHandler();
    expect(component.editMode).toBeTrue();
  });

//   it('should emit changeTaskEvent and reset editMode on changeTitleHandler', () => {
//     component.newTitle = 'New Title';
//     component.changeTitleHandler();
//     const expectedTask = { title: 'New Title' };
//     expect(changeTaskSpy).toHaveBeenCalledWith({ taskId: component.task.id, newTask: { ...component.task, ...expectedTask } });
//     expect(component.editMode).toBeFalse();
//     expect(component.newTitle).toBe('');
//   });

  it('should emit changeTaskEvent on changeTask', () => {
    const patch = { description: 'New Description', priority: 2 };
    component.changeTask(patch);
    const expectedTask = {
      status: component.task.status,
      description: 'New Description',
      completed: component.task.completed,
      deadline: component.task.deadline,
      priority: 2,
      startDate: component.task.startDate,
      title: component.task.title,
    };
    expect(changeTaskSpy).toHaveBeenCalledWith({ taskId: component.task.id, newTask: expectedTask });
  });
});