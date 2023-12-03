import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { CommonResponseType } from 'src/app/core/models/core.models'
import { ResultCodeEnum } from 'src/app/core/enums/resultCode.enum'
import { Router } from '@angular/router'
import { LoginRequestData, MeResponse } from 'src/app/core/models/auth.models'
import { EMPTY } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { NotificationService } from 'src/app/core/services/notification.service'
import { LoggerService } from 'src/app/shared/services/logger.service'

@Injectable()
export class AuthService {
  isAuth = false

  resolveAuthRequest: Function = () => {}

  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) {}
  login(data: LoginRequestData) {
    this.http
      .post<CommonResponseType<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.logger.info(`Successfully logged in`, 'auth.service.ts')
          this.router.navigate(['/'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }
  logout() {
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.logger.info(`Successfully logged out`, 'auth.service.ts')
          this.router.navigate(['/login'])
        }
        this.logger.error(`Logged out error`, 'auth.service.ts')
      })
  }

  me() {
    this.http
      .get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.logger.info(`Successfully got me()`, 'auth.service.ts')
          this.isAuth = true
        }
        this.resolveAuthRequest()
      })
  }
  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
