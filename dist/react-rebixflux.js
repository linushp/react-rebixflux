(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRebixflux"] = factory(require("react"));
	else
		root["ReactRebixflux"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_74__) {
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

	var _createStore = __webpack_require__(10);

	var _createMergedStore = __webpack_require__(27);

	var _connect = __webpack_require__(25);

	var _connect2 = _interopRequireDefault(_connect);

	var _createActions = __webpack_require__(26);

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
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(22),
	    isLength = __webpack_require__(23);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _EventBus = __webpack_require__(4);

	var _EventBus2 = _interopRequireDefault(_EventBus);

	var ActionEvent = "ActionEvent";
	exports.ActionEvent = ActionEvent;
	var CommandEvent = "CommandEvent";

	exports.CommandEvent = CommandEvent;
	exports["default"] = new _EventBus2["default"]("ActionEventBus");

/***/ },
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(13),
	    getRawTag = __webpack_require__(51),
	    objectToString = __webpack_require__(58);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(17);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.createStore = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsEventBus = __webpack_require__(4);

	var _utilsEventBus2 = _interopRequireDefault(_utilsEventBus);

	var _utilsActionEventBus = __webpack_require__(3);

	var _utilsActionEventBus2 = _interopRequireDefault(_utilsActionEventBus);

	var _utilsStringUtils = __webpack_require__(12);

	var _utilsArrayUtils = __webpack_require__(11);

	var _lodashExtend = __webpack_require__(66);

	var _lodashExtend2 = _interopRequireDefault(_lodashExtend);

	var _lodashForEach = __webpack_require__(67);

	var _lodashForEach2 = _interopRequireDefault(_lodashForEach);

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

	            that.$$state = (0, _lodashExtend2['default'])({}, that.$$state, changedState);
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
	        this.$$state = (0, _lodashExtend2['default'])({}, initialState);
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(7);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(42),
	    isArguments = __webpack_require__(68),
	    isArray = __webpack_require__(21),
	    isBuffer = __webpack_require__(69),
	    isIndex = __webpack_require__(18),
	    isTypedArray = __webpack_require__(70);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(16);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()) || Function('return this')()))

/***/ },
/* 18 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    isObject = __webpack_require__(2);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 25 */
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

	var _react = __webpack_require__(74);

	var _react2 = _interopRequireDefault(_react);

	//import extend from 'lodash/extend'
	//import isArray from 'lodash/isArray'
	//import forEach from 'lodash/forEach'

	var _utilsFunctions = __webpack_require__(5);

	var _utilsActionEventBus = __webpack_require__(3);

	var _utilsActionEventBus2 = _interopRequireDefault(_utilsActionEventBus);

	var _utilsStringUtils = __webpack_require__(12);

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.createAction = createAction;
	exports.createActions = createActions;
	exports.createCommand = createCommand;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsFunctions = __webpack_require__(5);

	var _utilsArrayUtils = __webpack_require__(11);

	var _utilsIsPromise = __webpack_require__(28);

	var _utilsIsPromise2 = _interopRequireDefault(_utilsIsPromise);

	var _utilsActionEventBus = __webpack_require__(3);

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.createMergedStore = createMergedStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utilsEventBus = __webpack_require__(4);

	var _utilsEventBus2 = _interopRequireDefault(_utilsEventBus);

	var _utilsFunctions = __webpack_require__(5);

	var _createStore = __webpack_require__(10);

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
/* 28 */
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
/* 29 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(15),
	    eq = __webpack_require__(20);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(34),
	    createBaseEach = __webpack_require__(48);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(49);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(33),
	    keys = __webpack_require__(71);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    isObjectLike = __webpack_require__(9);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(22),
	    isMasked = __webpack_require__(54),
	    isObject = __webpack_require__(2),
	    toSource = __webpack_require__(63);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    isLength = __webpack_require__(23),
	    isObjectLike = __webpack_require__(9);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(19),
	    nativeKeys = __webpack_require__(55);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2),
	    isPrototype = __webpack_require__(19),
	    nativeKeysIn = __webpack_require__(56);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(8),
	    overRest = __webpack_require__(60),
	    setToString = __webpack_require__(61);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(65),
	    defineProperty = __webpack_require__(16),
	    identity = __webpack_require__(8);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(8);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = castFunction;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(31),
	    baseAssignValue = __webpack_require__(15);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(7);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(40),
	    isIterateeCall = __webpack_require__(53);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(1);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(36),
	    getValue = __webpack_require__(52);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(13);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(20),
	    isArrayLike = __webpack_require__(1),
	    isIndex = __webpack_require__(18),
	    isObject = __webpack_require__(2);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(46);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(59);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(17);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)(module)))

/***/ },
/* 58 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(29);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(41),
	    shortOut = __webpack_require__(62);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(45),
	    createAssigner = __webpack_require__(47),
	    keysIn = __webpack_require__(72);

	/**
	 * This method is like `_.assign` except that it iterates over own and
	 * inherited source properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assign
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
	 */
	var assignIn = createAssigner(function(object, source) {
	  copyObject(source, keysIn(source), object);
	});

	module.exports = assignIn;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(64);


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(30),
	    baseEach = __webpack_require__(32),
	    castFunction = __webpack_require__(44),
	    isArray = __webpack_require__(21);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(35),
	    isObjectLike = __webpack_require__(9);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(7),
	    stubFalse = __webpack_require__(73);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)(module)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(37),
	    baseUnary = __webpack_require__(43),
	    nodeUtil = __webpack_require__(57);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(14),
	    baseKeys = __webpack_require__(38),
	    isArrayLike = __webpack_require__(1);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(14),
	    baseKeysIn = __webpack_require__(39),
	    isArrayLike = __webpack_require__(1);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_74__;

/***/ }
/******/ ])
});
;