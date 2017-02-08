import React, {PropTypes}from 'react';
import {extend, isArray, isFunction, forEach} from './utils/functions';
import shallowEqual from './utils/shallowEqual';
import ActionEventBus, {CommandEvent} from './utils/ActionEventBus';
import {toFirstCharUpper} from './utils/StringUtils';


const propTypeAny = PropTypes.any;
const storeShape = propTypeAny;

const STATE_ITEM_NAME = 'state';
const CONST_TRUE = true;
const CONST_FALSE = false;
const CONST_NULL = null;
const DEFAULT_STORE_CONTXT_NAME = 'RebixFluxContextState';

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

/**
 *
 * @param BaseComponent  必选
 * @param StoreIns 可选
 * @param mapStateToProps 可选
 * @returns {ComponentWrapper}
 */
export function connect(BaseComponent, p1, p2, p3) {

    var StoreIns;
    var mapStateToProps;
    var options;

    var isArrayStoreIns = false;
    var storeInsArray = [];
    var storeInsArrayLength = 0;
    var isNoStoreParam = false; //标记是否省略了StoreIns参数

    //省略第StoreIns参数
    if (isFunction(p1)) {

        mapStateToProps = p1;
        options = p2;

        isNoStoreParam = true;
        isArrayStoreIns = false;
        storeInsArray = [];
        storeInsArrayLength = 0;
    } else {

        StoreIns = p1;
        mapStateToProps = p2;
        options = p3;

        isArrayStoreIns = isArray(StoreIns);
        storeInsArray = isArrayStoreIns ? StoreIns : [StoreIns];
        storeInsArrayLength = storeInsArray.length;
    }


    options = extend({
        pure: CONST_TRUE,
        debounce: CONST_FALSE,
        contextTypes: {},
        provideStoreContextName: DEFAULT_STORE_CONTXT_NAME,
        requireStoreContextName: DEFAULT_STORE_CONTXT_NAME
    }, options || {});
    var {pure, debounce, contextTypes, provideStoreContextName, requireStoreContextName} = options;


    class StateProviderComponent extends React.Component {


        constructor(props, context) {
            super(props, context);
            this.state = {};
            this.stateInited = CONST_FALSE;
            this.stateDebounceHandler = 0; //timeoutHandler
            this.stateWaiting = {};

            this.haveOwnPropsChanged = CONST_TRUE;
            this.hasStoreStateChanged = CONST_TRUE;
        }

        shouldComponentUpdate() {
            if (!isNoStoreParam) {
                return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
            }
            return true;
        }


        componentWillReceiveProps(nextProps) {
            if (!pure || !shallowEqual(nextProps, this.props)) {
                this.haveOwnPropsChanged = CONST_TRUE;
            }
        }

        componentDidMount() {
            var that = this;

            ActionEventBus.on(CommandEvent, that.handleCommand);

            if (!isNoStoreParam) {
                forEach(storeInsArray, function (StoreIns0) {
                    StoreIns0.addChangeListener(that.handleAllStoreChange);
                });
                that.handleAllStoreChange();
            }
        }

        componentWillUnmount() {
            var that = this;

            ActionEventBus.off(CommandEvent, that.handleCommand);

            if (!isNoStoreParam) {
                forEach(storeInsArray, function (StoreIns0) {
                    StoreIns0.removeChangeListener(that.handleAllStoreChange);
                });
            }

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
            if (!that.stateInited && !isNoStoreParam) {
                return CONST_NULL;
            }

            that.haveOwnPropsChanged = CONST_FALSE;
            that.hasStoreStateChanged = CONST_FALSE;

            var props = that.props || {};

            if (mapStateToProps) {

                var context = that.context || {};

                if (!isNoStoreParam) {

                    var stateParamForCalc = getStateParam(that.state, isArrayStoreIns, storeInsArrayLength);
                    props = extend({}, props, mapStateToProps(stateParamForCalc, props, context, that));

                } else {

                    var contextState = context[requireStoreContextName] || {};
                    props = extend({}, props, mapStateToProps(contextState, props, context, that));

                }

            }

            return (<BaseComponent {...props} ref="BaseComponentIns"/>);
        }

        getChildContext() {
            var stateParamForCalc = getStateParam(this.state, isArrayStoreIns, storeInsArrayLength);
            return {[provideStoreContextName]: stateParamForCalc}
        }

    }

    StateProviderComponent.childContextTypes = {
        [provideStoreContextName]: storeShape
    };

    StateProviderComponent.contextTypes = extend({
        [requireStoreContextName]: storeShape,
        router: propTypeAny
    }, toContextTypes(contextTypes));

    return StateProviderComponent;
}


// export function connectContext(BaseComponent, mapStateToProps) {
//     class  ContextComponent extends React.Component {
//
//         render() {
//             var that = this;
//             var props = that.props || {};
//
//             if (mapStateToProps) {
//                 var context = that.context || {};
//                 var contextState = context.rebixfluxState || {};
//                 props = extend({}, props, mapStateToProps(contextState, props));
//             }
//
//             return (<BaseComponent {...props} />);
//         }
//     }
//
//     ContextComponent.contextTypes = {
//         rebixfluxState: storeShape
//     };
//
//     ContextComponent.propTypes = {
//         rebixfluxState: storeShape
//     };
//
//     return ContextComponent;
// }
//
// export function connect(BaseComponent, p1, p2, p3) {
//     if (isFunction(p1)) {
//         return connectContext(BaseComponent, p1);
//     }
//     return connectStore(BaseComponent, p1, p2, p3)
// }