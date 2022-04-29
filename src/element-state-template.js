const stateTemlate = {
  width: 200,
  height: 200,
  top: 100,
  bottom: 0,
  left: 100,
  right: 0,
  backgroundColor: '#FFFFFF',

  borderEnabled: true,
  borderAllInOne: true,
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
  }]
}

export function getNewState({ height = 200, width = 200, left = 100, top = 100 }) {
  return JSON.parse(JSON.stringify({
    ...stateTemlate,
    width,
    height,
    left,
    top
  }))
}