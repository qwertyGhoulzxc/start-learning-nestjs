import {Body, Injectable, Param} from '@nestjs/common';
import {ITask} from "@src/task/task.interface";
import {Task} from "@src/task/task.entity";
import {CreateTaskDto} from "@src/task/dto/create-task.dto";

@Injectable()
export class TaskService {
    private tasks: ITask[] = []

    getTasks(): ITask[] {
        return this.tasks
    }

    getTaskById(id: string): ITask {
        return this.tasks.find(t => t.id === +id)
    }
    createTask({tags,status,task}:CreateTaskDto) : ITask{
        const newTask = new Task(task,tags,status)
        this.tasks.push(newTask)
        return newTask
    }
}
