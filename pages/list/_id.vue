<template>
  <div
    v-if="!loading"
    class="note"
    @keydown.ctrl.90.exact.prevent="undo"
    @keydown.meta.90.exact.prevent="undo"
    @keydown.ctrl.shift.90.exact.prevent="redo"
    @keydown.meta.shift.90.exact.prevent="redo"
  >
    <div class="mb-1">
      <button
        class="cursor-pointer button"
        :title=" (!getTopRedo || isInitRedo) ? 'No cancel': 'Cancel change'"
        :class="{ 'button--disable': !getTopRedo || isInitRedo }"
        :disabled="!getTopRedo || isInitRedo"
        @click="undo"
      >
        <i class="fas fa-undo fa-2x"></i>
      </button>
      <button
        class="cursor-pointer button ml-1"
        :title="!getTopUndo ? 'No repeat': 'Repeat change'"
        :class="{ 'button--disable': !getTopUndo }"
        :disabled="!getTopUndo"
        @click="redo"
      >
        <i class="fas fa-redo fa-2x"></i>
      </button>
    </div>
    <label class="note__label">
      <input @input="changeTitle($event.target.value)" :value="getTopRedo.title" class="note__title">
      <button
        class="button--red cursor-pointer ml-1"
        @click="confirmDelete"
      >
        Delete
      </button>
    </label>
    <ul class="note__todo-list">
      <li
        v-for="(todo, index) in getTopRedo.todos"
        :key="index"
        class="note__todo"
        @mouseover="setIndexTodo(index)"
      >
        <label class="note__todo__label">
          <input
            class="checkbox mr-1"
            @change="checkTodo"
            :checked="todo.checked"
            type="checkbox"
          >
          <input
            class="input"
            @input="changeLabelTodo($event.target.value)"
            :value="todo.label"
            type="text"
          >
        </label>
        <i
          title="Delete todo"
          class="fas fa-trash ml-1 trash cursor-pointer"
          @click="deleteTodo(index)"
        />
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
      :index="getIndex"
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
    @todoStore.Getter private isInitRedo: any;
    @todoStore.Getter private getTopRedo: any;
    @todoStore.Getter private getTopUndo: any;
    @todoStore.Getter private getIndex: any;

    @todoStore.Mutation private setNote: any;
    @todoStore.Mutation private deleteNote: any;
    @todoStore.Mutation private undo: any;
    @todoStore.Mutation private redo: any;
    @todoStore.Mutation private setIndex: any;
    @todoStore.Mutation private setIndexTodo: any;

    @todoStore.Action private initRedoStack: any;
    @todoStore.Action private checkTodo: any;
    @todoStore.Action private changeLabelTodo: any;
    @todoStore.Action private changeTitle: any;
    @todoStore.Action private addChange: any;


    private loading: boolean = true;
    private showModalConfirm: boolean = false;
    private modalAction: string = '';

    private created() {
      this.setIndex(this.$route.params.id)
    }

    private beforeMount() {
      const that = this;
      document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'z') {
          event.preventDefault();
          that.undo();
        }
        if (event.metaKey && event.key === 'z') {
          event.preventDefault();
          that.undo();
        }
        if (event.ctrlKey && event.key === 'Z') {
          event.preventDefault();
          that.redo();
        }
        if (event.metaKey && event.key === 'Z') {
          event.preventDefault();
          that.redo();
        }
      });
    }

    private mounted() {
      //wait vuex-persistedstate plugin when refresh
      setImmediate(() => {
        if (this.getIndex >= this.getNotes.length ) {
          this.$router.push('/404')
        }
        else {
          this.loading = false;
          this.initRedoStack(this.getNotes[this.getIndex])
        }
      });
    }

    private addTodo() {
      this.$store.dispatch('todo/addTodo', {
        label: 'New todo',
        checked: false
      })
    }

    private deleteTodo(indexStart: number) {
      this.$store.dispatch('todo/deleteTodo', indexStart)
    }

    private saveChanges() {
      this.setNote(this.getTopRedo);
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

      &__label {
        display: flex;
        align-items: center;
        width: 100%;
      }

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
