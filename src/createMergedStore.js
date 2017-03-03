import EventBus from './utils/EventBus';
import {forEach} from './utils/functions'
import {EVENT_STORE_CHANGE, STORE_CLASS_NAME} from './createStore';

const STORE_CLASS_NAME_CONST = STORE_CLASS_NAME;

function mergeStoreState(storeConfig) {
    var result = {};
    forEach(storeConfig, function (storeIns, name) {
        if (storeIns && storeIns.$$ClassName === STORE_CLASS_NAME_CONST) {
            result[name] = storeIns.getState();
        }
    });
    return result;
}


function RebixfluxMergedStore(storeConfig) {

    if (!storeConfig) {
        throw new Error('NullPointer');
    }

    var that = this;
    that.$$storeConfig = storeConfig;
    that.$$ClassName = STORE_CLASS_NAME_CONST;
    that.$$eventBus = new EventBus('MergedStoreEventBus');
    that.$$state = mergeStoreState(storeConfig);


    that.enableListener = function () {
        forEach(storeConfig, function (storeIns) {
            if (storeIns && storeIns.$$ClassName === STORE_CLASS_NAME_CONST) {
                storeIns.addChangeListener(that.$$handleSubStoreChange);
            }
        });
    };

    that.disableListener = function () {
        forEach(storeConfig, function (storeIns) {
            if (storeIns && storeIns.$$ClassName === STORE_CLASS_NAME_CONST) {
                storeIns.removeChangeListener(that.$$handleSubStoreChange);
            }
        });
    };

    that.$$handleSubStoreChange = function (changedState, subStore) {
        that.$$state = mergeStoreState(storeConfig);
        that.$$eventBus.emit(EVENT_STORE_CHANGE, changedState, subStore, that);
    };

    that.addChangeListener = function (listener) {
        that.$$eventBus.on(EVENT_STORE_CHANGE, listener);
    };

    that.removeChangeListener = function (listener) {
        that.$$eventBus.off(EVENT_STORE_CHANGE, listener);
    };

    that.getState = function () {
        return that.$$state;
    };


    that.enableListener();

}


export function createMergedStore(storeConfig) {
    return new RebixfluxMergedStore(storeConfig);
}