<template>
  <div v-if="!loading" class="note">
    <label class="note__label">
      <input v-model="note.title" class="note__title">
      <button
        class="button--red cursor-pointer ml-1"
        @click="confirmDelete"
      >
        Delete
      </button>
    </label>
    <ul class="note__todo-list">
      <li v-for="(todo, index) in note.todos" :key="index">
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
          <i
            title="Delete todo"
            class="fas fa-trash ml-1 trash cursor-pointer"
            @click="deleteTodo(index)"
          />
        </label>
      </li>
    </ul>
    <button
      class="note__todo-list__button button--green cursor-pointer"
      @click="addTodo"
    >
      <i class="fas fa-plus"></i>
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
        @click="confirmationDiscardChanges"
      >
        Discard changes
      </button>
    </div>
    <Confirmation
      :show="showModalConfirm"
      :action="modalAction"
      :index="$route.params.id"
      @accepted="discardChanges"
    />
  </div>
</template>

<script lang="ts">
  import {
    Vue,
    Component
  } from "nuxt-property-decorator"
  import { namespace } from "vuex-class"
  import Confirmation from "~/components/Confirmation.vue";
  import Note from "~/components/Note.vue";

  const todoStore = namespace('todo');

  @Component({
    components: {
      Confirmation
    }
  })
  export default class extends Vue {
    @todoStore.Getter private getNotes: any;
    @todoStore.Mutation private setNote: any;
    @todoStore.Mutation private deleteNote: any;

    private loading: boolean = true;
    private note: object = {};
    private showModalConfirm: boolean = false;
    private modalAction: string = '';

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

    private deleteTodo(indexStart: number) {
      this.note.todos.splice(indexStart,1)
    }

    private saveChanges() {
      this.setNote({
        newNote: this.note,
        index: this.$route.params.id
      });
      this.$router.push('/')
    }

    private confirmDelete() {
      this.showModalConfirm = true;
      this.modalAction = 'delete';
    }

    private confirmationDiscardChanges() {
      this.modalAction = 'discard';
      this.showModalConfirm = true;
    }

    private discardChanges(accept: boolean) {
      this.showModalConfirm = false;
      if (accept) this.$router.push('/')
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

    &__label {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;

      @media screen and (max-width: 480px) {
        flex-direction: column;
        justify-content: center;

        .button--red.ml-1 {
          margin-left: 0;
          margin-top: 1rem;
        }
      }
    }

    &__title {
      font-size: 2rem;

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

      .trash {
        transition: color .6s;

        &:hover {
          color: #991111;
        }
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
