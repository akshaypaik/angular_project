import { taskModel } from './task.model';

export class usersModel{
    username: string;
    password: string;
    tasksdone: Array<taskModel>;
    tasksinprogress: Array<taskModel>;
}