export interface Employee {
  pk: number
  username: string
  first_name: string
  last_name: string
  email: string
  groups: string[]
  is_active: boolean
  employee_type: string
  address: string
  phone: string
  birth_date: string
  gender: string
  drivers_license_status: boolean
}

export interface ChangeEmployee {
  username?: string
  first_name?: string
  last_name?: string
  email?: string
  groups?: string[]
  is_active?: boolean
  employee_type?: string
  address?: string
  phone?: string
  birth_date?: string
  gender?: string
  drivers_license_status?: boolean
}