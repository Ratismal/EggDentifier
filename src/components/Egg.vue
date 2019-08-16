<template>
  <div class="egg">
    <div class="overlay" />
    <div class="background" :style="background" />
    <div class="pattern" :style="foreground" />
  </div>
</template>

<script>
export default {
  props: {
    pattern: {
      type: String,
      default: "speckled.png"
    },
    front: {
      type: String,
      default: "#6C5E5C"
    },
    back: {
      type: String,
      default: "#73991C"
    }
  },
  computed: {
    background() {
      return {
        "background-color": this.back
      };
    },
    foreground() {
      return {
        "background-color": this.front,
        "mask-image": `url(/img/eggs/patterns/${this.pattern})`
      };
    }
  }
};
</script>