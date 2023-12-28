import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService, private toastService: ToastrService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn$.next(tokenValid);
    }
  }

  login(userData: { username: string, password: string }): void {
    this.http.post('/api/token/', userData)
      .subscribe({
        next: (res: any) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('access_token', res.access);
          // TODO: change this to redirect to task list
          this.router.navigate(['movie-list']);
        },
        error: () => {
          // TODO: Show error message
          this.toastService.warning('Invalid username or password', 'Login Failed',
            {easeTime: 250, timeOut: 2000});
        }
      });
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  /**
   *
   * @deprecated DONE IN BACKEND
   */
  hasPermission(permission: string): boolean {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const permissions = decodedToken?.permissions;
    return permissions ? permission in permissions : false;
  }

  /**
   *
   * @deprecated DONE IN BACKEND
   */
  hasClaim(claim: string): boolean {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const claims = decodedToken?.claims;
    return claims ? claim in claims : false;
  }

  /**
   *
   * @param sGroups group-name as string array
   * @return boolean based on jwt groups[] contained in sGroups[]
   */
  hasGroup(sGroups: Array<string>): boolean {
    const token: string|null = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token: '');
    const groups = decodedToken?.groups;
    return groups.some((gr: string) => sGroups.includes(gr));
  }
}
