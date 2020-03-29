Vue.component('search',{
    data(){
        return {
            userSearch: '',
            filtred: [],
        }
    },
    methods: {
        getFilter(items){
            let regexp = new RegExp(this.userSearch, 'i');
            //this.filtered = this.products.filter(el => regexp.test(el.product_name));
            return items.filter(el => regexp.test(el.product_name));
            //console.log(this.$root.refs.products);
        }
    },
    template:`<form action="#" class="search-form" ref="products" @submit.prevent="$root.refs.products.filter()">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
              </form>`

});