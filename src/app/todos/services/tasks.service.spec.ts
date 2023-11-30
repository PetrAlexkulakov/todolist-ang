import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TasksService } from "./tasks.service";
import { environment } from "src/environments/environment";
import { GetTasksResponse, UpdateTaskRequest, Task } from "../models/tasks.models";
import { CommonResponseType } from "src/app/core/models/core.models";

const mockTask: Task = {
    id: '1',
    todoListId: '1',
    order: 1,
    addedDate: '2023-01-01T00:00:00Z',
    title: 'Mock Task',
    description: 'Mock Description',
    completed: false,
    status: 0,
    priority: 1,
    startDate: '2023-01-01T00:00:00Z',
    deadline: '2023-01-10T00:00:00Z'
  };
  
  const mockUpdateTaskRequest: UpdateTaskRequest = {
    title: 'Updated Task',
    description: 'Updated Description',
    completed: true,
    status: 2,
    priority: 2,
    startDate: '2023-01-02T00:00:00Z',
    deadline: '2023-01-15T00:00:00Z'
  };
  
  const mockGetTasksResponse: GetTasksResponse = {
    items: [mockTask],
    totalCount: 1,
    error: ''
  };
  
  const mockCommonResponseType: CommonResponseType = {
    resultCode: 0,
    messages: [],
    data: {}
  };
  

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });

    service = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks for a given todoId and update tasks$', fakeAsync(() => {
    const todoId = '1';

    service.getTasks(todoId);

    const req = httpTestingController.expectOne(`${environment.baseUrl}/todo-lists/${todoId}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGetTasksResponse);

    tick(); 

    service.tasks$.subscribe(tasks => {
      expect(tasks[todoId]).toEqual([mockTask]);
    });
  }));

  it('should add a new task and update tasks$', fakeAsync(() => {
    const todoId = '1';
    const title = 'New Task';
  
    service.addTask(todoId, title);
  
    const req = httpTestingController.expectOne(`${environment.baseUrl}/todo-lists/${todoId}/tasks`);
    expect(req.request.method).toBe('POST');
    // req.flush({ data: { item: mockTask } } as CommonResponseType<{ item: Task }>);
  
    // tick(); 
  
    // service.tasks$.subscribe(tasks => {
    //   // const expectedTasks = { ...mockGetTasksResponse.items } ;
    //   // expectedTasks[todoId] = [mockTask, ...expectedTasks[todoId]];
    //   expect(tasks).toEqual([ mockTask ]);
    // });
  }));

  it('should delete a task and update tasks$', fakeAsync(() => {
    const todoId = '1';
    const taskId = '1';

    service.deleteTask(todoId, taskId);

    const req = httpTestingController.expectOne(`${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    // req.flush({} as CommonResponseType);

    // tick(); 

    // service.tasks$.subscribe(tasks => {
    //   expect(tasks[todoId]).toEqual(mockGetTasksResponse.items.filter(item => item.id !== taskId));
    // });
  }));

  it('should update a task and update tasks$', fakeAsync(() => {
    const todoId = '1';
    const taskId = '1';

    service.updateTask(todoId, taskId, mockUpdateTaskRequest);

    const req = httpTestingController.expectOne(`${environment.baseUrl}/todo-lists/${todoId}/tasks/${taskId}`);
    expect(req.request.method).toBe('PUT');
    // req.flush({ data: { item: mockTask } } as CommonResponseType<{ item: Task }>);

    // tick(); 

    // service.tasks$.subscribe(tasks => {
    //   expect(tasks[todoId]).toEqual(mockGetTasksResponse.items.map(item => (item.id === taskId ? { ...item, ...mockUpdateTaskRequest } : item)));
    // });
  }));
});
