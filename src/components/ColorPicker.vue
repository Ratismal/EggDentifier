<template>
  <div class="color-picker-wrapper" ref="wrapper">
    <div class="color-picker" @click.prevent="setActive">
      <span class="color-preview" :style="background(currentColor)" />
      <span class="color-name">{{currentColor ? currentColor.name : 'None Selected'}}</span>
    </div>
    <div class="color-dropdown" v-if="active">
      <div class="colors">
        <div class="color">
          <span
            v-if="blank"
            class="color-preview"
            :style="background()"
            @click.prevent="selectColor()"
          />
        </div>
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
      color: this.value,
      boundClick: null
    };
  },
  mounted() {
    this.boundClick = this.onClick.bind(this);
  },
  watch: {
    value(val) {
      this.color = val;
    }
  },
  computed: {
    currentColor() {
      return this.d.colors[this.color];
    }
  },
  destroyed() {
    this.$root.$off("click", this.boundClick);
  },
  methods: {
    onClick(event) {
      console.log(event, event.target);
      if (!event.path.includes(this.$refs.wrapper)) {
        this.setActive();
      }
    },
    background(color) {
      return { "background-color": color ? color.value : "#000000" };
    },
    selectColor(key) {
      this.color = key;
      this.setActive();
      this.$emit("input", this.color);
      this.$emit("sync", this.color);
    },
    setActive() {
      this.active = !this.active;
      this.$root[this.active ? "$on" : "$off"]("click", this.boundClick);
    }
  }
};
</script>