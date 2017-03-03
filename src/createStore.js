import EventBus from './utils/EventBus';
import ActionDispatcher, {ActionEvent, CommandEvent} from './utils/ActionDispatcher';
import {toFirstCharUpper, startWith} from './utils/StringUtils';
import {toArray} from './utils/ArrayUtils';
import {extend, forEach} from './utils/functions';


export const EVENT_STORE_CHANGE = 'StoreChange';
export const STORE_CLASS_NAME = 'RebixfluxStore';


function getReducer(storeConfig, actionEvent, prefix) {
    var {actionName, actionGroup} = actionEvent;
    var reducerReceiveName = prefix + toFirstCharUpper(actionName);//onXXX or onCmdXXX
    if (prefix === 'onCmd') {
        return storeConfig[reducerReceiveName];
    }

    var {forAction} = storeConfig;
    var reducer = null;
    if (actionGroup === forAction) {
        reducer = storeConfig[reducerReceiveName];
        if (reducer) {
            return reducer;
        }
    }

    //形如:post#onGetPostList
    var reducerReceiveName2 = actionGroup + "#" + reducerReceiveName;
    reducer = storeConfig[reducerReceiveName2];
    if (reducer) {
        return reducer;
    }

    return null;
}


function handleActionOrCommandEvent(that, actionEvent, prefix) {
    var reducer = getReducer(that.$$storeConfig, actionEvent, prefix);
    if (reducer) {
        var emitChange = function (changedState) {
            if (!changedState) {
                return;
            }

            that.$$state = extend({}, that.$$state, changedState);
            that.$$eventBus.emit(EVENT_STORE_CHANGE, changedState, that);
        };

        var result = reducer(that.$$state, actionEvent, emitChange);

        if (result) {
            that.$$state = result;
            that.$$eventBus.emit(EVENT_STORE_CHANGE, {}, that);
        }

    }
}

/**
 * 创建一个真正执行的时候调用的Get函数
 * @param getterDef 用户配置的以get开否的函数实现
 * @param that
 * @returns {Function}
 */
function createGetterFunction(getterDef, that) {
    return function () {
        var args0 = toArray(arguments);
        //每次执行,都是获取最新的state
        var state = that.$$state;
        var context = extend({}, that, {state: state});
        return getterDef.apply(context, args0);
    }
}


function buildGetMethod(that, storeConfig) {
    for (var methodName in storeConfig) {
        if (storeConfig.hasOwnProperty(methodName)) {
            if (startWith(methodName, 'get') || startWith(methodName, 'is') || startWith('has')) {
                var handler = storeConfig[methodName];
                that[methodName] = createGetterFunction(handler, that);
            }
        }
    }
}





function RebixfluxStoreClass(storeConfig) {


    if (!storeConfig) {
        throw new Error('NullPointer');
    }

    var initialState = storeConfig.initialState || {};
    var that = this;
    that.$$storeConfig = storeConfig;
    that.$$ClassName = STORE_CLASS_NAME;
    that.$$eventBus = new EventBus('StoreEventBus');
    that.$$state = extend({}, initialState);


    that.$$handleActionEvent = function (actionEvent) {
        handleActionOrCommandEvent(that, actionEvent, 'on');
    };
    that.$$handleCommandEvent = function (commandEvent) {
        handleActionOrCommandEvent(that, commandEvent, 'onCmd');
    };

    that.getState = function () {
        return that.$$state;
    };

    that.addChangeListener = function (listener) {
        that.$$eventBus.on(EVENT_STORE_CHANGE, listener);
    };

    that.removeChangeListener = function (listener) {
        that.$$eventBus.off(EVENT_STORE_CHANGE, listener);
    };

    that.enableListener = function () {
        ActionDispatcher.on(ActionEvent, that.$$handleActionEvent);
        ActionDispatcher.on(CommandEvent, that.$$handleCommandEvent);
    };
    that.disableListener = function () {
        ActionDispatcher.off(ActionEvent, that.$$handleActionEvent);
        ActionDispatcher.off(CommandEvent, that.$$handleCommandEvent);
    };

    buildGetMethod(that, storeConfig);
    that.enableListener();
}


export function createStore(storeConfig) {
    return new RebixfluxStoreClass(storeConfig);
}


