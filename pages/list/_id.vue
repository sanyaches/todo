<template>
  <h1>HELLO, {{ $route.params.id }}</h1>
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

    private mounted() {
      //wait vuex-persistedstate plugin when refresh
      setImmediate(() => {
        if (this.$route.params.id >= this.getNotes.length ) {
          this.$router.push('/404')
        }
      })

    }
  }
</script>

<style scoped lang="scss">

</style>
