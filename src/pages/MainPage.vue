<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>

      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="priceFrom"
        :category-id.sync="categoryId"
        :color-id.sync="colorId"
        :price-to.sync="priceTo"
        :colors="colors"></ProductFilter>

      <section class="catalog">
        <div v-if="productsLoading">Подождите, идёт загрузка товаров...</div>
        <div v-if="productsLoadingFailed">Ошибка при загрузке товаров.
          <button @click.prevent="loadProducts">Попробовать ещё раз</button>
        </div>
        <ProductList
          :products="products"
        ></ProductList>

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage">
        </BasePagination>
      </section>
    </div>
  </main>
</template>

<script>
import ProductFilter from '@/components/ProductFilter.vue';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {

  components: { ProductFilter, ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 6,
      priceFrom: 0,
      priceTo: 0,
      categoryId: 0,
      colorId: 0,
      colorsData: null,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    colors() {
      return this.productsData ? this.colorsData.items : [];
    },

    products() {
      return this.productsData ? this.productsData.items
        .map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => { this.colorsData = response.data; });
    },
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.categoryId,
              colorId: this.colorId,
              minPrice: this.priceFrom,
              maxPrice: this.priceTo,
            },
          })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    priceFrom() {
      this.loadProducts();
    },
    priceTo() {
      this.loadProducts();
    },
    categoryId() {
      this.loadProducts();
    },
    colorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
    this.loadColors();
  },

};
</script>

<style scoped>

</style>
