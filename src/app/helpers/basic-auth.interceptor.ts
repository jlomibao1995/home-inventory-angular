import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private _cookieService: CookieService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        let credentials = this._cookieService.get('currentUser');

        if (credentials) {
            let currentUser = JSON.parse(credentials);
            if (currentUser && currentUser.authdata) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Basic ${currentUser.authdata}`
                    }
                });
            }
        }

        return next.handle(request);
    }
}