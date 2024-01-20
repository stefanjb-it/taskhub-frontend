import {TaskType} from "./TaskType";
import {TaskStatus} from "./TaskStatus";
import {Order} from "./Order";
import {Employee} from "./Employee";
import {Vehicle} from "./Vehicle";
import {Image} from "./Image";

export interface TaskList {
  id: number
  title: string
  task_type: string
  task_status: string
  scheduled_to: string
}

export interface Task {
  id: number
  title: string
  task_type: TaskType
  task_status: TaskStatus
  order: Order
  employees: Employee[]
  vehicles: Vehicle[]
  images: Image[]
  scheduled_from: string
  from_shift: string
  scheduled_to: string
  to_shift: string
}

export interface ChangeTask {
  title?: string
  task_type?: number
  task_status?: number
  vehicles?: number[]
  order?: number
  employees?: number[]
  scheduled_from?: string
  from_shift?: string
  scheduled_to?: string
  to_shift?: string
}
