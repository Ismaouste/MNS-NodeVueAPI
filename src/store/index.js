import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import config from "@/config/page";

// Create a new store instance.
const store = new Vuex.Store({
  state: {
    page: 1,
    todos: [
      {
        id: 1,
        done: false,
        description: "Ajouter une todo avec Vue",
      },
      {
        id: 2,
        done: true,
        description: "Design de ma Todo",
      },
    ],
  },
  getters: {
    paginatedTodos(state) {
      return state.todos.slice(
          (state.page - 1) * config.PAGE_SIZE,
          (state.page - 1) * config.PAGE_SIZE + config.PAGE_SIZE
      );
    },
    percentageDone(state) {
      return `${
          state.todos.length > 0
              ? (
                  (state.todos.filter((todo) => todo.done).length /
                      state.todos.length) *
                  100
              ).toFixed(2)
              : 0
      }%`;
    },
    maxTodoId(state) {
      return Math.max(...state.todos.map((todo) => todo.id));
    },
  },
  mutations: {
    deleteTodo(state, id) {
      state.todos.splice(
          state.todos.findIndex((todo) => todo.id === id),
          1
      );
    },
    addTodo(state, todo) {
      if (todo) {
        state.todos.unshift(todo);
      }
    },
    editTodo(state, updatedTodo) {
      const todoToEditIndex = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
      );
      console.log(todoToEditIndex, updatedTodo);
      if (todoToEditIndex > -1)
        state.todos.splice(todoToEditIndex, 1, updatedTodo);
    },
    toggleDone(state, id) {
      const todoToEdit = state.todos.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.done = !todoToEdit.done;
      }
    },
    selectPage(state, page) {
      state.page = page;
    },
    loadTodos(state) {
      axios.get("http://localhost:3000/api/v1/todos").then((res) => {
        state.todos = res.data;
        (res.data)
      });
    },
  },
  actions: {
    deleteTodo({commit}, id) {
      commit("deleteTodo", id);
    },
    addTodo({commit, getters}, description) {
      commit("addTodo", {
        description,
        id: getters.maxTodoId + 1,
        done: false,
      });
    },
    editTodo({commit}, todo) {
      console.log(todo);
      commit("editTodo", todo);
    },
    toggleDone({commit}, id) {
      commit("toggleDone", id);
    },
    selectPage({commit}, page) {
      commit("selectPage", page);
    },
    LoadTodos({commit}) {
      commit("loadTodos");
    }
  }
});

export default store;
