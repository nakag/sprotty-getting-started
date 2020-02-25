import { SNode, SNodeSchema } from "sprotty";

export interface TaskNodeSchema extends SNodeSchema {
    name?: string
    status?: string
}

export class TaskNode extends SNode {
    name: string = ''
    status: string = ''
}
