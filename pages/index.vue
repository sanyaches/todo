<template>
  <div class="container notes">
    <h1 class="notes__title">Todo List</h1>
    <div class="notes-wrapper">
      <div
        class="note"
        v-for="(note, index) in getNotes"
        :key="index"
      >
        <Note
          :note="note"
          :index="index"
          @delete-confirm="confirmDelete"
        />
      </div>
    </div>
    <button class="notes__button button--green" @click="addNote">Add Note</button>
    <Confirmation
      :show="showModalConfirm"
      :action="modalAction"
      :index="indexNote"
      @accepted="showModalConfirm = false"
    />
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from "nuxt-property-decorator";
  import { namespace } from "vuex-class"
  import Note from "@/components/Note.vue";
  import Confirmation from "~/components/Confirmation.vue";

  const todoStore = namespace('todo');

  @Component({
    components: {
      Confirmation,
      Note
    }
  })
  export default class IndexPage extends Vue {
    @todoStore.Action private addNote: any;
    @todoStore.Getter private getNotes: any;
    @todoStore.Action private saveNotes: any;
    @todoStore.Mutation private deleteNote: any;

    private showModalConfirm = false;
    private modalAction: string = '';
    private indexNote: number = 0;

    private confirmDelete(index: number) {
      this.showModalConfirm = true;
      this.modalAction = 'delete';
      this.indexNote = index
    }
  }
</script>

<style lang="scss">
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .notes {
    &-wrapper {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      grid-gap: 1rem;
      width: 60%;

      @media screen and (max-width: 1360px) {
        grid-template-columns: 50% 50%;
      }
      @media screen and (max-width: 980px) {
        grid-template-columns: 100%;
        width: 90%;
      }
    }

    &__title {
      margin: 1rem 0;
    }

    &__button {
      margin: 2rem 0 3rem;
      cursor: pointer;
    }
  }


  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
