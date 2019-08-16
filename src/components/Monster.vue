<template>
  <div class="monster">
    <span class="monster-name">{{monster.name}}</span>
    <span class="monster-type">
      <strong>Type:</strong>
      {{d.patterns[monster.pattern].name}}
    </span>
    <span class="monster-location">
      <strong>Location:</strong>
      {{monster.location}}
      <template v-if="monster.rank === 'high'">(High Rank)</template>
    </span>
    <div class="eggs">
      <div class="egg-wrapper" v-for="egg in monsterEggs(monster)" :key="egg.i">
        <egg v-bind="egg" />
      </div>
    </div>
  </div>
</template>

<script>
import Egg from "@/components/Egg.vue";

export default {
  components: { Egg },
  props: {
    d: Object,
    monster: {
      type: Object,
      default: () => ({
        name: "Aptonoth",
        location: "Pondry Hills",
        pattern: "herbivore",
        rank: "low",
        back: ["green", "green", "pink", "pink"],
        front: ["grey", "orange", "grey", "orange"]
      })
    }
  },
  data() {
    return {};
  },
  methods: {
    monsterEggs(monster) {
      let eggs = [];
      for (let i = 0; i < 4; i++) {
        let egg = {
          i,
          pattern: this.d.patterns[monster.pattern].src,
          back: this.d.colors[monster.back[i]].value,
          front: this.d.colors[monster.front[i]].value
        };
        eggs.push(egg);
      }
      return eggs;
    }
  }
};
</script>