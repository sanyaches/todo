<template>
    <n-link
      :to="'/' + index"
      class="note-item"
    >
      <h3 class="note-item__title">{{ note.title }}</h3>
      <ul class="note-item__list">
        <li
          v-for="todo in note.todos"
          class="todo-item"
        >
          <label>
            <input type="checkbox" v-model="todo.checked">
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
    </n-link>
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

@Component({

})
export default class Note extends Vue {
  @Prop() private note: INote | undefined;
  @Prop() private index: number | undefined;

  @todoStore.Mutation private deleteNote: any;
}
</script>

<style scoped lang="scss">
.note-item {
  color: inherit;
  text-decoration: none;
  border: 1px solid #7f828b;
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  transition: background-color .5s;

  &:hover {
    background-color: #f2f2f2;
    .note-item__delete {
      display: block;
      opacity: 1;
    }
  }

  &__title {
    font-family: "Roboto", "Tahoma", sans-serif;
    text-align: center;
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
    z-index: 5;
  }
}

.todo-item {
  text-align: left;
}
</style>
