/******/ (function(modules) { // webpackBootstrap
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

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	// import some new stuff

	// we'll use this to render our app to an html string

	// and these to match the url to routes and then render


	// Api stuff


	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(4);

	var _reactRouter = __webpack_require__(5);

	var _routes = __webpack_require__(6);

	var _routes2 = _interopRequireDefault(_routes);

	var _redux = __webpack_require__(13);

	var _reactRedux = __webpack_require__(14);

	var _reducers = __webpack_require__(15);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _fetchNeeds = __webpack_require__(16);

	var _fetchNeeds2 = _interopRequireDefault(_fetchNeeds);

	var _AsyncRouterContext = __webpack_require__(17);

	var _AsyncRouterContext2 = _interopRequireDefault(_AsyncRouterContext);

	var _callAPIMiddleware = __webpack_require__(18);

	var _callAPIMiddleware2 = _interopRequireDefault(_callAPIMiddleware);

	var _index = __webpack_require__(19);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	app.use('/api', _index2.default);

	app.get('*', function (req, res, next) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {

	    if (err) {
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      return res.redirect(302, redirect.pathname + redirect.search);
	    } else if (!props) {
	      return next();
	    }

	    var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_callAPIMiddleware2.default));

	    // `RouterContext` is the what `Router` renders. `Router` keeps these
	    // `props` in its state as it listens to `browserHistory`. But on the
	    // server our app is stateless, so we need to use `match` to
	    // get these props before rendering.

	    (0, _fetchNeeds2.default)(props, store)
	    /**
	     * asyncProps will be an array here, one props object for each route
	     * that matches the current location, i.e. nested routes.
	     */
	    .then(function (asyncProps) {
	      // Have to do the render after needs are fetched else we won't have the
	      // returned props
	      // We can't use the standard RouterContext because it filters out which
	      // props are passed down, only only passes a specific RouterContext
	      // subset. We want to pass on anything we add additionaly, i.e. the
	      // async props.
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_AsyncRouterContext2.default, _extends({}, props, { asyncProps: asyncProps }))
	      ));

	      // dump the HTML into a template, lots of ways to do this, but none are
	      // really influenced by React Router
	      var html = __webpack_require__(22);
	      html = html.replace('<!--__APP_HTML__-->', appHtml);

	      var initialState = { asyncProps: asyncProps, store: store.getState() };
	      html = html.replace('{/*__INITIAL_STATE__*/}', JSON.stringify(initialState));

	      res.send(html);
	    });
	  });
	});

	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

	var PORT = process.env.PORT || 8081;
	app.listen(PORT, function () {
	  console.log('Express running at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _App = __webpack_require__(7);

	var _App2 = _interopRequireDefault(_App);

	var _Dogs = __webpack_require__(8);

	var _Dogs2 = _interopRequireDefault(_Dogs);

	var _Cats = __webpack_require__(11);

	var _Cats2 = _interopRequireDefault(_Cats);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
		_reactRouter.Route,
		{ path: '/', component: _App2.default },
		_react2.default.createElement(_reactRouter.Route, { path: '/cats', component: _Cats2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: '/dogs', component: _Dogs2.default })
	);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Animals'
	        ),
	        _react2.default.createElement(
	          'h5',
	          null,
	          'A simple async props example.'
	        ),
	        _react2.default.createElement(
	          'ul',
	          { role: 'nav' },
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/' },
	              'Home'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/cats' },
	              'Cats'
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/dogs' },
	              'Dogs'
	            )
	          )
	        ),
	        this.props.children
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	exports.default = App;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _fetchDogs = __webpack_require__(9);

	var _fetchDogs2 = _interopRequireDefault(_fetchDogs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dogs = function (_Component) {
	  _inherits(Dogs, _Component);

	  function Dogs() {
	    _classCallCheck(this, Dogs);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Dogs).apply(this, arguments));
	  }

	  _createClass(Dogs, [{
	    key: 'render',
	    value: function render() {
	      //console.log(require('util').inspect(this.props))
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Dogs'
	        ),
	        this.props.dogs.map(function (dog) {
	          return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'h4',
	              null,
	              dog.name
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              dog.description
	            )
	          );
	        })
	      );
	    }
	  }]);

	  return Dogs;
	}(_react.Component);

	Dogs.defaultProps = {
	  dogs: []
	};


	Dogs.needs = function (props, store) {
	  return store.dispatch((0, _fetchDogs2.default)()).then(function () {
	    var state = store.getState();
	    return {
	      dogs: state.dogs
	    };
	  });
	};

	exports.default = Dogs;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = fetchCats;

	var _isomorphicFetch = __webpack_require__(10);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function fetchCats() {

	  console.log('fetchDogs called');

	  return {
	    // Types of actions to emit before and after
	    types: ['FETCH_DOGS_REQUEST', 'FETCH_DOGS_SUCCESS', 'FETCH_DOGS_FAILURE'],
	    // Check the cache (optional):
	    shouldCallAPI: function shouldCallAPI(state) {
	      return !state.dogs;
	    },
	    // Perform the fetching:
	    callAPI: function callAPI() {
	      return (0, _isomorphicFetch2.default)('http://localhost:8081/api/dogs');
	    },
	    // Arguments to inject in begin/end actions
	    payload: {}
	  };
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _fetchCats = __webpack_require__(12);

	var _fetchCats2 = _interopRequireDefault(_fetchCats);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Cats = function (_Component) {
	  _inherits(Cats, _Component);

	  function Cats() {
	    _classCallCheck(this, Cats);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Cats).apply(this, arguments));
	  }

	  _createClass(Cats, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Cats'
	        ),
	        this.props.cats.map(function (cat) {
	          return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'h4',
	              null,
	              cat.name
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              cat.description
	            )
	          );
	        })
	      );
	    }
	  }]);

	  return Cats;
	}(_react.Component);

	Cats.defaultProps = {
	  cats: []
	};


	Cats.needs = function (props, store) {
	  return store.dispatch((0, _fetchCats2.default)()).then(function () {
	    var state = store.getState();
	    return {
	      cats: state.cats
	    };
	  });
	};

	exports.default = Cats;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = fetchCats;

	var _isomorphicFetch = __webpack_require__(10);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function fetchCats() {

	  console.log('fetchCats called');

	  return {
	    // Types of actions to emit before and after
	    types: ['FETCH_CATS_REQUEST', 'FETCH_CATS_SUCCESS', 'FETCH_CATS_FAILURE'],
	    // Check the cache (optional):
	    shouldCallAPI: function shouldCallAPI(state) {
	      return !state.cats;
	    },
	    // Perform the fetching:
	    callAPI: function callAPI() {
	      return (0, _isomorphicFetch2.default)('http://localhost:8081/api/cats');
	    },
	    // Arguments to inject in begin/end actions
	    payload: {}
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(13);

	function catsReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	  var action = arguments[1];

	  if (action.type == 'FETCH_CATS_SUCCESS') return action.response;
	  return state;
	}

	function dogsReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	  var action = arguments[1];

	  if (action.type == 'FETCH_DOGS_SUCCESS') return action.response;
	  return state;
	}

	exports.default = (0, _redux.combineReducers)({
	  cats: catsReducer,
	  dogs: dogsReducer
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = fetchNeeds;
	function fetchNeeds(params, store) {

	  var components = params.components;

	  var needs = [];
	  components.forEach(function (c) {
	    return needs.push(c.needs || null);
	  }, []);

	  var promises = needs.map(function (need) {
	    if (!need) return Promise.resolve(need);
	    return need(params, store);
	  });

	  return Promise.all(promises);
	}
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}return target;
	};

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var AsyncPropsContainer = function (_Component) {
		_inherits(AsyncPropsContainer, _Component);

		function AsyncPropsContainer() {
			var _Object$getPrototypeO;

			var _temp, _this, _ret;

			_classCallCheck(this, AsyncPropsContainer);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AsyncPropsContainer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { newProps: {} }, _this.componentWillReceiveProps = function (props) {
				if (props.Component == _this.props.Component) return;
				var Component = props.Component;
				var componentProps = props.componentProps;

				_this.loadNeeds(Component, componentProps);
			}, _this.loadNeeds = function (Component, componentProps) {
				if (!Component.needs) return;
				_this.setState({ newProps: {} });
				Promise.resolve(Component.needs(componentProps, _this.context.store)).then(function (newProps) {
					_this.setState({ newProps: newProps });
				});
			}, _this.render = function () {
				var _this$props = _this.props;
				var Component = _this$props.Component;
				var componentProps = _this$props.componentProps;

				return _react2.default.createElement(Component, _extends({}, componentProps, _this.state.newProps));
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		return AsyncPropsContainer;
	}(_react.Component);

	AsyncPropsContainer.contextTypes = {
		store: _react2.default.PropTypes.object
	};

	var AsyncRouterContext = function (_Component2) {
		_inherits(AsyncRouterContext, _Component2);

		function AsyncRouterContext() {
			var _Object$getPrototypeO2;

			var _temp2, _this2, _ret2;

			_classCallCheck(this, AsyncRouterContext);

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(AsyncRouterContext)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2.render = function () {
				var asyncProps = _this2.props.asyncProps || [];
				var i = _this2.props.components.length - 1;
				return _react2.default.createElement(_reactRouter.RouterContext, _extends({}, _this2.props, {
					createElement: function createElement(Component, props) {
						var iAsyncProps = asyncProps[i--] || {};
						return _react2.default.createElement(AsyncPropsContainer, {
							Component: Component,
							componentProps: _extends({}, props, iAsyncProps)
						});
					}
				}));
			}, _temp2), _possibleConstructorReturn(_this2, _ret2);
		}

		return AsyncRouterContext;
	}(_react.Component);

	;

	exports.default = AsyncRouterContext;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function callAPIMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      var types = action.types;
	      var callAPI = action.callAPI;
	      var _action$shouldCallAPI = action.shouldCallAPI;
	      var shouldCallAPI = _action$shouldCallAPI === undefined ? function () {
	        return true;
	      } : _action$shouldCallAPI;
	      var _action$payload = action.payload;
	      var payload = _action$payload === undefined ? {} : _action$payload;


	      if (!types) {
	        // Normal action: pass it on
	        return next(action);
	      }

	      if (!Array.isArray(types) || types.length !== 3 || !types.every(function (type) {
	        return typeof type === 'string';
	      })) {
	        throw new Error('Expected an array of three string types.');
	      }

	      if (typeof callAPI !== 'function') {
	        throw new Error('Expected fetch to be a function.');
	      }

	      if (!shouldCallAPI(getState())) {
	        // Returning an object here so that the dispatch call will carry on
	        // and return a Promise, as we may have code to execute later
	        return Promise.resolve({});
	      }

	      var _types = _slicedToArray(types, 3);

	      var requestType = _types[0];
	      var successType = _types[1];
	      var failureType = _types[2];


	      dispatch(Object.assign({}, payload, {
	        type: requestType
	      }));

	      return callAPI().then(function (response) {
	        return response.json();
	      }).then(function (json) {
	        return dispatch(Object.assign({}, payload, {
	          response: json,
	          type: successType
	        }));
	      }, function (error) {
	        return dispatch(Object.assign({}, payload, {
	          error: error,
	          type: failureType
	        }));
	      });
	    };
	  };
	}

	exports.default = callAPIMiddleware;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _express = __webpack_require__(1);

	var router = new _express.Router();

	// Enable CORS
	router.use(function (req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	router.use('/cats', __webpack_require__(20));
	router.use('/dogs', __webpack_require__(21));

	module.exports = router;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var router = new _express.Router();
	var cats = [{
	  name: 'British Shorthair',
	  description: 'The British Shorthair is the pedigreed version of the traditional British domestic cat, with a distinctively chunky body, dense coat and broad face.'
	}, {
	  name: 'Siamese cat',
	  description: 'The Siamese cat is one of the first distinctly recognized breeds of Oriental cat. One of several breeds native to Thailand, the Siamese cat became one of the most popular breeds in Europe and North America in the 20th century.'
	}, {
	  name: 'Persian cat',
	  description: 'The Persian cat is a long-haired breed of cat characterized by its round face and short muzzle. In Britain, it is sometimes called the Longhair or Persian Longhair. It is also known as the Shiraz or Shirazi, particularly in the Middle East.'
	}];

	router.get('/', function (req, res, next) {
	  res.status(200).send(cats);
	});

	module.exports = router;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var router = new _express.Router();
	var dogs = [{
	  name: 'Labrador Retriever',
	  description: 'The Labrador Retriever, also Labrador, is a type of retriever-gun dog. The Labrador is one of the most popular breeds of dog in the United Kingdom and the United States.'
	}, {
	  name: 'German Shepherd',
	  description: 'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. The breed\'s officially recognized name is German Shepherd Dog in the English language, sometimes abbreviated'
	}, {
	  name: 'Bulldog',
	  description: 'The Bulldog is a medium-sized breed of dog commonly referred to as the English Bulldog or British Bulldog. Other Bulldog breeds include the American Bulldog, Old English Bulldog, Leavitt Bulldog, Olde English Bulldogge, and the French Bulldog.'
	}];

	router.get('/', function (req, res, next) {
	  res.status(200).send(dogs);
	});

	module.exports = router;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html>\n<meta charset=\"utf-8\" />\n<title>React Router Redux Async Props Example</title>\n<div id=\"app\"><!--__APP_HTML__--></div>\n<script>\n  window.__INITIAL_STATE__ = {/*__INITIAL_STATE__*/}\n</script>\n<script src=\"bundle.js\"></script>"

/***/ }
/******/ ]);