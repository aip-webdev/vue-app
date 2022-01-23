<template>
    <ul class="colors" >
      <li class="colors__item" v-for="color in colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.id"
            :checked="color.id === currentColorId"
            @change.prevent="select(color.id)"
          >
          <span class="colors__value" :style={backgroundColor:color.code}></span>
        </label>
      </li>
    </ul>

</template>

<script>
export default {
  model: {
    prop: 'currentColorId',
    event: 'select',
  },
  props: {
    currentColorId: {
      type: Number,
    },
    colors: {
      type: Array,
    },
  },
  methods: {
    select(currentColorId) {
      this.$emit('select', currentColorId);
    },
  },
};
</script>
