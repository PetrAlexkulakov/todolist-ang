import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { environment } from 'src/environments/environment';

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
    const mockTodoId = '1';

    service.deleteTodo(mockTodoId);

    const req = httpMock.expectOne(`${environment.baseUrl}/todo-lists/${mockTodoId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});

    service.todos$.subscribe(todos => {
      expect(todos).toEqual([]);
    });
  });

  it('should update todo title', () => {
    const mockTodoId = '1';
    const mockTitle = 'Updated Todo';

    service.updateTodoTitle(mockTodoId, mockTitle);

    const req = httpMock.expectOne(`${environment.baseUrl}/todo-lists/${mockTodoId}`);
    expect(req.request.method).toBe('PUT');
  });

  xit('should change filter', () => {
    const mockTodoId = '1';
    const mockFilter = 'completed';
  
    service.changeFilter(mockTodoId, mockFilter);

    service.getTodos();
  
    service.todos$.subscribe(todos => {
      const updatedTodo = todos.find(todo => todo.id === mockTodoId);
      expect(updatedTodo).toBeTruthy();
      expect(updatedTodo?.filter).toEqual(mockFilter);
    });
  });
  
});
