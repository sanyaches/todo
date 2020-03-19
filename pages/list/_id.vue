<template>
  <div v-if="!loading" class="note">
    <label>
      <input v-model="note.title" class="note__title">
    </label>
    <ul class="note__todo-list">
      <li v-for="todo in note.todos">
        <label class="note__todo">
          <input
            class="checkbox mr-1"
            v-model="todo.checked"
            type="checkbox"
          >
          <input
            class="input"
            v-model="todo.label"
            type="text"
          >
        </label>
      </li>
    </ul>
    <button
      class="note__todo-list__button button--green cursor-pointer"
      @click="addTodo"
    >
      Add TODO
    </button>

    <div class="note__buttons">
      <button
        class="button--green cursor-pointer note__save"
        @click="saveChanges"
      >
        Save all changes
      </button>
      <button
        class="button--red cursor-pointer note__discard"
        @click="discardChanges"
      >
        Discard changes
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Vue,
    Component
  } from "nuxt-property-decorator"
  import { namespace } from "vuex-class"
  import Confirmation from "~/components/Confirmation.vue";

  const todoStore = namespace('todo');

  @Component({})
  export default class extends Vue {
    @todoStore.Getter private getNotes: any;
    @todoStore.Mutation private setNote: any;

    private loading = true;
    // private oldVersion = {};
    private note = {};

    private mounted() {
      //wait vuex-persistedstate plugin when refresh
      setImmediate(() => {
        if (this.$route.params.id >= this.getNotes.length ) {
          this.$router.push('/404')
        }
        else {
          this.loading = false;
          this.note = JSON.parse(JSON.stringify(this.getNotes[this.$route.params.id]));
        }
      });
    }

    private addTodo() {
      this.note.todos.push({
        label: 'New todo',
        checked: false
      })
    }

    private saveChanges() {
      this.setNote({
        newNote: this.note,
        index: this.$route.params.id
      });
      this.$router.push('/')
    }

    private discardChanges() {
      this.$router.push('/')
    }
  }
</script>

<style scoped lang="scss">
  .note {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 4rem;
    margin: 2rem auto;
    width: 60%;
    background: #f2f2f2;
    border: 4px solid;

    @media screen and (max-width: 1360px) {
      width: 80%;
      padding: 3rem;
    }
    @media screen and (max-width: 980px) {
      width: 90%;
      padding: 2rem;
    }

    &__title {
      font-size: 2rem;
      margin-bottom: 2rem;
      @media screen and (max-width: 980px) {
        font-size: 1.4rem;
      }
    }

    &__todo-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      width: 80%;

      &__button {
        margin-top: 1rem;
        align-self: center;
      }

      @media screen and (max-width: 980px) {
        width: 100%;
        padding-left: 0;

        &__button {
          margin-top: .5rem;
        }
      }
    }

    &__todo {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 1rem;

      .input {
        font-size: 1.4rem;
        width: 100%;
      }

      .checkbox {
        width: 2rem;
        height: 2rem;
      }

      @media screen and (max-width: 980px) {
        .input {
          font-size: 1rem;
        }

        .checkbox {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    &__buttons {
      margin-top: 2rem;
      @media screen and (max-width: 980px){
        margin-top: 1.8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;

        .note__discard {
          margin-top: 1rem;
        }
      }
    }
  }
</style>
