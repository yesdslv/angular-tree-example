import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    baseUrl = 'http://127.0.0.1:8000';
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: `${this.baseUrl}/${req.url}` })
        return next.handle(apiReq); 
    }
}
