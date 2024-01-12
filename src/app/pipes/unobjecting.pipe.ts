import { Pipe, PipeTransform } from '@angular/core';
import {Group} from "../models/Employee";

@Pipe({
  name: 'unobjecting',
  standalone: true
})
export class UnobjectingPipe implements PipeTransform {

  transform(groups: Group[]): string {
    if (groups.length == 0) {
      return "";
    } else {
      return groups.map(group => group.name).join(", ")
    }
  }

}
