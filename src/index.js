import {createStore} from './createStore';
import {createMergedStore} from './createMergedStore';
import shallowEqual from './utils/shallowEqual';
import {dispatchCommand, createCommand, createAction, createActions} from './createActions';
var EventBus = require('./utils/EventBus');
import ActionDispatcher from './utils/ActionDispatcher';
var connectFunctions = require('./connect');
import * as functions from './utils/functions';
import * as StringUtils from './utils/StringUtils';
import * as ArrayUtils from './utils/ArrayUtils';
import {createPureComponent,PureRenderComponent} from './components/PureRenderComponent';

var exportObject = {
    dispatchCommand: dispatchCommand,
    createCommand: createCommand,
    createAction: createAction,
    createActions: createActions,
    createStore: createStore,
    createMergedStore: createMergedStore,
    PureRenderComponent: PureRenderComponent,
    createPureComponent: createPureComponent,
    shallowEqual: shallowEqual,
    EventBus: EventBus,
    ActionDispatcher: ActionDispatcher
};


//把它用到的工具函数,也暴漏给外界。
var extend = functions.extend;
extend(exportObject, functions, StringUtils, ArrayUtils, connectFunctions);

export default exportObject;