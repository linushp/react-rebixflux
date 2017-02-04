import EventBus from './utils/EventBus';
import {forEach} from './utils/functions'
import {EVENT_STORE_CHANGE,STORE_CLASS_NAME} from './createStore';

const STORE_CLASS_NAME_CONST = STORE_CLASS_NAME;

function mergeStoreState(storeConfig) {
    var result = {};
    forEach(storeConfig, function (storeIns, name) {
        if (storeIns && storeIns.$$RebixfluxStoreClassName === STORE_CLASS_NAME_CONST) {
            result[name] = storeIns.getState();
        }
    });
    return result;
}


class RebixfluxMergedStore {

    constructor(storeConfig) {
        if (!storeConfig) {
            throw new Error('NullPointer');
        }
        this.$$storeConfig = storeConfig;
        this.$$RebixfluxStoreClassName = STORE_CLASS_NAME_CONST;
        this.$$eventBus = new EventBus('MergedStoreEventBus');
        this.$$state = mergeStoreState(storeConfig);
        this.enableListener();
    }

    enableListener() {
        var that = this;
        var storeConfig = this.$$storeConfig;
        forEach(storeConfig, function (storeIns) {
            if (storeIns && storeIns.$$RebixfluxStoreClassName === STORE_CLASS_NAME_CONST) {
                storeIns.addChangeListener(that.$$handleSubStoreChange);
            }
        });
    }

    disableListener() {
        var that = this;
        var storeConfig = this.$$storeConfig;
        forEach(storeConfig, function (storeIns) {
            if (storeIns && storeIns.$$RebixfluxStoreClassName === STORE_CLASS_NAME_CONST) {
                storeIns.removeChangeListener(that.$$handleSubStoreChange);
            }
        });
    }

    $$handleSubStoreChange = (changedState, subStore)=> {
        var storeConfig = this.$$storeConfig;
        this.$$state = mergeStoreState(storeConfig);
        this.$$eventBus.emit(EVENT_STORE_CHANGE, changedState, subStore, this);
    };

    addChangeListener(listener) {
        this.$$eventBus.on(EVENT_STORE_CHANGE, listener);
    }

    removeChangeListener(listener) {
        this.$$eventBus.off(EVENT_STORE_CHANGE, listener);
    }

    getState() {
        return this.$$state;
    }

}


export function createMergedStore(storeConfig) {
    return new RebixfluxMergedStore(storeConfig);
}