export enum Status {
    CREATED = 'created',
    PROCESSING = 'processing',
    ABORTED = 'aborted',
    ERROR = 'error',
    DONE = 'done'
}

export interface ITask {
    task: string;
    id: number;
    status: Status;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
