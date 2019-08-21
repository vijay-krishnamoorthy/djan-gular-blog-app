import { Injectable, Injector } from '@angular/core';
import { HttpEvent,HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private jwtservice:JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        };

        const token = this.jwtservice.getToken();

        if(token) {
            headersConfig['Authorization'] = `Token ${token}`;
        }

        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request);
    }
}