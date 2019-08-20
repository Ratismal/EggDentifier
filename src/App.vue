<template>
  <main id="app">
    <header>
      <section>
        <h1>EggDentifier</h1>
      </section>
    </header>
    <section>
      <div class="button-group">
        <button class="button" @click.prevent="setState('info')">Info</button>
        <button class="button" @click.prevent="setState('database')">Database</button>
        <button class="button" @click.prevent="setState('editor')">Editor</button>
      </div>
    </section>
    <section>
      <info :d="data" v-if="state === 'info'" />
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
import Info from "@/components/Info.vue";

import monsters from "@/assets/data/monsters.json";
import colors from "@/assets/data/colors.json";
import patterns from "@/assets/data/patterns.json";
import locations from "@/assets/data/locations.json";

export default {
  name: "app",
  components: { Database, Editor, Info },
  data() {
    return {
      data: { monsters, colors, patterns, locations },
      state: "info",
      boundClick: null
    };
  },
  mounted() {
    if (localStorage.state) this.state = localStorage.state;
    console.log(this.data);

    this.boundClick = this.onClick.bind(this);

    document.addEventListener("click", this.boundClick);
  },
  destroyed() {
    document.removeEventListener("click", this.boundClick);
  },
  methods: {
    setState(state) {
      localStorage.state = state;
      this.state = state;
    },
    onClick(event) {
      this.$root.$emit("click", event);
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
