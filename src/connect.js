import React from 'react';
import {extend,isArray,forEach} from './utils/functions';
import ActionEventBus,{CommandEvent} from './utils/ActionEventBus';
import {toFirstCharUpper} from './utils/StringUtils';

const STATE_ITEM_NAME = 'state';

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


/**
 *
 * @param BaseComponent  必选
 * @param StoreIns 可选  //TODO
 * @param mapStateToProps 可选
 * @returns {ComponentWrapper}
 */
export default function connect(BaseComponent, StoreIns, mapStateToProps) {

    var isArrayStoreIns = isArray(StoreIns);
    var storeInsArray = isArrayStoreIns ? StoreIns : [StoreIns];
    var storeInsArrayLength = storeInsArray.length;

    return class ComponentWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.stateInited = false;
        }

        componentDidMount() {
            var that = this;

            ActionEventBus.on(CommandEvent, that.handleCommand);

            forEach(storeInsArray, function (StoreIns0) {
                StoreIns0.addChangeListener(that.handleAllStoreChange);
            });
            this.handleAllStoreChange();

        }

        componentWillUnmount() {
            var that = this;

            ActionEventBus.off(CommandEvent, that.handleCommand);

            forEach(storeInsArray, function (StoreIns0) {
                StoreIns0.removeChangeListener(that.handleAllStoreChange);
            });
        }


        //View层也可以直接接收Command的消息.
        handleCommand = ({actionName,actionGroup,payload,status})=> {
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

            this.stateInited = true;
            this.setState(stateMerge);

        };

        render() {

            if(!this.stateInited){
                return null;
            }

            var props = this.props || {};

            if(mapStateToProps){
                var stateParamForCalc = getStateParam(this.state, isArrayStoreIns, storeInsArrayLength);
                props = extend({}, props, mapStateToProps(stateParamForCalc, props));
            }

            return (<BaseComponent {...props} ref="BaseComponentIns"/>);
        }

    }
}