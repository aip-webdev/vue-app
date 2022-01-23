<template>
  <div>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" to="/">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <ProductWordVariants :cart-products-count="cartProductsCount"/>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link
            v-show="cartProductsCount > 0"
            tag="button"
            :to="{name: 'order'}"
            class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import cartProductInfo from '@/mixins/cartProductInfo';
import ProductWordVariants from '@/components/ProductWordVariants.vue';
import CartItem from '../components/CartItem.vue';
import numberFormat from '../helpers/numberFormatter';

export default {
  name: 'CartPage',
  filters: {
    numberFormat,
  },
  components: {
    ProductWordVariants,
    CartItem,
  },
  mixins: [cartProductInfo],
};
</script>

<style scoped>

</style>
