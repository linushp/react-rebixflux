import {createStore} from './createStore';
import {createMergedStore} from './createMergedStore';
import connect from './connect';
import {createCommand, createAction, createActions} from './createActions';
import EventBus from './utils/EventBus';
import ActionEventBus from './utils/ActionEventBus';

import * as functions from './utils/functions';
import * as StringUtils from './utils/StringUtils';
import  * as ArrayUtils from './utils/ArrayUtils';

var exportObject = {
    createCommand: createCommand,
    createAction: createAction,
    createActions: createActions,
    createStore: createStore,
    createMergedStore: createMergedStore,
    connect: connect,

    EventBus: EventBus,
    ActionEventBus: ActionEventBus

};


//把它用到的工具函数,也暴漏给外界。
var extend = functions.extend;
extend(exportObject,functions,StringUtils,ArrayUtils);

export default exportObject;