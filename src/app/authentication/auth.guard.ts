import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from './jwt.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private jwtService: JWTTokenService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable | Promise | boolean {
    if (this.jwtService.getUser()) {
      if (this.jwtService.isTokenExpired()) {
        // Should Redirect Sig-In Page
      } else {
        return true;
      }
    } else {
      return new Promise((resolve) => {
        this.loginService
          .signIncallBack()
          .then((e) => {
            resolve(true);
          })
          .catch((e) => {
            // Should Redirect Sign-In Page
          });
      });
    }
  }
}
