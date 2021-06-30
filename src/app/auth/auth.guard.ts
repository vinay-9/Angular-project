import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  //matlab kanse route ko activate karega aur kab karega yeh
  // hame pata chalta hai aur aek boolean retturn karega
  // jo ke ek observable ya fir lkoi;bhi promise bhi ho sakta hai

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // tell whether the user is aithenticated or not
    // this acts as a middleware in the frontend
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
/*canActivate(route:ActivaterdRouteSnapShot,
  state:RouterStateSnapshot)
  :boolean|Observable<boolean>|Promise<boolean>{
 const isAuth=this.AuthService.grtIsAuth();
 if(!isauth)
 {
   this.router.navigate(['/login']);
 }
  return isAuth;
  }
*/
