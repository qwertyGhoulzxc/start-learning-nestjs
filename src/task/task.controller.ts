import {Body, Controller, Get, Header, HttpCode, Param, Post, Redirect, UsePipes, ValidationPipe} from '@nestjs/common';
import {ITask} from "@src/task/task.interface";
import {TaskService} from "@src/task/task.service";
import {CreateTaskDto} from "@src/task/dto/create-task.dto";


@Controller('task')
export class TaskController {

    constructor(private readonly testService: TaskService) {
    }

    @Get()
    // @HttpCode(206)
    // @Header('test', 'test111')
    // @Redirect('https://docs.nestjs.com/controllers')
    getTasks(): ITask[] {
        return this.testService.getTasks()
    }

// , {transform: id => Number(id)}
    @Get(':id')
    getTaskById(@Param('id') id: string): ITask {
        return this.testService.getTaskById(id)
    }

    @UsePipes(new ValidationPipe())
    @Post()
    createTask(@Body() task: CreateTaskDto ): ITask {
        return this.testService.createTask(task)
    }
}
