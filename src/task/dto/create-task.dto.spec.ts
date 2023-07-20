import {plainToInstance} from "class-transformer";
import {CreateTaskDto} from "./create-task.dto";
import {validate} from "class-validator";
import {Status} from "../task.interface";

describe('create-task.dto', () => {
    let dto;
    beforeAll(() => {
        dto = {
            task: '',
            tags: [],
            status: '',
        }
    })
    it('task is empty', async () => {
        const ofImportDto = plainToInstance(CreateTaskDto, dto);
        const errors = await validate(ofImportDto)
        expect(errors.map((err) => err.property).includes('task')).toBeTruthy()
    })

    it('task is not empty', async () => {
        dto.task = 'task'
        const ofImportDto = plainToInstance(CreateTaskDto, dto);
        const errors = await validate(ofImportDto)
        expect(errors.map((err) => err.property).includes('task')).toBeFalsy()
    })

    it('tags is empty', async () => {
        const ofImportDto = plainToInstance(CreateTaskDto, dto);
        const errors = await validate(ofImportDto)
        expect(errors.map((err) => err.property).includes('tags')).toBeTruthy()
        expect(dto.tags.length).toBe(0)
    })

    it('error if one of elems of tags in not string and array in not empty', async () => {
        dto.tags = ['asdasdasd',123]
        const ofImportDto = plainToInstance(CreateTaskDto, dto);
        const errors = await validate(ofImportDto)
        expect(errors.map((err) => err.property).includes('tags')).toBeTruthy()
        expect(dto.tags.length).not.toBe(0)
        expect(dto.tags.every(el => typeof el ==='string')).not.toBeTruthy()
    })

    it('each of elem in string and array is not empty', async () => {
        dto.tags = ['asdasdasd',"123"]
        const ofImportDto = plainToInstance(CreateTaskDto, dto);
        const errors = await validate(ofImportDto)
        expect(dto.tags.length).not.toBe(0)
        expect(errors.map((err) => err.property).includes('tags')).toBeFalsy()

    })

    it('type of status is not value of enum Status', async () => {
        dto.status ='status'
        const ofImportDto = plainToInstance(CreateTaskDto, dto);
        const errors = await validate(ofImportDto)
        expect(errors.map((err) => err.property).includes('status')).toBeTruthy()
    })

    it('type of status is value of enum Status', async () => {
        dto.status = Status.CREATED;
        const ofImportDto = plainToInstance(CreateTaskDto, dto);
        const errors = await validate(ofImportDto)
        expect(errors.map((err) => err.property).includes('status')).toBeFalsy()
        expect(dto.status).toBe('created')
    })
})
