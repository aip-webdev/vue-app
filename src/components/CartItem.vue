<template>
  <li
    class="cart__item product"
    :key="item.productId"
  >
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120"
           alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>

    <ProductCounter
      class="product__counter form__counter"
      :count="item.amount"
      :size="10"
      :changeCount="updateProductCount"
    />

    <b class="product__price">
      {{ item.product.price * item.amount | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteCartProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import ProductCounter from './ProductCounter.vue';
import numberFormat from '../helpers/numberFormatter';

export default {
  name: 'CartItem',
  components: { ProductCounter },
  filters: {
    numberFormat,
  },
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteCartProduct']),
    updateProductCount(count) {
      this.updateCartProductAmount({ productId: this.item.productId, amount: count });
    },
  },
};
</script>

<style scoped>

</style>
