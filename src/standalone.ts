import { LocalModelSource, SEdgeSchema, SGraphSchema, TYPES } from "sprotty";
import { TaskNodeSchema } from "./model";
import createContainer from "./di.config";

export default async function runTaskNodeGraph() {
    const graph: SGraphSchema = {
        type: 'graph',
        id: 'root',
        children: [
            {
                type: 'task',
                id: 'task01',
                name: 'First Task',
                status: 'finished'
            } as TaskNodeSchema,
            {
                type: 'task',
                id: 'task02',
                name: 'Second Task',
                status: 'running'
            } as TaskNodeSchema,
            {
                type: 'edge',
                id: 'edge01',
                sourceId: 'task01',
                targetId: 'task02'
            } as SEdgeSchema
        ]
    };
    const container = createContainer();
    const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
    modelSource.setModel(graph);
}