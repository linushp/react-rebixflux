import {createStore} from './createStore';
import {createMergedStore} from './createMergedStore';
import shallowEqual from './utils/shallowEqual';
import {dispatchCommand, createCommand, createAction, createActions} from './createActions';
import EventBus from './utils/EventBus';
import ActionDispatcher from './utils/ActionDispatcher';
import * as connectFunctions from './connect';
import * as functions from './utils/functions';
import * as StringUtils from './utils/StringUtils';
import * as ArrayUtils from './utils/ArrayUtils';
import PureRenderComponent from './PureRenderComponent';

var exportObject = {
    dispatchCommand: dispatchCommand,
    createCommand: createCommand,
    createAction: createAction,
    createActions: createActions,
    createStore: createStore,
    createMergedStore: createMergedStore,
    PureRenderComponent:PureRenderComponent,
    shallowEqual: shallowEqual,
    EventBus: EventBus,
    ActionDispatcher: ActionDispatcher
};


//把它用到的工具函数,也暴漏给外界。
var extend = functions.extend;
extend(exportObject, functions, StringUtils, ArrayUtils, connectFunctions);

export default exportObject;