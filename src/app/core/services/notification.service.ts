import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notify } from 'src/app/core/models/notify.models'
import { LoggerService } from 'src/app/shared/services/logger.service'

@Injectable()
export class NotificationService {
  notify$ = new BehaviorSubject<Notify | null>(null)
  logger = new LoggerService()

  handleError(message: string) {
    this.logger.error('Notification Error', 'notification.service.ts')
    this.notify$.next({ severity: 'error', message })
  }

  handleSuccess(message: string) {
    this.logger.info('Notification Succes', 'notification.service.ts')
    this.notify$.next({ severity: 'success', message })
  }

  clear() {
    this.logger.info('Notification Cleared', 'notification.service.ts')
    this.notify$.next(null)
  }
}
