<template>
  <div class="monster">
    <span class="monster-name">{{monster.name}}</span>
    <span class="monster-type">
      <strong>Type:</strong>
      {{d.patterns[monster.pattern].name}}
    </span>
    <div class="monster-locations">
      <strong>Location:</strong>
      <div class="monster-location" v-for="(location, i) in monster.locations" :key="i">
        - {{location.location}}
        <template v-if="location.postGame">(Post-Game)</template>
      </div>
    </div>
    <div class="eggs">
      <div class="egg-wrapper">
        <egg v-bind="monsterEggs(monster)" />
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
        locations: [{location: "Loloska", postGame: false}],
        pattern: "herbivore",
        rank: "low",
        back: "green",
        front: "black"
      })
    }
  },
  data() {
    return {};
  },
  methods: {
    monsterEggs(monster) {
      let egg = {
          pattern: this.d.patterns[monster.pattern].src,
          back: this.d.colors[monster.back].value,
          front: this.d.colors[monster.front].value
      };
      return egg;
    }
  }
};
</script>