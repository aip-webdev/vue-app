import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
    cartProductsCount() {
      return this.products
        .reduce((count, productInfo) => count + productInfo.amount, 0);
    },
  },
};
