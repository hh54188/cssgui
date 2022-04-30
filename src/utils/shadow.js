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