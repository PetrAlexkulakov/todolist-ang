import { Component, EventEmitter, Input, Output } from '@angular/core'
import { LoggerService } from 'src/app/shared/services/logger.service'
import { FilterType } from 'src/app/todos/models/todos.models'

@Component({
  selector: 'tl-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.css'],
})
export class TodoFiltersComponent {
  @Output() changeFilterEvent = new EventEmitter<FilterType>()
  @Input() filter!: FilterType
  logger = new LoggerService();
  changeFilterHandler(filter: FilterType) {
    this.logger.info('Filter changed', 'todo-filters.component.ts', filter)
    this.changeFilterEvent.emit(filter)
  }
}
