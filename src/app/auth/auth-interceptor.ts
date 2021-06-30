import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // This is used to get the token
    const authToken = this.authService.getToken();
    //this is used to clone the request
    //and pass the request with the foven headers of authorisation of the token
    //this is the work of the interceptor
    const authRequest = req.clone({
      // to add the header to the tokeen so that the page my access the tolen value from the header part of the url//
      
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
