import {EmployeeGroup} from "./EmployeeGroup";
import {EmployeeType} from "./EmployeeType";

export interface Employee {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  groups: EmployeeGroup[]
  is_active: boolean
  employee_type: EmployeeType
  address: string
  phone: string
  birth_date: string
  gender: string
  drivers_license_status: boolean
  has_image: boolean
}

export interface ChangeEmployee {
  username?: string
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  groups?: string[]
  is_active?: boolean
  employee_type?: number
  address?: string
  phone?: string
  birth_date?: string
  gender?: string
  drivers_license_status?: boolean
}
