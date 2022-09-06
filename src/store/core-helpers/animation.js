import { useUIStore } from '../ui'
import { produce } from 'immer'
import {v4 as uuidv4} from "uuid";
import {createBoxShadowString} from "../../utils";

export function factory(set, get) {
  return {
    updateAnimationProperty(key, value) {
      const targetId = useUIStore.getState().targetId;
      if (!targetId) {
        return;
      }
      set(produce((state) => {
        state.elementCollection[targetId].animation[key] = value
      }));
    },
    updateAnimationAnimatedProperties(property, value) {
      const targetId = useUIStore.getState().targetId;
      if (!targetId) {
        return;
      }
      set(produce((state) => {
        state.elementCollection[targetId].animation.animatedProperties[property] = value
      }));
    },
    saveAnimationStartStatus(status) {
      const targetId = useUIStore.getState().targetId;
      if (!targetId) {
        return;
      }
      set(produce((state) => {
        state.elementCollection[targetId].animation.animationTimeline[0] = status
      }));
    },
    saveAnimationEndStatus(status) {
      const targetId = useUIStore.getState().targetId;
      if (!targetId) {
        return;
      }
      set(produce((state) => {
        state.elementCollection[targetId].animation.animationTimeline[1] = status;
      }));
    },
    stopAnimation() {
      const targetId = useUIStore.getState().targetId;
      if (!targetId) {
        return;
      }
      set(produce((state) => {
        const { animation: { name } } = state.elementCollection[targetId];
        if (!name) {
          return;
        }
        const style = document.querySelector(`#${name}`);
        style.parentElement.removeChild(style);
        state.elementCollection[targetId].animation.name = '';
      }));
    },
    playAnimation() {
      const targetId = useUIStore.getState().targetId;
      if (!targetId) {
        return;
      }
      set(produce((state) => {
        const { animation: { animationTimeline } } = state.elementCollection[targetId];
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
        state.elementCollection[targetId].animation.name = name;
      }));
    },
    getStatusByProperties() {
      const result = [];
      const targetId = useUIStore.getState().targetId;
      if (!targetId) {
        return;
      }
      const sourceElementState = get().elementCollection[targetId];
      const { animation: { animatedProperties } } = sourceElementState;
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
  }
}

