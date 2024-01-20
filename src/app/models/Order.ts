import {Customer} from "./Customer";

export interface Order {
  id: number
  order_nr: number
  title: string
  order_date: string
  customer: Customer
  is_completed: boolean
}

export interface ChangeOrder {
  order_nr?: number
  title?: string
  customer?: number
  order_date?: string
  is_completed?: boolean
}
