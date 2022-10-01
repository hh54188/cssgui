import { v4 as uuidv4 } from 'uuid';
import {maxOffset, minOffset} from './store/gradient'
const stateTemplate = {
  width: 200,
  height: 200,
  top: 100,
  bottom: 0,
  left: 100,
  right: 0,
  enableGradientBackground: false,
  backgroundColor: '#FFFFFF',
  backgroundGradientAngle: 90,
  backgroundGradientStops: [{
    id: uuidv4(),
    offset: minOffset,
    color: '#ffa500',
    percentage: 0,
    visible: true,
  }, {
    id: uuidv4(),
    offset: maxOffset,
    color: '#87ceeb',
    percentage: 100,
    visible: true,
  }],
  zIndex: 2,

  borderEnabled: true,
  borderAllInOne: true,

  animation: {
    duration: 0.3,
    delay: 0,
    timing: 'ease',
    infinite: false,
    name: '',
    animatedProperties: {
      size: false,
      position: false,
      background: false,
      border: false,
      boxShadow: false,
      translate: false,
      scale: false,
      skew: false
    },
    animationTimeline:[]
  },

  border: {
    top: {
      width: 1,
      style: 'solid',
      color: 'gray'
    },
    bottom: {
      width: 1,
      style: 'solid',
      color: 'gray'
    },
    left: {
      width: 1,
      style: 'solid',
      color: 'gray'
    },
    right: {
      width: 1,
      style: 'solid',
      color: 'gray'
    },
  },

  boxShadow: [{
    enableInset: false,
    offsetX: 5,
    offsetY: 5,
    blurRadius: 20,
    spreadRadius: 0,
    color: 'grey',
    collapsePanel: false,
    enabled: true
  }],

  transform: {
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    translate: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    },
    skew: {
      x: 0,
      y: 0,
    },
  }
}

export function getNewState({ height = 200, width = 200, left = 100, top = 100 }) {
  return JSON.parse(JSON.stringify({
    ...stateTemplate,
    width,
    height,
    left,
    top
  }))
}
