import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFiltersComponent } from './todo-filters.component';
import { FilterType } from 'src/app/todos/models/todos.models';

describe('TodoFiltersComponent', () => {
  let component: TodoFiltersComponent;
  let fixture: ComponentFixture<TodoFiltersComponent>;
  let changeFilterEventSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFiltersComponent);
    component = fixture.componentInstance;
    changeFilterEventSpy = spyOn(component.changeFilterEvent, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeFilterEvent on changeFilterHandler', () => {
    const filter: FilterType = 'completed';

    // Устанавливаем значение filter
    component.filter = filter;

    // Вызываем метод changeFilterHandler
    component.changeFilterHandler(filter);

    // Ожидаем, что changeFilterEvent был вызван с правильным параметром
    expect(changeFilterEventSpy).toHaveBeenCalledWith(filter);
  });
});
