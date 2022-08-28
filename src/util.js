let idSeed = 1;
export function updateTransformProperty(sourceElementState, type, coordinate, value) {
  sourceElementState.transform[type][coordinate] = value;
  return sourceElementState
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
