import {forEach,isString} from './utils/functions'
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
        var result = func.apply(actionsConfig || {}, args);
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


/**
 *
 * @param actionGroup 必须是字符串
 * @param actionsConfig 必须是对象
 * @returns {{}}
 */
export function createActions(actionGroup, actionsConfig) {

    if(!isString(actionGroup)){
        throw new Error('1st param of createActions must string');
    }

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