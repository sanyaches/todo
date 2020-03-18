<template>
  <div
    v-if="show"
    class="confirmation"
  >
    <div class="confirmation__block">
      <h2 class="confirmation__title">
        Confirm '{{ action }}' action?
      </h2>
      <div class="confirmation__buttons">
        <button
          class="button--green cursor-pointer"
          @click="confirmAction(true)"
        >
          Confirm
        </button>
        <button
          class="button--red cursor-pointer"
          @click="confirmAction(false)"
        >
          Decline
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Vue,
    Prop,
    Component
  } from "nuxt-property-decorator"
  import { namespace } from "vuex-class"

  const todoStore = namespace('todo');

  @Component({})
  export default class Confirmation extends Vue {
    @Prop() private show: boolean | undefined;
    @Prop() private action: string | undefined;
    @Prop() private index: number | undefined;

    @todoStore.Mutation private deleteNote: any;
    @todoStore.Action private cancelChanges: any;

    private confirmAction(accept: boolean) {
      if (accept) {
        if (this.action === 'delete') {
          this.deleteNote(this.index)
        }
        if (this.action === 'cancel') {
          this.cancelChanges()
        }
      }

      this.$emit('accepted')
    }
  }
</script>

<style scoped lang="scss">
  .confirmation {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000000;

    background-color: rgba(127, 130, 139, .7);

    display: flex;
    align-items: center;

    &__block {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 40%;

      padding: 3rem 0;
      margin: 0 auto;
      border-radius: 20px;

      background-color: #ffffff;
    }

    &__title {
      margin-bottom: 2rem;
    }

    &__buttons {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
