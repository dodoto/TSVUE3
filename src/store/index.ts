import { createStore } from 'vuex'

interface TestState {
  todos: number[]
}

function delay():any {
  return new Promise((resolve,reject) => {
    setTimeout(function() {
      console.log('resolve')
      resolve(1)
    },2000)
  })
}

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    ADDTODO(state:TestState,payload) {
      state.todos.push(payload)
    },
    DELETETODO(state,payload) {
      state.todos.splice(payload,1)
    }
  },
  actions: {
    async addTodo(ctx,payload) {
      if(!payload) {
        payload = await delay()
      }
      ctx.commit('ADDTODO',payload)
      return '请求结果'
    },
    deleteTodo(ctx,payload = 0) {
      ctx.commit('DELETETOD',payload)
    }
  },
  getters: {
    todosLen(state) {
      return state.todos.length
    }
  },
  modules: {
  }
})
