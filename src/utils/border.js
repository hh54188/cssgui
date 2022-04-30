export function enableBorderAllInOne(sourceElementState) {
    const topBorder = sourceElementState.border.top;
    sourceElementState.borderAllInOne = true;
    sourceElementState.border.left = { ...topBorder }
    sourceElementState.border.right = { ...topBorder }
    sourceElementState.border.bottom = { ...topBorder }
    return sourceElementState
}

export function updateAllPositionBorderProperty(sourceElementState, property, value) {
    sourceElementState.border['top'][property] = value;
    sourceElementState.border['bottom'][property] = value;
    sourceElementState.border['left'][property] = value;
    sourceElementState.border['right'][property] = value;
    return sourceElementState
}

export function updateBorderProperty(sourceElementState, position, property, value) {
    sourceElementState.border[position][property] = value;
    return sourceElementState
}