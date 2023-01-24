import { createApp } from 'vue/dist/vue.esm-browser.prod'
import autoComplete from '@tarekraafat/autocomplete.js'

createApp({
  data() {
    return {
      from: '',
      to: ''
    }
  },
  mounted: function () {
    const data = {
      src: async (query) => {
        try {
          // Fetch Data from external Source
          //const source = await fetch(`https://www.api.com/${query}`);

          // Data is array of `Objects` | `Strings`
          //const asyncData = await source.json();

          return ['Berlin, Germany', 'Paris, France', 'London, United Kingdom'];
        } catch (error) {
          return error;
        }
      },
      cache: true
    };

    let _this = this;

    ['from', 'to'].forEach(function (ref) {
      let elemID = '#' + _this.$refs[ref].id;

      new autoComplete({
        selector: elemID,
        wrapper: false,
        data,
        resultsList: {
          tag: "div",
          class: "search-route__results menu-list",
          maxResults: 5,
        },
        resultItem: {
          tag: "div",
          class: "menu-list__item"
        },
      })

      document.querySelector(elemID).addEventListener("selection", function (event) {
        _this[ref] = event.detail.selection.value
      })
    })
  },
  methods: {
    swap() {
      [this.from, this.to] = [this.to, this.from]
    },
    submit() {
      if (this.from && this.to) {
        alert('from: ' + this.from + '\r\n' + 'to: ' + this.to)
      }
    }
  }
}).mount('#search-route')
