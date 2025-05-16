import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<Request>,
    next: HttpHandler
  ): Observable<HttpEvent<Event>> {

    const reqresKey='reqres-free-v1'

      request = request.clone({
        setHeaders: {
          'x-api-key': reqresKey
        },
      })

    return next.handle(request)
  }
}
