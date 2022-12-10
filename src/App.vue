<template>
  <main id="app">
    <header>
      <section>
        <h1>EggDentifier

          <button class="version-toggle" @click.prevent="toggleVersion">Monster Hunter Stories {{version}}</button>
        </h1>
      </section>
    </header>
    
    <template v-if="version == 1">
      <StoriesOne/>
    </template>
    <template v-else>
      <StoriesTwo/>
    </template>
    
    <footer>
      <section>stupid cat &copy; {{copyright}}</section>
    </footer>
  </main>
</template>

<script>
import StoriesOne from "@/components/StoriesOne.vue";
import StoriesTwo from "@/components/StoriesTwo.vue";

export default {
  components: { StoriesOne, StoriesTwo },
  data() {
    return {
      version: 1
    }
  },
  mounted() {
    if (localStorage.getItem('version')) {
      this.version = Number(localStorage.getItem('version'));
    }
  },
  watch: {
    version() {
      localStorage.setItem('version', this.version);
    }
  },
  computed: {
    copyright() {
      let date = new Date();
      let start = 2019;
      let year = date.getFullYear();
      if (year !== start) {
        return `${start}-${year}`;
      }
      return start.toString();
    }
  },
  methods: {
    toggleVersion() {
      if (this.version == 1) {
        this.version = 2;
      } else {
        this.version = 1;
      }
    }
  }
}
</script>