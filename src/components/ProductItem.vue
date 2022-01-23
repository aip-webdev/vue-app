<template>
  <li class="catalog__item" :key="index">
    <router-link class="catalog__pic"
       :to="{name: 'product', params: {id: product.id}}"
    >
      <img :src="product.image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
          {{ product.price | numberFormat}} ₽
    </span>

    <ColorPanel
      v-model.number="currentColorId"
      :colors="product.colors"
      @click.prevent="selectProductColor"
    />

  </li>
</template>

<script>
import goToPage from '../helpers/goToPage';
import ColorPanel from './ColorPanel.vue';
import numberFormat from '../helpers/numberFormatter';

export default {
  components: { ColorPanel },
  data() {
    return {
      currentColorId: 0,
    };
  },
  filters: {
    numberFormat,
  },
  props: {
    product: {
      type: Object,
    },
    index: {
      type: Number,
    },
    productColor: {
      type: Number,
    },
  },
  watch: {
    productColor(color) {
      this.currentColorId = color;
    },
  },
  methods: {
    goToPage,
    selectProductColor() {
      this.$emit('update:productColor', this.currentColorId);
    },
  },
};
</script>

<style scoped>

</style>
