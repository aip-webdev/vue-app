<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              title="ФИО"
              placeholder="Введите ваше полное имя"
              :error="formError.name"
              v-model="formData.name"
            />

            <BaseFormText
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              :error="formError.address"
              v-model="formData.address"
            />

            <BaseFormText
              title="Телефон"
              type="phone"
              placeholder="Введите ваш телефон"
              :error="formError.phone"
              v-model="formData.phone"
            />

            <BaseFormText
              title="Email"
              type="email"
              placeholder="Введите ваш Email"
              :error="formError.email"
              v-model="formData.email"
            />

            <BaseFormTextArea
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              :error="formError.comment"
              v-model="formData.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio" name="delivery"
                    value="0"
                    checked=""
                  >
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <CartProductList
          :total-price="totalPrice"
          :products="products"
          :cart-products-count="cartProductsCount">
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </CartProductList>

        <div
          v-if="formErrorMessage"
          class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import cartProductInfo from '@/mixins/cartProductInfo';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextArea from '@/components/BaseFormTextArea.vue';
import CartProductList from '@/components/CartProductList.vue';

export default {
  name: 'OrderPage',
  components: { CartProductList, BaseFormTextArea, BaseFormText },
  mixins: [cartProductInfo],
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      return axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({
            name: 'orderInfo',
            params: {
              id: response.data.id,
            },
          });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
};
</script>

<style scoped>

</style>
