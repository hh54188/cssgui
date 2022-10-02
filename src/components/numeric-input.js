import React, { useState } from 'react'
import { InputGroup } from '@blueprintjs/core'
import _ from 'lodash'

export class NumericInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      internalValue: props.value
    }
  }
  static getDerivedStateFromProps(props, state) {
    const {forceSync, value} = props
    if (forceSync) {
      return {
        internalValue: value
      }
    }
    return null;
  }
  onBlur = () => {
    this.setState({
      internalValue: this.props.value
    })
  }
  onChange = (event) => {
    const { min, max, onValueChange } = this.props
    const originValue = event.target.value;
    this.setState({
      internalValue: originValue
    })

    const numValue = parseInt(originValue);
    if (isNaN(numValue)) {
      return;
    }
    if (_.isNumber(min) && numValue < min) {
      return onValueChange(min)
    }
    if (_.isNumber(max) && numValue > max) {
      return onValueChange(max)
    }
    onValueChange(numValue)
  }
  onKeyDown = (event) => {
    const { min, max, value } = this.props
    if (event.key === 'Enter') {
      const draftValue = event.target.value;
      const numValue = parseInt(draftValue);
      
      if (isNaN(numValue)) {
        return;
      }

      if (_.isNumber(min) && numValue < min) {
        return this.setState({
          internalValue: min
        })
      }

      if (_.isNumber(max) && numValue > max) {
        return this.setState({
          internalValue: max
        })
      }

      this.setState({
        internalValue: numValue
      })
    }

    if (event.key === 'ArrowUp') {
      let plusValue = 1;
      if (event.shiftKey) {
        plusValue = 10;
      }
      const draftValue = value + plusValue;
      const finalValue = _.isNumber(max) && draftValue > max ? max : draftValue;

      this.props.onValueChange(finalValue)
      this.setState({
        internalValue: finalValue
      })

      event.preventDefault()
      return
    }

    if (event.key === 'ArrowDown') {
      let minusValue = 1;
      if (event.shiftKey) {
        minusValue = 10;
      }
      const draftValue = value - minusValue;
      const finalValue = _.isNumber(min) && draftValue < min ? min : draftValue;

      this.props.onValueChange(finalValue)
      this.setState({
        internalValue: finalValue
      })

      event.preventDefault()
      return
    }
  }
  render() {
    const { className, disabled, fill } = this.props
    return <InputGroup
      className={className}
      disabled={disabled}
      value={this.state.internalValue}
      fill={fill}
      onBlur={this.onBlur}
      onKeyDown={this.onKeyDown}
      onChange={this.onChange}></InputGroup>
  }
}