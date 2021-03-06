import { StepBody } from "../abstractions";
import { StepOutcome } from "./step-outcome";
import { ExecutionPipelineDirective } from "./execution-pipeline-directive";
import { WorkflowExecutorResult } from "./workflow-executor-result";
import { WorkflowDefinition } from "./workflow-definition";
import { WorkflowInstance } from "./workflow-instance";
import { ExecutionPointer } from "./execution-pointer";
import { StepExecutionContext } from "./step-execution-context";
import { ExecutionResult } from "./execution-result";

export abstract class WorkflowStepBase {
    public id : number;    
    public name: string;

    public abstract body: { new(): StepBody; };
    public outcomes: Array<StepOutcome> = [];
    public children: Array<number> = [];
    public errorBehavior : number;
    public retryInterval : number = 60000;
    public compensationStepId : number;

    public inputs: Array<(step: StepBody, data: any) => void> = [];
    public outputs: Array<(step: StepBody, data: any) => void> = [];

    public initForExecution(executorResult: WorkflowExecutorResult, definition: WorkflowDefinition, workflow: WorkflowInstance, executionPointer: ExecutionPointer): any {
        return ExecutionPipelineDirective.Next;
    }

    public beforeExecute(executorResult: WorkflowExecutorResult, context: StepExecutionContext, executionPointer: ExecutionPointer, body: StepBody): any {
        return ExecutionPipelineDirective.Next;
    }

    public afterExecute(executorResult: WorkflowExecutorResult, context: StepExecutionContext, stepResult: ExecutionResult, executionPointer: ExecutionPointer) {            
    }

    public afterWorkflowIteration(executorResult: WorkflowExecutorResult, defintion: WorkflowDefinition, workflow: WorkflowInstance, executionPointer: ExecutionPointer) {
    }

    public resumeChildrenAfterCompensation(): boolean {
        return true;
    } 

    public revertChildrenAfterCompensation(): boolean {
        return false;
    }

    public primeForRetry(pointer: ExecutionPointer) {
    }
    
}

export class WorkflowStep<T extends StepBody> extends WorkflowStepBase {
    
    public body: { new(): T; };
    
}