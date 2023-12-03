import { Component, EventEmitter, Input, Output } from '@angular/core'
import { LoggerService } from 'src/app/shared/services/logger.service'
import { DomainTodo, FilterType } from 'src/app/todos/models/todos.models'
import { TodosService } from 'src/app/todos/services/todos.service'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo!: DomainTodo
  @Output() deleteTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ todoId: string; title: string }>()
  isEditMode = false
  newTitle = ''
  constructor(private todosService: TodosService, private logger: LoggerService) {}

  deleteTodoHandler() {
    this.logger.info('Delete Todo Handler', 'todo.component.ts');
    this.deleteTodoEvent.emit(this.todo.id)
  }
  activateEditModeHandler() {
    this.logger.info('Activate Edit Mode Handler', 'todo.component.ts');
    this.newTitle = this.todo.title
    this.isEditMode = true
  }
  editTitleHandler() {
    this.logger.info('Edit Title', 'todo.component.ts');
    this.isEditMode = false
    this.editTodoEvent.emit({ todoId: this.todo.id, title: this.newTitle })
  }

  changeFilter(filter: FilterType) {
    this.logger.info('Changing Filters', 'todo.component.ts', filter);
    this.todosService.changeFilter(this.todo.id, filter)
  }
}
