import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { environment } from 'src/environments/environment';
import { DomainTodo } from '../models/todos.models';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });
    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get todos', () => {
    const mockTodos = [{   
        id: '1',
        title: 'string',
        addedDate: 'string',
        order: 1, 
        filter: 'all',
    }, {   
        id: '2',
        title: 'string',
        addedDate: 'string',
        order: 2, 
        filter: 'all',
    }];

    service.getTodos();

    const req = httpMock.expectOne(`${environment.baseUrl}/todo-lists`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTodos);

    service.todos$.subscribe(todos => {
      expect(todos).toEqual(mockTodos.map(todo => ({ ...todo, filter: 'all' })));
    });
  });

  it('should add todo', () => {
    const mockTodo = {   
        id: '3',
        title: 'string',
        addedDate: 'string',
        order: 3, 
        filter: 'all',
    };

    service.addTodo('New Todo');

    const req = httpMock.expectOne(`${environment.baseUrl}/todo-lists`);
    expect(req.request.method).toBe('POST');

    req.flush({ data: { item: mockTodo } });

    service.todos$.subscribe(todos => {
      expect(todos).toEqual([{ ...mockTodo, filter: 'all' }]);
    });
  });

  it('should delete todo', () => {
    const mockTodos = [
      { id: '1', title: 'Todo 1', addedDate: '2022-01-01', order: 1, filter: 'all' },
      { id: '2', title: 'Todo 2', addedDate: '2022-01-02', order: 2, filter: 'all' }
    ] as DomainTodo[];
    const mockTodoId = '1';

    service.todos$.next(mockTodos);

    service.deleteTodo(mockTodoId);

    const req = httpMock.expectOne(`${environment.baseUrl}/todo-lists/${mockTodoId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});

    service.todos$.subscribe(todos => {
      expect(todos.length).toBe(1)
    });
  });

  it('should update todo title', fakeAsync(() => {
    const mockTodos = [
      { id: '1', title: 'Todo 1', addedDate: '2022-01-01', order: 1, filter: 'all' },
      { id: '2', title: 'Todo 2', addedDate: '2022-01-02', order: 2, filter: 'all' }
    ] as DomainTodo[];
    const mockTodoId = '1';
    const mockTitle = 'Updated Todo';

    // Предполагаем, что текущее состояние todos$ содержит mockTodos
    service.todos$.next(mockTodos);

    // Фейковый ответ от сервера
    const mockResponse = { resultCode: 0 };

    service.updateTodoTitle(mockTodoId, mockTitle);

    const req = httpMock.expectOne(`${environment.baseUrl}/todo-lists/${mockTodoId}`);
    expect(req.request.method).toBe('PUT');

    req.flush(mockResponse);

    tick(); // Дождитесь завершения всех асинхронных операций

    service.todos$.subscribe(todos => {
      const updatedTodo = todos.find(todo => todo.id === mockTodoId);
      expect(updatedTodo).toBeTruthy();
      expect(updatedTodo?.title).toEqual(mockTitle);

      // Проверьте, что другие todos не были изменены
      expect(todos.find(todo => todo.id === '2')?.title).toEqual('Todo 2');
    });
  }));

  it('should change filter', fakeAsync(() => {
    const mockTodos = [
      { id: '1', title: 'Todo 1', addedDate: '2022-01-01', order: 1, filter: 'all' },
      { id: '2', title: 'Todo 2', addedDate: '2022-01-02', order: 2, filter: 'all' }
    ] as DomainTodo[];
    const mockTodoId = '1';
    const mockFilter = 'completed';

    // Предполагаем, что текущее состояние todos$ содержит mockTodos
    service.todos$.next(mockTodos);

    service.changeFilter(mockTodoId, mockFilter);

    tick(); // Дождитесь завершения всех асинхронных операций

    service.todos$.subscribe(todos => {
      const updatedTodo = todos.find(todo => todo.id === mockTodoId);
      expect(updatedTodo).toBeTruthy();
      expect(updatedTodo?.filter).toEqual(mockFilter);

      // Проверьте, что другие todos не были изменены
      expect(todos.find(todo => todo.id === '2')?.filter).toEqual('all');
    });
  }));
});
