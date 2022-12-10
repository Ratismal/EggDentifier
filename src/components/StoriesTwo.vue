<template>
  <div class="mhs2">
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
  </div>
</template>

<script>
import "@/assets/scss/main.scss";
import Database from "@/components/two/Database.vue";
import Editor from "@/components/two/Editor.vue";
import Info from "@/components/two/Info.vue";

import monsters from "@/assets/data/two/monsters.json";
import colors from "@/assets/data/two/colors.json";
import patterns from "@/assets/data/two/patterns.json";
import locations from "@/assets/data/two/locations.json";

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
