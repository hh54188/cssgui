import { v4 as uuidv4 } from 'uuid';
import { createBoxShadowString } from './style';

export function updateAnimationProperty(sourceElementState, key, value) {
    sourceElementState.animation[key] = value;
    return sourceElementState
}

export function updateAnimationAnimatedProperties(sourceElementState, property, value) {
    sourceElementState.animation.animatedProperties[property] = value;
    return sourceElementState
}

export function getStatusByProperties(sourceElementState) {
    const { animation: { animatedProperties } } = sourceElementState;
    const result = [];
    Object.keys(animatedProperties).forEach(property => {
        const value = animatedProperties[property]
        if (!value) {
            return;
        }
        switch (property) {
            case 'size':
                result.push(`width:${sourceElementState.width}px;`);
                result.push(`height:${sourceElementState.height}px`);
                break;
            case 'position':
                result.push(`left:${sourceElementState.left}px;`);
                result.push(`top:${sourceElementState.top}px`);
                break;
            case 'background':
                result.push(`background:${sourceElementState.backgroundColor};`);
                break;
            case 'border': 
                result.push(`border-top: ${!sourceElementState.borderEnabled ? 'none' : `${sourceElementState.border.top.width}px ${sourceElementState.border.top.style} ${sourceElementState.border.top.color}`}`);
                result.push(`border-bottom: ${!sourceElementState.borderEnabled ? 'none' : `${sourceElementState.border.bottom.width}px ${sourceElementState.border.bottom.style} ${sourceElementState.border.bottom.color}`}`);
                result.push(`border-left: ${!sourceElementState.borderEnabled ? 'none' : `${sourceElementState.border.left.width}px ${sourceElementState.border.left.style} ${sourceElementState.border.left.color}`}`);
                result.push(`border-right: ${!sourceElementState.borderEnabled ? 'none' : `${sourceElementState.border.right.width}px ${sourceElementState.border.right.style} ${sourceElementState.border.right.color}`}`);
                break;
            case 'boxShadow': 
                result.push(`box-shadow: ${createBoxShadowString(sourceElementState.boxShadow)}`)
                break;
            case 'translate':
                result.push(`transform: translate3d(${sourceElementState.transform.translate.x}px, ${sourceElementState.transform.translate.y}px, ${sourceElementState.transform.translate.z}px)`)
                break;
            case 'scale': 
                result.push(`transform: scale3d(${sourceElementState.transform.scale.x}px, ${sourceElementState.transform.scale.y}px, ${sourceElementState.transform.scale.z}px)`)
                break;
            case 'skew': 
                result.push(`transform: skew(${sourceElementState.transform.skew.x}deg, ${sourceElementState.transform.skew.y}deg)`)
                break;
        }
    })
    return result;
}

export function saveAnimationStartStatus(sourceElementState, status) {
    sourceElementState.animation.animationTimeline[0] = status;
    return sourceElementState
}

export function saveAnimationEndStatus(sourceElementState, status) {
    sourceElementState.animation.animationTimeline[1] = status;
    return sourceElementState
}

export function playAnimation(sourceElementState) {
    const { animation: { animationTimeline } } = sourceElementState;
    if (!animationTimeline.length) {
        return;
    }
    const [start, end] = animationTimeline;
    const name = `animation_${uuidv4()}`;
    const head = document.head;
    const style = document.createElement('style');
    style.id = name;
    const css = `@keyframes ${name} {
        from {
            ${start.join(';')}
        }
        to {
            ${end.join(';')}
        }
      }`
    head.appendChild(style)
    style.appendChild(document.createTextNode(css));
    sourceElementState.animation.name = name;
    return sourceElementState
}

export function stopAnimation(sourceElementState) {
    const { animation: { name } } = sourceElementState;
    if (!name) {
        return;
    }
    const style = document.querySelector(`#${name}`);
    style.parentElement.removeChild(style);
    sourceElementState.animation.name = '';
    return sourceElementState
}