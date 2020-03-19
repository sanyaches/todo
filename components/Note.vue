<template>
  <div class="note-item">
    <n-link
      :to="'/list/' + index"
      class="note-item__title"
    >
      {{ note.title }}
    </n-link>
    <ul class="note-item__list">
      <li
        v-for="todo in note.todos"
        class="todo-item"
      >
        <label>
          <input type="checkbox" v-model="todo.checked" disabled>
          <span>{{ todo.label }}</span>
        </label>
      </li>
      <li v-if="note.todos.length > 3">More...</li>
    </ul>
    <span
      class="note-item__delete"
      @click="deleteNote(index)"
    >
      <i class="fas fa-times fa-2x"></i>
    </span>
  </div>
</template>

<script lang="ts">
  import {
    Vue,
    Component,
    Prop
  } from "nuxt-property-decorator"
  import { namespace } from "vuex-class"
  import { INote } from "@/interfaces/interfaces";

  const todoStore = namespace('todo');

  @Component({})
  export default class Note extends Vue {
    @Prop() private note: INote | undefined;
    @Prop() private index: number | undefined;

    private deleteNote(index: number) {
      this.$emit('delete-confirm', index)
    }
  }
</script>

<style scoped lang="scss">
  .note-item {
    border: 1px solid #7f828b;
    padding: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: background-color .5s;
    z-index: 1;

    &:hover {
      background-color: #f2f2f2;
      .note-item__delete {
        display: block;
        opacity: 1;
      }
    }

    &__title {
      font-family: "Roboto", "Tahoma", sans-serif;
      font-size: 1.2rem;
      text-align: center;
      color: inherit;
      font-weight: 600;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    &__list {
      list-style: none;
      padding-left: 0;
      padding-top: .65rem;
    }

    &__delete {
      position: absolute;
      display: none;
      top: .5rem;
      right: .5rem;
      cursor: pointer;
    }
  }

  .todo-item {
    text-align: left;
  }
</style>
