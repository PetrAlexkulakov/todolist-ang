import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskRequest } from 'src/app/todos/models/tasks.models'
import { TaskStatusEnum } from 'src/app/core/enums/taskStatus.enum'
import { LoggerService } from 'src/app/shared/services/logger.service'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() deleteTaskEvent = new EventEmitter<string>()
  @Output() changeTaskEvent = new EventEmitter<{ taskId: string; newTask: UpdateTaskRequest }>()
  taskStatusEnum = TaskStatusEnum
  editMode = false
  newTitle = ''
  logger = new LoggerService();

  deleteTaskHandler() {
    this.logger.info('Add Delete Task Handler', 'task.component.ts');
    this.deleteTaskEvent.emit(this.task.id)
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    this.logger.info('Add Change Task Status Handler', 'task.component.ts');

    this.changeTask({
      status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
    })
  }

  activateEditModeHandler() {
    this.logger.info('Add Activate Edit Mode Handler', 'task.component.ts');
    this.newTitle = this.task.title
    this.editMode = true
  }

  changeTitleHandler() {
    this.logger.info('Add Change Title Handler', 'task.component.ts');
    this.editMode = false
    this.changeTask({ title: this.newTitle })
    this.newTitle = ''
  }

  changeTask(patch: Partial<UpdateTaskRequest>) {
    this.logger.info('Changing Task', 'task.component.ts');
    const newTask: UpdateTaskRequest = {
      status: this.task.status,
      description: this.task.description,
      completed: this.task.completed,
      deadline: this.task.deadline,
      priority: this.task.priority,
      startDate: this.task.startDate,
      title: this.task.title,
      ...patch,
    }
    this.changeTaskEvent.emit({ taskId: this.task.id, newTask })
  }
}
