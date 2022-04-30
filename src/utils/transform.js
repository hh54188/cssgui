export function updateTransformProperty(sourceElementState, type, coord, value) {
    sourceElementState.transform[type][coord] = value;
    return sourceElementState
}

export function resetTranslate(sourceElementState) {
    sourceElementState.transform.translate = {
        x: 0,
        y: 0,
        z: 0
    }
    return sourceElementState
}

export function resetScale(sourceElementState) {
    sourceElementState.transform.scale = {
        x: 1,
        y: 1,
        z: 1
    }
    return sourceElementState
}

export function resetSkew(sourceElementState) {
    sourceElementState.transform.skew = {
        x: 0,
        y: 0,
    }
    return sourceElementState
}