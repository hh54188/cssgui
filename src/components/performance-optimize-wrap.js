import React from 'react';

export function performanceOptimize(TargetComponent) {
  return (propertiesToCheckEqual, equalCheckFn) => {
    return class extends React.Component {
      constructor(props) {
        super(props)
      }
      shouldComponentUpdate(nextProps) {
        if (equalCheckFn) {
          return equalCheckFn(this.props, nextProps)
        }
        if (propertiesToCheckEqual) {
          return propertiesToCheckEqual.some(propertyName => {
            const oldPropertyValue = this.props[propertyName];
            const newPropertyValue = nextProps[propertyName];
            
            return oldPropertyValue !== newPropertyValue
          });
        }
        return true;
      }
      render() {
        return <TargetComponent {...this.props} ></TargetComponent>
      }
    }
  }
}
