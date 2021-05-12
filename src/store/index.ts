import { createStore } from 'vuex'

interface TestState {
  todos: number[]
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
    addTodo(ctx,payload = 1) {
      ctx.commit('ADDTODO',payload)
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
