<template>
  <div class="monster-editor">
    <h2>Monster Editor</h2>
    <label>Name</label>
    <input v-model="monster.name" />
    <label>Location</label>
    <div class="locations">
      <div class="location" v-for="(location, i) in monster.locations" :key="i">
        <select v-model="location.location">
          <option v-for="loc in d.locations" :key="loc" :value="loc">{{loc}}</option>
        </select>
        <label>
          <input type="checkbox" v-model="location.postGame">
          <span>Post-Game</span>
        </label>
        <button class="button remove" @click.prevent="removeLocation(i)">Remove</button>
      </div>

      <button class="button add" @click.prevent="addLocation">Add Location</button>
    </div>
    <label>Type</label>
    <select v-model="monster.pattern">
      <option v-for="(pattern, key) in d.patterns" :key="key" :value="key">{{pattern.name}}</option>
    </select>
    <label>Egg Color / Pattern Color</label>
    <div class="color-wrapper">
      <color-picker v-model="monster.back" :d="d" />
      <color-picker v-model="monster.front" :d="d" />
    </div>
    <h2>Preview</h2>
    <monster :d="d" :monster="monster" />
    <h2>Output</h2>
    <pre><code>{{raw}}</code></pre>
  </div>
</template>

<script>
import Monster from "@/components/two/Monster.vue";
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
        locations: [{location: "Loloska", postGame: false}],
        pattern: "herbivore",
        rank: "low",
        back: "green",
        front: "black"
      },
      mounted: false,
    };
  },
  methods: {
    addLocation() {
      this.monster.locations.push({ location: "Loloska", postGame: false });
    },
    removeLocation(i) {
      this.monster.locations.splice(i, 1);
    }
  },
  computed: {
    raw() {
      let raw = JSON.stringify(this.monster);
      if (this.mounted) {
        localStorage.inProgress2 = raw;
        // eslint-disable-next-line
        console.log("persisting");
      }
      const name = this.monster.name.split(' ');
      name[0] = name[0].toLowerCase();
      const key = name.join('');
      return `"${key}":${raw}`;
    }
  },
  mounted() {
    if (localStorage.inProgress2) {
      // eslint-disable-next-line
      console.log("loading");
      let obj = JSON.parse(localStorage.inProgress2);
      if (typeof obj === "object") this.monster = obj;
    }
    this.mounted = true;

    console.log(this.monster);
  }

};
</script>