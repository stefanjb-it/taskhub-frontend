import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeGroup} from "../models/EmployeeGroup";

@Pipe({
  name: 'unobjecting',
  standalone: true
})
export class UnobjectingPipe implements PipeTransform {

  transform(groups: EmployeeGroup[]): string {
    if (groups.length == 0) {
      return "";
    } else {
      return groups.map(group => group.name).join(", ")
    }
  }

}
