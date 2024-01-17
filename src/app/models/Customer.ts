export interface Customer {
  id: number
  name: string
  address: string
  phone: string
  is_company: boolean
}

export interface ChangeCustomer {
  name?: string
  address?: string
  phone?: string
  is_company?: boolean
}
