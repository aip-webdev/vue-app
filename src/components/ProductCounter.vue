<template>
  <div>
    <button type="button" aria-label="Убрать один товар" @click="changeProductCount(amount - 1)">
      <svg :width="buttonSize" :height="buttonSize" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="text"
      v-model.number="amount"
      @change.prevent="changeProductCount(amount)"
    >

    <button type="button" aria-label="Добавить один товар" @click="changeProductCount(amount + 1)">
      <svg :width="buttonSize" :height="buttonSize" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCounter',
  data() {
    return {
      amount: this.count,
    };
  },
  props: {
    size: {
      type: Number,
    },
    count: {
      type: Number,
    },
    changeCount: {
      type: Function,
    },
  },
  computed: {
    buttonSize() {
      return this.size;
    },
  },
  methods: {
    changeProductCount(value) {
      if (value >= 1) {
        this.amount = value;
        this.changeCount(this.amount);
      }
    },
  },
};
</script>

<style scoped>

</style>
