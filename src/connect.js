import React, {PropTypes}from 'react';
import {extend, isArray, isFunction, forEach} from './utils/functions';
import shallowEqual from './utils/shallowEqual';
import ActionDispatcher, {CommandEvent} from './utils/ActionDispatcher';
import {toFirstCharUpper} from './utils/StringUtils';


const propTypeAny = PropTypes.any;
const storeShape = propTypeAny;

const STATE_ITEM_NAME = 'state';
const CONST_TRUE = true;
const CONST_FALSE = false;
const CONST_NULL = null;
const DEFAULT_STORE_CONTEXT_NAME = 'RebixFluxContextState';

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

function toContextTypes(contextTypes) {

    if (isArray(contextTypes) && contextTypes.length > 0) {
        var result = {};
        forEach(contextTypes, function (contextTypeName) {
            result['' + contextTypeName] = propTypeAny;
        });
        return result;
    }

    return contextTypes || {};
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


const DEFAULT_OPTIONS = {
    pure: CONST_TRUE,
    debounce: CONST_FALSE,
    contextTypes: {},
    exposeStore: DEFAULT_STORE_CONTEXT_NAME,
    requireStore: DEFAULT_STORE_CONTEXT_NAME,
    componentName:null
};

var USING_DEFAULT_OPTIONS = DEFAULT_OPTIONS;
export function setConnectDefaultOptions(defaultOptions) {
    USING_DEFAULT_OPTIONS = extend({}, DEFAULT_OPTIONS, defaultOptions);
}


function getStoreInsAttr(StoreIns) {
    var isArrayStoreIns = isArray(StoreIns);
    var storeInsArray = isArrayStoreIns ? StoreIns : [StoreIns];
    var storeInsArrayLength = storeInsArray.length;
    return {isArrayStoreIns,storeInsArray,storeInsArrayLength};
}


/**
 * demo：
 * 1. connect(BaseComponent,Store,mapStateToProps,options)
 * 2. connect(BaseComponent,mapStateToProps,options)
 * 3. connect(BaseComponent,null,options)
 * 4. connect(BaseComponent,mapStateToProps)
 * 5. connect(BaseComponent)
 *
 * @param BaseComponent 必须的
 * @param p1
 * @param p2
 * @param p3
 * @returns {StateProviderComponent}
 */
export function connect(BaseComponent, p1, p2, p3) {

    var StoreIns;
    var mapStateToProps;
    var options;
    var isNoStoreParam = false; //标记是否省略了StoreIns参数

    //省略第StoreIns参数.for demo:[2,3,4,5]
    if (isFunction(p1) || !p1) {
        isNoStoreParam = true;
        mapStateToProps = p1;
        options = p2;
    } else {
        isNoStoreParam = false;
        StoreIns = p1;
        mapStateToProps = p2;
        options = p3;
    }


    options = extend({}, USING_DEFAULT_OPTIONS, options || {});
    var {pure, debounce, contextTypes, exposeStore, requireStore,componentName} = options;


    var StateProviderComponent = {


        getInitialState() {

            // this.state = {};
            this.stateInited = CONST_FALSE;
            this.stateDebounceHandler = 0; //timeoutHandler
            this.stateWaiting = {};
            this.haveOwnPropsChanged = CONST_TRUE;
            this.hasStoreStateChanged = CONST_TRUE;

            return {};
        },

        shouldComponentUpdate() {
            if (!isNoStoreParam) { //有参数
                return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
            }
            return true;
        },


        componentWillReceiveProps(nextProps) {
            if (!pure || !shallowEqual(nextProps, this.props)) {
                this.haveOwnPropsChanged = CONST_TRUE;
            }
        },

        componentDidMount() {
            var that = this;

            ActionDispatcher.on(CommandEvent, that.handleCommand);

            if (isNoStoreParam) {




                //TODO
            }else {
                var {isArrayStoreIns,storeInsArray,storeInsArrayLength} = getStoreInsAttr(StoreIns);
                forEach(storeInsArray, function (StoreIns0) {
                    StoreIns0.addChangeListener(that.handleAllStoreChange);
                });
                that.handleAllStoreChange();
            }
        },

        componentWillUnmount() {
            var that = this;

            ActionDispatcher.off(CommandEvent, that.handleCommand);

            if (isNoStoreParam) {
                //TODO
            }else {
                var {isArrayStoreIns,storeInsArray,storeInsArrayLength} = getStoreInsAttr(StoreIns);
                forEach(storeInsArray, function (StoreIns0) {
                    StoreIns0.removeChangeListener(that.handleAllStoreChange);
                });
            }

            if (that.stateDebounceHandler) {
                clearTimeout(that.stateDebounceHandler);
                that.stateDebounceHandler = CONST_NULL;
            }
        },


        //View层也可以直接接收Command的消息.
        handleCommand({actionName, actionGroup, payload, status}){
            var commandHandlerName = "onCmd" + toFirstCharUpper(actionName);// onCmdXXX
            var componentIns = this.refs['BaseComponentIns'];
            if (componentIns) {
                var commandHandler = componentIns[commandHandlerName];
                if (commandHandler) {
                    commandHandler(payload, status, actionName, actionGroup);
                }
            }
        },


        handleAllStoreChange(changedState, StoreInsSource){
            var that = this;

            var stateMerge = {};
            var {isArrayStoreIns,storeInsArray,storeInsArrayLength} = getStoreInsAttr(StoreIns);
            forEach(storeInsArray, function (StoreIns0, index) {
                var stateTmp = StoreIns0.getState();
                stateMerge[STATE_ITEM_NAME + index] = stateTmp;
            });

            that.stateInited = CONST_TRUE;

            if (debounce) {
                //防抖
                setStateDebounce(that, stateMerge)
            } else {
                that.hasStoreStateChanged = CONST_TRUE;
                that.setState(stateMerge);
            }

        },


        render() {

            var that = this;
            if (!that.stateInited && !isNoStoreParam) {
                return CONST_NULL;
            }

            that.haveOwnPropsChanged = CONST_FALSE;
            that.hasStoreStateChanged = CONST_FALSE;

            var props = extend({}, that.props || {});

            if (mapStateToProps) {

                var context = that.context || {};
                var connectState = that.state;
                var mapperResult = null;

                if (isNoStoreParam) {

                    //如果没有Store作为参数,使用Context上面存储的Store去Mapper
                    var contextState = context[requireStore] || {};
                    mapperResult = mapStateToProps(contextState, props, context, connectState, that);
                } else {

                    //如果有Store作为参数,使用Store去Mapper
                    var {isArrayStoreIns,storeInsArray,storeInsArrayLength} = getStoreInsAttr(StoreIns);
                    var stateParamForCalc = getStateParam(connectState, isArrayStoreIns, storeInsArrayLength);
                    mapperResult = mapStateToProps(stateParamForCalc, props, context, connectState, that);
                }

                if (mapperResult) {
                    props = extend(props, mapperResult);
                }
            }

            return (<BaseComponent {...props} ref="BaseComponentIns"/>);
        }

    };

    if (!isNoStoreParam) {

        StateProviderComponent.getChildContext = function () {
            var {isArrayStoreIns, storeInsArray, storeInsArrayLength} = getStoreInsAttr(StoreIns);
            var stateParamForCalc = getStateParam(this.state, isArrayStoreIns, storeInsArrayLength);
            return {
                [exposeStore + '_StoreIns']: StoreIns,
                [exposeStore]: stateParamForCalc
            }
        };

        StateProviderComponent.childContextTypes = {
            [exposeStore]: storeShape,
            [exposeStore + '_StoreIns']: storeShape
        };

    }

    StateProviderComponent.contextTypes = extend({
        [requireStore]: storeShape,
        [requireStore + '_StoreIns']: storeShape,
        router: propTypeAny
    }, toContextTypes(contextTypes));


    return React.createClass(StateProviderComponent);
}
