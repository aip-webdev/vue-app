<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="product in products"
      :product="product"
      :key="product.id"
      :product-color.sync="productColorId"
    />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  data() {
    return {
      productColorId: 0,
    };
  },
  props: {
    products: {
      type: Array,
    },
  },
  components: { ProductItem },
};
</script>

<style scoped>

</style>
