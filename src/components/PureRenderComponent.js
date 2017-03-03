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

        render: function () {
            var props = this.props;
            return renderFunction ? renderFunction(props) : null;
        }

    });
}

export const PureRenderComponent = createPureComponent();


