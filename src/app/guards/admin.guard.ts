import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {map} from "rxjs";

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (!userService.hasGroup(['Administrator'])) {
    router.navigate(['management'])
    return false;
  }
  return true;
};
