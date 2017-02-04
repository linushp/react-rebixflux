import {createStore} from './createStore';
import {createMergedStore} from './createMergedStore';
import connect from './connect';
import {createCommand,createAction,createActions} from './createActions';


export default {
    createCommand: createCommand,
    createAction: createAction,
    createActions: createActions,
    createStore: createStore,
    createMergedStore: createMergedStore,
    connect: connect
}