(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRebixflux"] = factory(require("react"));
	else
		root["ReactRebixflux"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(4);

	var _createMergedStore = __webpack_require__(9);

	var _connect = __webpack_require__(7);

	var _connect2 = _interopRequireDefault(_connect);

	var _createActions = __webpack_require__(8);

	exports['default'] = {
	    createCommand: _createActions.createCommand,
	    createAction: _createActions.createAction,
	    createActions: _createActions.createActions,
	    createStore: _createStore.createStore,
	    createMergedStore: _createMergedStore.createMergedStore,
	    connect: _connect2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var extend = Object.assign;

	exports.extend = extend;
	var isArray = Array.isArray;

	exports.isArray = isArray;
	var forEach = function forEach(obj, it) {
	    if (isArray(obj)) {
	        return Array.prototype.forEach.call;
	    }

	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            var value = obj[key];
	            it(value, key);
	        }
	    }
	};
	exports.forEach = forEach;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _EventBus = __webpack_require__(3);

	var _EventBus2 = _interopRequireDefault(_EventBus);

	var ActionEvent = "ActionEvent";
	exports.ActionEvent = ActionEvent;
	var CommandEvent = "CommandEvent";

	exports.CommandEvent = CommandEvent;
	exports["default"] = new _EventBus2["default"]("ActionEventBus");

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PRIVATE_LISTENERS_NAME = "$$listeners$$";

	function getListeners(eventBusInstance) {
	    return eventBusInstance[PRIVATE_LISTENERS_NAME];
	}

	function setListeners(eventBusInstance, listeners) {
	    return eventBusInstance[PRIVATE_LISTENERS_NAME] = listeners;
	}

	var EventBus = (function () {
	    function EventBus(name) {
	        _classCallCheck(this, EventBus);

	        this.name = name;
	        setListeners(this, []);
	    }

	    _createClass(EventBus, [{
	        key: "on",
	        value: function on(eventName, listener) {
	            getListeners(this).push({
	                eventName: eventName,
	                listener: listener
	            });
	        }
	    }, {
	        key: "off",
	        value: function off(eventName, listener) {
	            var listeners = getListeners(this);
	            var result = [];
	            for (var i = 0; i < listeners.length; i++) {
	                var m = listeners[i];
	                if (m.eventName === eventName && m.listener === listener) {
	                    //skip
	                } else {
	                        result.push(m);
	                    }
	            }

	            setListeners(this, result);
	        }
	    }, {
	        key: "emit",
	        value: function emit(eventName, m1, m2, m3, m4, m5) {
	            var listeners = getListeners(this);
	            for (var i = 0; i < listeners.length; i++) {
	                var m = listeners[i];
	                if (m.eventName === eventName && m.listener) {
	                    m.listener(m1, m2, m3, m4, m5);
	                }
	            }
	        }
	    }]);

	    return EventBus;
	})();

	exports["default"] = EventBus;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.createStore = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsEventBus = __webpack_require__(3);

	var _utilsEventBus2 = _interopRequireDefault(_utilsEventBus);

	var _utilsActionEventBus = __webpack_require__(2);

	var _utilsActionEventBus2 = _interopRequireDefault(_utilsActionEventBus);

	var _utilsStringUtils = __webpack_require__(6);

	var _utilsArrayUtils = __webpack_require__(5);

	var _utilsFunctions = __webpack_require__(1);

	var EVENT_STORE_CHANGE = 'StoreChange';
	exports.EVENT_STORE_CHANGE = EVENT_STORE_CHANGE;
	var STORE_CLASS_NAME = 'RebixfluxStore';

	exports.STORE_CLASS_NAME = STORE_CLASS_NAME;
	function getReducer(storeConfig, actionEvent, prefix) {
	    var actionName = actionEvent.actionName;
	    var actionGroup = actionEvent.actionGroup;

	    var reducerReceiveName = prefix + (0, _utilsStringUtils.toFirstCharUpper)(actionName); //onXXX or onCmdXXX
	    if (prefix === 'onCmd') {
	        return storeConfig[reducerReceiveName];
	    }

	    var forAction = storeConfig.forAction;

	    var reducer = null;
	    if (actionGroup === forAction) {
	        reducer = storeConfig[reducerReceiveName];
	        if (reducer) {
	            return reducer;
	        }
	    }

	    //形如:post#onGetPostList
	    var reducerReceiveName2 = actionGroup + "#" + reducerReceiveName;
	    reducer = storeConfig[reducerReceiveName2];
	    if (reducer) {
	        return reducer;
	    }

	    return null;
	}

	function handleActionOrCommandEvent(that, actionEvent, prefix) {
	    var reducer = getReducer(that.$$storeConfig, actionEvent, prefix);
	    if (reducer) {
	        var emitChange = function emitChange(changedState) {
	            if (!changedState) {
	                return;
	            }

	            that.$$state = (0, _utilsFunctions.extend)({}, that.$$state, changedState);
	            that.$$eventBus.emit(EVENT_STORE_CHANGE, changedState, that);
	        };
	        reducer(actionEvent, emitChange, that.$$state);
	    }
	}

	/**
	 * 创建一个真正执行的时候调用的Get函数
	 * @param getterDef 用户配置的以get开否的函数实现
	 * @param that
	 * @returns {Function}
	 */
	function createGetterFunction(getterDef, that) {
	    return function () {
	        var args0 = (0, _utilsArrayUtils.toArray)(arguments);
	        //每次执行,都是获取最新的state
	        var state = that.$$state;
	        var args = [state].concat(args0);
	        return getterDef.apply({}, args);
	    };
	}

	function buildGetMethod(that, storeConfig) {
	    for (var k in storeConfig) {
	        if (storeConfig.hasOwnProperty(k)) {
	            if ((0, _utilsStringUtils.startWith)('get')) {
	                var handler = storeConfig[k];
	                that[k] = createGetterFunction(handler, that);
	            }
	        }
	    }
	}

	var RebixfluxStore = (function () {
	    function RebixfluxStore(storeConfig) {
	        var _this = this;

	        _classCallCheck(this, RebixfluxStore);

	        this.$$handleActionEvent = function (actionEvent) {
	            handleActionOrCommandEvent(_this, actionEvent, 'on');
	        };

	        this.$$handleCommandEvent = function (commandEvent) {
	            handleActionOrCommandEvent(_this, commandEvent, 'onCmd');
	        };

	        if (!storeConfig) {
	            throw new Error('NullPointer');
	        }
	        var initialState = storeConfig.initialState || {};
	        this.$$storeConfig = storeConfig;
	        this.$$RebixfluxStoreClassName = STORE_CLASS_NAME;
	        this.$$eventBus = new _utilsEventBus2['default']('StoreEventBus');
	        this.$$state = (0, _utilsFunctions.extend)({}, initialState);
	        this.enableListener();
	        buildGetMethod(this, storeConfig);
	    }

	    _createClass(RebixfluxStore, [{
	        key: 'enableListener',
	        value: function enableListener() {
	            _utilsActionEventBus2['default'].on(_utilsActionEventBus.ActionEvent, this.$$handleActionEvent);
	            _utilsActionEventBus2['default'].on(_utilsActionEventBus.CommandEvent, this.$$handleCommandEvent);
	        }
	    }, {
	        key: 'disableListener',
	        value: function disableListener() {
	            _utilsActionEventBus2['default'].off(_utilsActionEventBus.ActionEvent, this.$$handleActionEvent);
	            _utilsActionEventBus2['default'].off(_utilsActionEventBus.CommandEvent, this.$$handleCommandEvent);
	        }

	        /**
	         *
	         * @param actionEvent => {actionNameactionGroupstatuspayload}
	         */
	    }, {
	        key: 'addChangeListener',
	        value: function addChangeListener(listener) {
	            this.$$eventBus.on(EVENT_STORE_CHANGE, listener);
	        }
	    }, {
	        key: 'removeChangeListener',
	        value: function removeChangeListener(listener) {
	            this.$$eventBus.off(EVENT_STORE_CHANGE, listener);
	        }
	    }, {
	        key: 'getState',
	        value: function getState() {
	            return this.$$state;
	        }
	    }]);

	    return RebixfluxStore;
	})();

	function createStore(storeConfig) {
	    return new RebixfluxStore(storeConfig);
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toArray = toArray;

	function toArray(aaa) {
	    if (!aaa) {
	        return [];
	    }

	    var argsArray = Array.prototype.slice.call(aaa);
	    var args = [].concat(argsArray);
	    return args;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toFirstCharUpper = toFirstCharUpper;
	exports.startWith = startWith;

	function toFirstCharUpper(str) {
	    return str.replace(/(^|\s+)\w/g, function (s) {
	        return s.toUpperCase();
	    });
	}

	function startWith(str, prefix) {
	    str = "" + str;
	    return str.indexOf(prefix) === 0;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	exports['default'] = connect;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _utilsFunctions = __webpack_require__(1);

	var _utilsActionEventBus = __webpack_require__(2);

	var _utilsActionEventBus2 = _interopRequireDefault(_utilsActionEventBus);

	var _utilsStringUtils = __webpack_require__(6);

	function getStateParam(state, isArrayStoreIns, storeInsArrayLength) {
	    if (!isArrayStoreIns) {
	        return state['state0']; // 参数不是数组,结果也不是数组
	    }

	    var result = [];
	    for (var i = 0; i < storeInsArrayLength; i++) {
	        result.push(state['state' + i]);
	    }
	    return result;
	}

	function connect(BaseComponent, StoreIns, mapStateToProps) {

	    var isArrayStoreIns = (0, _utilsFunctions.isArray)(StoreIns);
	    var storeInsArray = isArrayStoreIns ? StoreIns : [StoreIns];
	    var storeInsArrayLength = storeInsArray.length;

	    return (function (_React$Component) {
	        _inherits(ComponentWrapper, _React$Component);

	        function ComponentWrapper(props) {
	            var _this = this;

	            _classCallCheck(this, ComponentWrapper);

	            _get(Object.getPrototypeOf(ComponentWrapper.prototype), 'constructor', this).call(this, props);

	            this.handleCommand = function (_ref) {
	                var actionName = _ref.actionName;
	                var actionGroup = _ref.actionGroup;
	                var payload = _ref.payload;
	                var status = _ref.status;

	                var commandHandlerName = "onCmd" + (0, _utilsStringUtils.toFirstCharUpper)(actionName); // onCmdXXX
	                var componentIns = _this.refs['BaseComponentIns'];
	                if (componentIns) {
	                    var commandHandler = componentIns[commandHandlerName];
	                    if (commandHandler) {
	                        commandHandler(payload, status, actionName, actionGroup);
	                    }
	                }
	            };

	            this.handleAllStoreChange = function (changedState, StoreInsSource) {
	                var stateMerge = {};
	                var stateTmp;
	                (0, _utilsFunctions.forEach)(storeInsArray, function (StoreIns0, index) {
	                    if (StoreInsSource) {
	                        if (StoreIns0 === StoreInsSource) {
	                            stateTmp = StoreIns0.getState();
	                            stateMerge['state' + index] = stateTmp;
	                        }
	                    } else {
	                        stateTmp = StoreIns0.getState();
	                        stateMerge['state' + index] = stateTmp;
	                    }
	                });

	                _this.setState(stateMerge);
	            };

	            this.state = {};
	        }

	        _createClass(ComponentWrapper, [{
	            key: 'componentDidMount',
	            value: function componentDidMount() {
	                var that = this;

	                _utilsActionEventBus2['default'].on(_utilsActionEventBus.CommandEvent, that.handleCommand);

	                (0, _utilsFunctions.forEach)(storeInsArray, function (StoreIns0) {
	                    StoreIns0.addChangeListener(that.handleAllStoreChange);
	                });
	                this.handleAllStoreChange();
	            }
	        }, {
	            key: 'componentWillUnmount',
	            value: function componentWillUnmount() {
	                var that = this;

	                _utilsActionEventBus2['default'].off(_utilsActionEventBus.CommandEvent, that.handleCommand);

	                (0, _utilsFunctions.forEach)(storeInsArray, function (StoreIns0) {
	                    StoreIns0.removeChangeListener(that.handleAllStoreChange);
	                });
	            }

	            //View层也可以直接接收Command的消息.
	        }, {
	            key: 'render',
	            value: function render() {
	                var props = this.props;
	                var stateParamForCalc = getStateParam(this.state, isArrayStoreIns, storeInsArrayLength);
	                props = (0, _utilsFunctions.extend)({}, props, mapStateToProps(stateParamForCalc, props));
	                return _react2['default'].createElement(BaseComponent, _extends({}, props, { ref: 'BaseComponentIns' }));
	            }
	        }]);

	        return ComponentWrapper;
	    })(_react2['default'].Component);
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.createAction = createAction;
	exports.createActions = createActions;
	exports.createCommand = createCommand;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsFunctions = __webpack_require__(1);

	var _utilsArrayUtils = __webpack_require__(5);

	var _utilsIsPromise = __webpack_require__(10);

	var _utilsIsPromise2 = _interopRequireDefault(_utilsIsPromise);

	var _utilsActionEventBus = __webpack_require__(2);

	var _utilsActionEventBus2 = _interopRequireDefault(_utilsActionEventBus);

	function createActionEvent(actionGroup, actionName, status, payload) {
	    return {
	        actionName: actionName,
	        actionGroup: actionGroup,
	        status: status,
	        payload: payload
	    };
	}

	function createAction(actionGroup, actionName, func) {
	    var actionsConfig = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var eventName = arguments.length <= 4 || arguments[4] === undefined ? _utilsActionEventBus.ActionEvent : arguments[4];

	    return function () {

	        var args = (0, _utilsArrayUtils.toArray)(arguments);
	        var result = func.call(actionsConfig || {}, args);
	        if ((0, _utilsIsPromise2['default'])(result)) {

	            result.then(function (data) {
	                _utilsActionEventBus2['default'].emit(eventName, createActionEvent(actionGroup, actionName, 'success', data));
	            }, function (data) {
	                _utilsActionEventBus2['default'].emit(eventName, createActionEvent(actionGroup, actionName, 'error', data));
	            });

	            _utilsActionEventBus2['default'].emit(eventName, createActionEvent(actionGroup, actionName, 'pending', result));
	        } else {
	            _utilsActionEventBus2['default'].emit(eventName, createActionEvent(actionGroup, actionName, 'success', result));
	        }

	        return result;
	    };
	}

	function createActions(actionGroup, actionsConfig) {
	    var actions = {};

	    (0, _utilsFunctions.forEach)(actionsConfig, function (func, actionName) {
	        actions[actionName] = createAction(actionGroup, actionName, func, actionsConfig, _utilsActionEventBus.ActionEvent);
	    });

	    return actions;
	}

	//Command是一个特殊的Action

	function createCommand(commandName, func) {
	    return createAction("Command", commandName, func, {}, _utilsActionEventBus.CommandEvent);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.createMergedStore = createMergedStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsEventBus = __webpack_require__(3);

	var _utilsEventBus2 = _interopRequireDefault(_utilsEventBus);

	var _utilsFunctions = __webpack_require__(1);

	var _createStore = __webpack_require__(4);

	function mergeStoreState(storeConfig) {
	    var result = {};
	    (0, _utilsFunctions.forEach)(storeConfig, function (storeIns, name) {
	        if (storeIns && storeIns.$$RebixfluxStoreClassName === _createStore.STORE_CLASS_NAME) {
	            result[name] = storeIns.getState();
	        }
	    });
	    return result;
	}

	var RebixfluxMergedStore = (function () {
	    function RebixfluxMergedStore(storeConfig) {
	        var _this = this;

	        _classCallCheck(this, RebixfluxMergedStore);

	        this.$$handleSubStoreChange = function (changedState, subStore) {
	            var storeConfig = _this.$$storeConfig;
	            _this.$$state = mergeStoreState(storeConfig);
	            _this.$$eventBus.emit(_createStore.EVENT_STORE_CHANGE, changedState, subStore, _this);
	        };

	        if (!storeConfig) {
	            throw new Error('NullPointer');
	        }
	        this.$$storeConfig = storeConfig;
	        this.$$RebixfluxStoreClassName = _createStore.STORE_CLASS_NAME;
	        this.$$eventBus = new _utilsEventBus2['default']('MergedStoreEventBus');
	        this.$$state = mergeStoreState(storeConfig);
	        this.enableListener();
	    }

	    _createClass(RebixfluxMergedStore, [{
	        key: 'enableListener',
	        value: function enableListener() {
	            var that = this;
	            var storeConfig = this.$$storeConfig;
	            (0, _utilsFunctions.forEach)(storeConfig, function (storeIns) {
	                if (storeIns && storeIns.$$RebixfluxStoreClassName === _createStore.STORE_CLASS_NAME) {
	                    storeIns.addChangeListener(that.$$handleSubStoreChange);
	                }
	            });
	        }
	    }, {
	        key: 'disableListener',
	        value: function disableListener() {
	            var that = this;
	            var storeConfig = this.$$storeConfig;
	            (0, _utilsFunctions.forEach)(storeConfig, function (storeIns) {
	                if (storeIns && storeIns.$$RebixfluxStoreClassName === _createStore.STORE_CLASS_NAME) {
	                    storeIns.removeChangeListener(that.$$handleSubStoreChange);
	                }
	            });
	        }
	    }, {
	        key: 'addChangeListener',
	        value: function addChangeListener(listener) {
	            this.$$eventBus.on(_createStore.EVENT_STORE_CHANGE, listener);
	        }
	    }, {
	        key: 'removeChangeListener',
	        value: function removeChangeListener(listener) {
	            this.$$eventBus.off(_createStore.EVENT_STORE_CHANGE, listener);
	        }
	    }, {
	        key: 'getState',
	        value: function getState() {
	            return this.$$state;
	        }
	    }]);

	    return RebixfluxMergedStore;
	})();

	function createMergedStore(storeConfig) {
	    return new RebixfluxMergedStore(storeConfig);
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = isPromise;

	function isPromise(p) {
	    return p && typeof p.then === 'function' && typeof p['catch'] === 'function';
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }
/******/ ])
});
;