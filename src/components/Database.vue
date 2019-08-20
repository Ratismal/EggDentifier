<template>
  <div class="monster-database">
    <h2>Filter</h2>
    <label>Name</label>
    <input v-model="filter.name" />
    <label>Location</label>
    <div class="color-wrapper">
      <select v-model="filter.location">
        <option value></option>
        <option v-for="location in d.locations" :key="location" :value="location">{{location}}</option>
      </select>
      <select v-model="filter.rank">
        <option value></option>
        <option value="low">Low</option>
        <option value="high">High</option>
        <option value="na">Special</option>
      </select>
    </div>
    <label>Type</label>
    <select v-model="filter.type">
      <option value></option>
      <option v-for="(pattern, key) in d.patterns" :key="key" :value="key">{{pattern.name}}</option>
    </select>
    <label>Egg Color | Pattern Color</label>
    <div class="color-wrapper">
      <color-picker v-model="filter.back" :d="d" :blank="true" />
      <color-picker v-model="filter.front" :d="d" :blank="true" />
    </div>
    <h2>Monsters</h2>
    <monster
      class="monster"
      v-for="monster in monsters"
      :key="monster.name"
      :d="d"
      :monster="monster"
    />
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
      filter: {
        back: null,
        front: null,
        type: null,
        location: null,
        rank: null,
        name: null
      }
    };
  },
  computed: {
    monsters() {
      return Object.values(this.d.monsters).filter(m => {
        if (this.filter.back && !m.back.includes(this.filter.back))
          return false;
        if (this.filter.front && !m.front.includes(this.filter.front))
          return false;
        if (this.filter.rank && m.rank !== this.filter.rank) return false;
        if (this.filter.location && m.location !== this.filter.location)
          return false;
        if (this.filter.type && m.pattern !== this.filter.type) return false;
        if (
          this.filter.name &&
          !m.name.toLowerCase().includes(this.filter.name.toLowerCase())
        )
          return false;
        return true;
      });
    }
  },
  methods: {
    monsterEggs(monster) {
      let eggs = [];
      for (let i = 0; i < 4; i++) {
        let egg = {
          i,
          pattern: this.d.patterns[monster.pattern].value,
          back: this.d.colors[monster.back[i < 2 ? 0 : 1]].value,
          front: this.d.colors[monster.front[i % 2]].value
        };
        eggs.push(egg);
      }
      return eggs;
    }
  }
};
</script>