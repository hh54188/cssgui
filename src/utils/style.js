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

export function createTransformString(transform) {
    const translate3dStr = `translate3d(${transform.translate.x}px, ${transform.translate.y}px, ${transform.translate.z}px)`;
    const scale3dStr = `scale3d(${transform.scale.x}, ${transform.scale.y}, ${transform.scale.z})`;
    const skew3dStr = `skew(${transform.skew.x}deg, ${transform.skew.y}deg)`;
    const rotate3dStr = `rotate3d(${transform.rotate.x}, ${transform.rotate.y}, ${transform.rotate.z})`;
    return `${translate3dStr} ${scale3dStr} ${skew3dStr}`
}

export function createStyleObj(elementState) {
    const border = elementState.border;
    return {
        background: elementState.backgroundColor,
        width: elementState.width,
        height: elementState.height,
        top: elementState.top,
        left: elementState.left,
        position: 'absolute',
        borderTop: !elementState.borderEnabled ? 'none' : `${border.top.width}px ${border.top.style} ${border.top.color}`,
        borderBottom: !elementState.borderEnabled ? 'none' : `${border.bottom.width}px ${border.bottom.style} ${border.bottom.color}`,
        borderLeft: !elementState.borderEnabled ? 'none' : `${border.left.width}px ${border.left.style} ${border.left.color}`,
        borderRight: !elementState.borderEnabled ? 'none' : `${border.right.width}px ${border.right.style} ${border.right.color}`,
        boxShadow: createBoxShadowString(elementState.boxShadow),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: createTransformString(elementState.transform),
        animationDuration: `${elementState.animation.duration}s`,
        animationDelay: `${elementState.animation.delay}s`,
        animationTimingFunction: elementState.animation.timing,
        animationIterationCount: 'infinite',
        animationName: elementState.animation.name,
        zIndex: elementState.zIndex
    }
}
