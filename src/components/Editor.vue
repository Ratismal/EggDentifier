<template>
  <div class="monster-editor">
    <h2>Monster Editor</h2>
    <label>Name</label>
    <input v-model="monster.name" />
    <label>Location</label>
    <div class="color-wrapper">
      <select v-model="monster.location">
        <option v-for="location in d.locations" :key="location" :value="location">{{location}}</option>
      </select>
      <select v-model="monster.rank">
        <option value="low">Low</option>
        <option value="high">High</option>
        <option value="na">Special</option>
      </select>
    </div>
    <label>Type</label>
    <select v-model="monster.pattern">
      <option v-for="(pattern, key) in d.patterns" :key="key" :value="key">{{pattern.name}}</option>
    </select>
    <label>Color Sync</label>
    <select v-model="sync">
      <option :value="true">true</option>
      <option :value="false">false</option>
    </select>
    <label>Egg Color</label>
    <div class="color-wrapper">
      <color-picker v-model="monster.back[0]" :d="d" @sync="doSync(1, 'back', $event)" />
      <color-picker v-model="monster.back[2]" :d="d" @sync="doSync(3, 'back', $event)" />
    </div>
    <div class="color-wrapper">
      <color-picker v-model="monster.back[1]" :d="d" />
      <color-picker v-model="monster.back[3]" :d="d" />
    </div>
    <label>Pattern Color</label>
    <div class="color-wrapper">
      <color-picker v-model="monster.front[0]" :d="d" @sync="doSync(2, 'front', $event)" />
      <color-picker v-model="monster.front[1]" :d="d" @sync="doSync(3, 'front', $event)" />
    </div>
    <div class="color-wrapper">
      <color-picker v-model="monster.front[2]" :d="d" />
      <color-picker v-model="monster.front[3]" :d="d" />
    </div>
    <h2>Preview</h2>
    <monster :d="d" :monster="monster" />
    <h2>Output</h2>
    <pre><code>{{raw}}</code></pre>
  </div>
</template>

<script>
import Monster from "@/components/Monster.vue";
import ColorPicker from "@/components/ColorPicker.vue";

export default {
  components: { Monster, ColorPicker },
  props: {
    d: Object
  },
  data() {
    return {
      monster: {
        name: "Aptonoth",
        location: "Pondry Hills",
        pattern: "herbivore",
        rank: "low",
        back: ["green", "green", "pink", "pink"],
        front: ["grey", "orange", "grey", "orange"]
      },
      mounted: false,
      sync: true
    };
  },
  methods: {
    doSync(i, type, event) {
      console.log("syncing");
      if (this.sync) {
        this.monster[type][i] = event;
      }
    }
  },
  computed: {
    raw() {
      let raw = JSON.stringify(this.monster);
      if (this.mounted) {
        localStorage.inProgress = raw;
        // eslint-disable-next-line
        console.log("persisting");
      }
      return raw;
    }
  },
  mounted() {
    if (localStorage.inProgress) {
      // eslint-disable-next-line
      console.log("loading");
      let obj = JSON.parse(localStorage.inProgress);
      if (typeof obj === "object") this.monster = obj;
    }
    this.mounted = true;
  }
};
</script>