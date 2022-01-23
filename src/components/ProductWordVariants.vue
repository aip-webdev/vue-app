<template>
  <span
  v-if="cartProductsCount%10 === 1 && cartProductsCount !== 11"
  class="content__info"
  >
    <b>{{ cartProductsCount }} товар</b>
  </span>
  <span
    v-else-if="cartProductsCount%10 > 1 && cartProductsCount%10 < 5 && (cartProductsCount < 10
        || cartProductsCount > 20)"
    class="content__info"
  >
    <b>{{ cartProductsCount }} товарa</b>
  </span>
  <span v-else class="content__info">
    <b>{{ cartProductsCount }} товаров</b>
  </span>
</template>

<script>

export default {
  name: 'ProductWordVariants',
  props: {
    cartProductsCount: {
      type: Number,
    },
  },
};
</script>

<style scoped>

</style>
