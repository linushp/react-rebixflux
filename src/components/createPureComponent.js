import React from 'react';
import PureRenderComponent from './PureRenderComponent';

module.exports = function createPureComponent(renderFunction){
    return class newComponent extends PureRenderComponent {
        render() {
            var props = this.props;
            return renderFunction(props);
        }
    }
};