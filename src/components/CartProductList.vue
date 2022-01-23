<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li v-for="item in products" :key="item.product.id" class="cart__order">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.product.price | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого:
        <ProductWordVariants :cart-products-count="cartProductsCount"/> на сумму
        <b>{{ totalPrice | numberFormat }} ₽</b>
      </p>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormatter';
import ProductWordVariants from '@/components/ProductWordVariants.vue';

export default {
  name: 'CartProductList',
  props: {
    totalPrice: {
      type: Number,
    },
    products: {
      type: Array,
    },
    cartProductsCount: {
      type: Number,
    },
  },
  components: {
    ProductWordVariants,
  },
  filters: {
    numberFormat,
  },
};
</script>

<style scoped>

</style>
