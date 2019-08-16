<template>
  <div class="color-picker-wrapper">
    <div class="color-picker" @click.prevent="active = !active">
      <span class="color-preview" :style="background(currentColor)" />
      <span class="color-name">{{currentColor ? currentColor.name : 'None Selected'}}</span>
    </div>
    <div class="color-dropdown" v-if="active">
      <div class="colors">
        <span
          v-if="blank"
          class="color-preview"
          :style="background()"
          @click.prevent="selectColor()"
        />
        <div class="color" v-for="(color, key) in d.colors" :key="key">
          <span class="color-preview" :style="background(color)" @click.prevent="selectColor(key)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    d: Object,
    value: String,
    blank: Boolean
  },
  data() {
    return {
      active: false,
      color: this.value
    };
  },
  computed: {
    currentColor() {
      return this.d.colors[this.color];
    }
  },
  methods: {
    background(color) {
      return { "background-color": color ? color.value : "#000000" };
    },
    selectColor(key) {
      this.color = key;
      this.active = false;
      this.$emit("input", this.color);
      this.$emit("sync", this.color);
    }
  }
};
</script>