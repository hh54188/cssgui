let idSeed = 1;
export function updateTransformProperty(sourceElementState, type, coord, value) {
  sourceElementState.transform[type][coord] = value;
  return sourceElementState
}
export function createBoxShadowString(boxShadowState) {
  const enabledBoxShadowState = boxShadowState.filter(item => item.enabled);
  let boxShadowStr = ''
  if (enabledBoxShadowState.length) {
    enabledBoxShadowState.forEach(({ enableInset, offsetX, offsetY, blurRadius, spreadRadius, color }, index) => {
      boxShadowStr += `${enableInset ? 'inset' : ''} ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color} ${index !== enabledBoxShadowState.length - 1 ? ',' : ''}`;
    })
  } else {
    boxShadowStr = 'none'
  }
  return boxShadowStr
}

export function addShadow(originElementState) {
  originElementState.boxShadow.push({
    enableInset: false,
    offsetX: 5,
    offsetY: 5,
    blurRadius: 20,
    spreadRadius: 0,
    color: 'grey',
    collapsePanel: false,
    enabled: true
  })
  return originElementState
}


export function removeShadow(originElementState, index) {
  originElementState.boxShadow.splice(index, 1)
  return originElementState
}

export function updateShadowProperty(originElementState, index, name, value) {
  originElementState.boxShadow[index][name] = value;
  return originElementState
}


export function moveTopLeft(originElementState) {
  return {
    ...originElementState,
    left: 0,
    top: 0
  }
}

export function moveTopCenter(originElementState) {
  const canvasPanel = document.querySelector('.canvas-panel');
  const canvasPanelStyle = window.getComputedStyle(canvasPanel);
  const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
  const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

  return {
    ...originElementState,
    top: 0,
    left: canvasPanelWidth / 2 - originElementState.width / 2
  }
}

export function moveTopRight(originElementState) {
  const canvasPanel = document.querySelector('.canvas-panel');
  const canvasPanelStyle = window.getComputedStyle(canvasPanel);
  const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
  const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

  return {
    ...originElementState,
    top: 0,
    left: canvasPanelWidth - originElementState.width
  }
}

export function moveCenterLeft(originElementState) {
  const canvasPanel = document.querySelector('.canvas-panel');
  const canvasPanelStyle = window.getComputedStyle(canvasPanel);
  const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
  const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

  return {
    ...originElementState,
    top: canvasPanelHeight / 2 - originElementState.height / 2,
    left: 0
  }
}

export function moveCenterCenter(originElementState) {
  const canvasPanel = document.querySelector('.canvas-panel');
  const canvasPanelStyle = window.getComputedStyle(canvasPanel);
  const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
  const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

  return {
    ...originElementState,
    top: canvasPanelHeight / 2 - originElementState.height / 2,
    left: canvasPanelWidth / 2 - originElementState.width / 2
  }
}

export function moveCenterRight(originElementState) {
  const canvasPanel = document.querySelector('.canvas-panel');
  const canvasPanelStyle = window.getComputedStyle(canvasPanel);
  const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
  const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

  return {
    ...originElementState,
    top: canvasPanelHeight / 2 - originElementState.height / 2,
    left: canvasPanelWidth - originElementState.width
  }
}

export function moveBottomLeft(originElementState) {
  const canvasPanel = document.querySelector('.canvas-panel');
  const canvasPanelStyle = window.getComputedStyle(canvasPanel);
  const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
  const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

  return {
    ...originElementState,
    top: canvasPanelHeight - originElementState.height,
    left: 0
  }
}

export function moveBottomCenter(originElementState) {
  const canvasPanel = document.querySelector('.canvas-panel');
  const canvasPanelStyle = window.getComputedStyle(canvasPanel);
  const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
  const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

  return {
    ...originElementState,
    top: canvasPanelHeight - originElementState.height,
    left: canvasPanelWidth / 2 - originElementState.width / 2
  }
}

export function moveBottomRight(originElementState) {
  const canvasPanel = document.querySelector('.canvas-panel');
  const canvasPanelStyle = window.getComputedStyle(canvasPanel);
  const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
  const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

  return {
    ...originElementState,
    top: canvasPanelHeight - originElementState.height,
    left: canvasPanelWidth - originElementState.width
  }
}
