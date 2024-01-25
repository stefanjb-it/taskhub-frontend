import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const supervisorGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (!userService.hasGroup(['Manager','Supervisor'])) {
    router.navigate(['management'])
    return false;
  }
  return true;
};
