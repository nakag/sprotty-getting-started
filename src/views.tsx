/** @jsx svg */
import { svg } from 'snabbdom-jsx';
import { injectable } from 'inversify';
import { IView, RenderingContext } from "sprotty";
import { TaskNode } from "./model";
import { VNode } from "snabbdom/vnode";

@injectable()
export class TaskNodeView implements IView {
    render(node: Readonly<TaskNode>, context: RenderingContext): VNode {
        const radius = 20;
        // In this context, the coordinates (0,0) mark the upper left corner of
        // the node, thus we shift all elements by the radius of the circle.
        return <g>
            <circle class-sprotty-node={true} class-task={true}
                class-running={node.status === 'running'}
                class-finished={node.status === 'finished'}
                r={radius} cx={radius} cy={radius}></circle>
            <text x={radius} y={radius + 5}>{node.name}</text>
        </g>;
    }
}