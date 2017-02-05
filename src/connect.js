import React from 'react';
import {extend, isArray, forEach} from './utils/functions';
import shallowEqual from './utils/shallowEqual';
import ActionEventBus, {CommandEvent} from './utils/ActionEventBus';
import {toFirstCharUpper} from './utils/StringUtils';

const STATE_ITEM_NAME = 'state';

const CONST_TRUE = true;
const CONST_FALSE = false;
const CONST_NULL = null;

function getStateParam(state, isArrayStoreIns, storeInsArrayLength) {

    if (!isArrayStoreIns) {
        return state[STATE_ITEM_NAME + 0];// 参数不是数组,结果也不是数组
    }

    var result = [];
    for (var i = 0; i < storeInsArrayLength; i++) {
        result.push(state[STATE_ITEM_NAME + i]);
    }
    return result;
}


function setStateDebounce(that, changeState) {

    // var that = this;

    if (that.stateDebounceHandler) {
        clearTimeout(that.stateDebounceHandler);
        that.stateDebounceHandler = CONST_NULL;
    }

    extend(that.stateWaiting, changeState);

    that.stateDebounceHandler = setTimeout(()=> {
        var stateWaiting = that.stateWaiting;
        that.stateWaiting = {};
        that.stateDebounceHandler = CONST_NULL;
        that.hasStoreStateChanged = CONST_TRUE;
        that.setState(stateWaiting);
    }, 1);

}

/**
 *
 * @param BaseComponent  必选
 * @param StoreIns 可选  //TODO
 * @param mapStateToProps 可选
 * @returns {ComponentWrapper}
 */
export default function connect(BaseComponent, StoreIns, mapStateToProps, options) {

    options = extend({
        pure: CONST_TRUE,
        debounce: CONST_FALSE
    }, options || {});

    var {pure, debounce} = options;

    var isArrayStoreIns = isArray(StoreIns);
    var storeInsArray = isArrayStoreIns ? StoreIns : [StoreIns];
    var storeInsArrayLength = storeInsArray.length;

    return class ComponentWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.stateInited = CONST_FALSE;
            this.stateDebounceHandler = 0; //timeoutHandler
            this.stateWaiting = {};

            this.haveOwnPropsChanged = CONST_TRUE;
            this.hasStoreStateChanged = CONST_TRUE;
        }

        shouldComponentUpdate() {
            return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
        }


        componentWillReceiveProps(nextProps) {
            if (!pure || !shallowEqual(nextProps, this.props)) {
                this.haveOwnPropsChanged = CONST_TRUE;
            }
        }

        componentDidMount() {
            var that = this;

            ActionEventBus.on(CommandEvent, that.handleCommand);

            forEach(storeInsArray, function (StoreIns0) {
                StoreIns0.addChangeListener(that.handleAllStoreChange);
            });
            that.handleAllStoreChange();

        }

        componentWillUnmount() {
            var that = this;

            ActionEventBus.off(CommandEvent, that.handleCommand);

            forEach(storeInsArray, function (StoreIns0) {
                StoreIns0.removeChangeListener(that.handleAllStoreChange);
            });

            if (that.stateDebounceHandler) {
                clearTimeout(that.stateDebounceHandler);
                that.stateDebounceHandler = CONST_NULL;
            }
        }


        //View层也可以直接接收Command的消息.
        handleCommand = ({actionName, actionGroup, payload, status})=> {
            var commandHandlerName = "onCmd" + toFirstCharUpper(actionName);// onCmdXXX
            var componentIns = this.refs['BaseComponentIns'];
            if (componentIns) {
                var commandHandler = componentIns[commandHandlerName];
                if (commandHandler) {
                    commandHandler(payload, status, actionName, actionGroup);
                }
            }
        };


        handleAllStoreChange = (changedState, StoreInsSource)=> {
            var that = this;

            var stateMerge = {};
            var stateTmp;
            forEach(storeInsArray, function (StoreIns0, index) {
                if (StoreInsSource) {
                    if (StoreIns0 === StoreInsSource) {
                        stateTmp = StoreIns0.getState();
                        stateMerge[STATE_ITEM_NAME + index] = stateTmp;
                    }
                } else {
                    stateTmp = StoreIns0.getState();
                    stateMerge[STATE_ITEM_NAME + index] = stateTmp;
                }
            });

            that.stateInited = CONST_TRUE;

            if (debounce) {
                //防抖
                setStateDebounce(that, stateMerge)
            } else {
                that.hasStoreStateChanged = CONST_TRUE;
                that.setState(stateMerge);
            }

        };


        render() {
            var that = this;
            if (!that.stateInited) {
                return CONST_NULL;
            }

            that.haveOwnPropsChanged = CONST_FALSE;
            that.hasStoreStateChanged = CONST_FALSE;

            var props = that.props || {};

            if (mapStateToProps) {
                var stateParamForCalc = getStateParam(that.state, isArrayStoreIns, storeInsArrayLength);
                props = extend({}, props, mapStateToProps(stateParamForCalc, props));
            }

            return (<BaseComponent {...props} ref="BaseComponentIns"/>);
        }

    }
}