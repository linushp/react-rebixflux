import {createStore} from './createStore';
import {createMergedStore} from './createMergedStore';
import shallowEqual from './utils/shallowEqual';
import {createCommand, createAction, createActions} from './createActions';
import EventBus from './utils/EventBus';
import ActionEventBus from './utils/ActionEventBus';
import * as connectFunctions from './connect';
import * as functions from './utils/functions';
import * as StringUtils from './utils/StringUtils';
import * as ArrayUtils from './utils/ArrayUtils';

var exportObject = {
    createCommand: createCommand,
    createAction: createAction,
    createActions: createActions,
    createStore: createStore,
    createMergedStore: createMergedStore,

    shallowEqual:shallowEqual,
    EventBus: EventBus,
    ActionEventBus: ActionEventBus
};


//把它用到的工具函数,也暴漏给外界。
var extend = functions.extend;
extend(exportObject,functions,StringUtils,ArrayUtils,connectFunctions);

export default exportObject;