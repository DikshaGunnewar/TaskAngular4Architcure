import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/core/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('XHR Intercepted...!!!');

        // add authorization header with jwt token
        const dupReq = req.clone({ headers: req.headers.set('token', `${localStorage.getItem('currentUser')}`) });

        return next.handle(dupReq);
    }
}