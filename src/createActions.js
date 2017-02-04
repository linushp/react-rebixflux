import {forEach} from './utils/functions'
import {toArray} from './utils/ArrayUtils';
import isPromise from './utils/isPromise';
import ActionEventBus,{ActionEvent,CommandEvent}from './utils/ActionEventBus';


function createActionEvent(actionGroup, actionName, status, payload) {
    return {
        actionName,
        actionGroup,
        status,
        payload
    };
}

export function createAction(actionGroup, actionName, func, actionsConfig = {}, eventName = ActionEvent) {

    return function () {

        var args = toArray(arguments);
        var result = func.call(actionsConfig || {}, args);
        if (isPromise(result)) {

            result.then(function (data) {
                ActionEventBus.emit(eventName, createActionEvent(actionGroup, actionName, 'success', data));
            }, function (data) {
                ActionEventBus.emit(eventName, createActionEvent(actionGroup, actionName, 'error', data));
            });

            ActionEventBus.emit(eventName, createActionEvent(actionGroup, actionName, 'pending', result));
        } else {
            ActionEventBus.emit(eventName, createActionEvent(actionGroup, actionName, 'success', result));
        }

        return result;
    }

}


export function createActions(actionGroup, actionsConfig) {
    var actions = {};

    forEach(actionsConfig, function (func, actionName) {
        actions[actionName] = createAction(actionGroup, actionName, func, actionsConfig, ActionEvent);
    });

    return actions;
}


//Command是一个特殊的Action
export function createCommand(commandName, func) {
    return createAction("Command", commandName, func, {}, CommandEvent);
}