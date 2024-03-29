import BaseFormField from '@/components/BaseFormField.vue';

export default {
  name: 'BaseFormText',
  props: {
    title: {
      type: String,
    },
    error: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
