<template>
  <main id="app">
    <header>
      <section>
        <h1>EggDentifier</h1>
      </section>
    </header>
    <section>
      <button class="button" @click.prevent="setState('database')">Database</button>
      <button class="button" @click.prevent="setState('editor')">Editor</button>
    </section>
    <section>
      <database :d="data" v-if="state === 'database'" />
      <editor :d="data" v-else-if="state === 'editor'" />
    </section>
    <footer>
      <section>stupid cat &copy; {{copyright}}</section>
    </footer>
  </main>
</template>

<script>
import "@/assets/scss/main.scss";
import Database from "@/components/Database.vue";
import Editor from "@/components/Editor.vue";

import monsters from "@/assets/data/monsters.json";
import colors from "@/assets/data/colors.json";
import patterns from "@/assets/data/patterns.json";
import locations from "@/assets/data/locations.json";

export default {
  name: "app",
  components: { Database, Editor },
  data() {
    return {
      data: { monsters, colors, patterns, locations },
      state: "database"
    };
  },
  mounted() {
    if (localStorage.state) this.state = localStorage.state;
    console.log(this.data);
  },
  methods: {
    setState(state) {
      localStorage.state = state;
      this.state = state;
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
  }
};
</script>
