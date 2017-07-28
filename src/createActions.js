import {forEach, isString} from './utils/functions'
import {toArray} from './utils/ArrayUtils';
import isPromise from './utils/isPromise';
import ActionDispatcher, {ActionEvent, CommandEvent} from './utils/ActionDispatcher';

const STATUS_PENDING = 'pending';
const STATUS_SUCCESS = 'success';
const STATUS_ERROR = 'error';

function emitActionEvent(actionGroup, actionName, eventName, status, payload, args) {
    ActionDispatcher.emit(eventName, {
        actionName,
        actionGroup,
        status,
        payload,
        args
    });
}

export function createAction(actionGroup, actionName, func, actionsConfig, eventName) {

    actionsConfig = actionsConfig || {};
    eventName = eventName || ActionEvent;

    return function () {

        var args = toArray(arguments);
        var result = func.apply(actionsConfig, args);
        if (isPromise(result)) {

            result.then(function (data) {
                emitActionEvent(actionGroup, actionName, eventName, STATUS_SUCCESS, data, args);
            }, function (data) {
                emitActionEvent(actionGroup, actionName, eventName, STATUS_ERROR, data, args);
            });

            emitActionEvent(actionGroup, actionName, eventName, STATUS_PENDING, result, args);
        } else {
            emitActionEvent(actionGroup, actionName, eventName, STATUS_SUCCESS, result, args);
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

    if (!isString(actionGroup)) {
        throw new Error('1st param is not string');
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

//广播一个Command
export function dispatchCommand(commandName, data, status) {
    status = status || STATUS_SUCCESS;
    emitActionEvent("Command", commandName, CommandEvent, status, data);
}