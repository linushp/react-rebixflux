import React from 'react';
import shallowEqual from '../utils/shallowEqual';

function shallowCompare(component, nextProps, nextState) {
    return !shallowEqual(component.props, nextProps) || !shallowEqual(component.state, nextState);
}


export function createPureComponent(renderFunction) {
    return React.createClass({

        shouldComponentUpdate:function(nextProps, nextState) {
            var isOk =  shallowCompare(this, nextProps, nextState);
            return isOk;
        },

        //createProxyHandler: function (handlerName) {
        //    var that = this;
        //    var proxyName = '_proxy_' + handlerName;
        //    var foo = that[proxyName];
        //    if (!foo) {
        //        foo = function () {
        //            var props = that.props;
        //            var realHandler = props[handlerName];
        //            realHandler(props);
        //        };
        //        that[proxyName] = foo;
        //    }
        //    return foo;
        //},

        render: function () {
            var props = this.props;
            //var createProxyHandler = this.createProxyHandler;
            return renderFunction ? renderFunction(props) : null;
        }

    });
}

export const PureRenderComponent = createPureComponent();


