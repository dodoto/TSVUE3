import { App } from 'vue'
import DirectiveInterface from '../DirectiveInterface'

const drag:DirectiveInterface = {
  name: 'drag',
  config: {
    mounted(el:HTMLElement) {
      let x:number = 0 , y:number = 0
      el.addEventListener('mousedown',e => {
        const { clientX, clientY } = e
        const beginX = clientX - x
        const beginY = clientY - y
        let offsetX:number = 0, offsetY:number = 0; 
        const { offsetLeft:left, offsetTop:top, clientWidth:width, clientHeight:height } = el
        const boundary = {
          left: -left,
          right: innerWidth - width - left,
          top: -top,
          bottom: innerHeight - height - top
        }
        document.onmousemove = e => {
          const { clientX:currentX, clientY:currentY } = e
          offsetX = currentX - beginX
          offsetY = currentY - beginY
          if(offsetX < boundary.left) offsetX = boundary.left
          if(offsetX > boundary.right) offsetX = boundary.right
          if(offsetY < boundary.top) offsetY = boundary.top
          if(offsetY > boundary.bottom) offsetY = boundary.bottom
          el.style.transform = `translate(${offsetX}px,${offsetY}px)`
        }
        document.onmouseup = () => {
          x = offsetX
          y = offsetY
          document.onmousemove = null
          document.onmouseup = null
        }
      })
    }
  },
  [Symbol.iterator]() {
    const self:DirectiveInterface = this;
    let index:number = 0;
    const ary:string[] = Object.keys(self);
    const len = ary.length;
      return {
        next():object {
          if (index < len) {
            return {
              value: self[ary[index++]],
                done: false
              }
          } else {
            return {
              value: self[ary[index++]],
              done: true
          }
        }
      }
    }
  }  
}

export default {
  install: (app:App):void => {
    app.directive(drag.name,drag.config)
  }
}