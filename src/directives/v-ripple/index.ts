import './index.css'

import DirectiveInterface from '../DirectiveInterface'

const ripple:DirectiveInterface = {
  name: 'ripple',
  config: {
    mounted(el:HTMLElement) {
      el.addEventListener('click',e => {
        
        const { width, height } = el.getBoundingClientRect();
  
        const ripple = document.createElement('span');
        const { classList } = ripple;
        classList.add('ripple');
        const r = Math.max(width, height);
        ripple.style.height = ripple.style.width = r + 'px';
        el.appendChild(ripple)
        const { top, left } = el.getBoundingClientRect() //在执行一次,阻塞一下css
        const style = {
          top: e.pageY - top - r/2 + 'px',
          left: e.pageX - left - r/2  + 'px'
        }
        Object.assign(ripple.style,style)
        classList.add('ripple-active');
        
        setTimeout(function() {
          el.removeChild(ripple);
        },1200)
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

export default ripple

// js 默认对象不包含 迭代器, 如有需要自行添加