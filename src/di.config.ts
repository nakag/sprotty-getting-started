import { Container, ContainerModule } from "inversify";
import { configureModelElement, loadDefaultModules, LocalModelSource, PolylineEdgeView, SEdge, SGraph, SGraphFactory, SGraphView, TYPES, ConsoleLogger, LogLevel, SRoutingHandle, SRoutingHandleView, PolylineEdgeRouter } from "sprotty";
import { TaskNodeView } from "./views";
import { TaskNode } from "./model";

export default () => {
    // Not use in this example 
    require("sprotty/css/sprotty.css");
    require("sprotty/css/command-palette.css");
    require("sprotty/css/edit-label.css");

    require("../css/diagram.css");

    const flowModule = new ContainerModule((bind, unbind, isBound, rebind) => {
        rebind(TYPES.IModelFactory).to(SGraphFactory).inSingletonScope();
        bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
        rebind(TYPES.IEdgeRouter).to(PolylineEdgeRouter);
        const context = { bind, unbind, isBound, rebind };
        configureModelElement(context, 'graph', SGraph, SGraphView);
        configureModelElement(context, 'task', TaskNode, TaskNodeView);
        configureModelElement(context, 'edge', SEdge, PolylineEdgeView);

        // To avoid sprotty-missing. maybe bug?
        configureModelElement(context, 'routing-point', SRoutingHandle, SRoutingHandleView);
        configureModelElement(context, 'volatile-routing-point', SRoutingHandle, SRoutingHandleView);

        // Logging
        rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
        rebind(TYPES.LogLevel).toConstantValue(LogLevel.log);
    });

    const container = new Container();

    // convinient method to load default modules.
    loadDefaultModules(container);

    container.load(flowModule);
    return container;
};
