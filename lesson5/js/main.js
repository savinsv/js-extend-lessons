const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    filterText: '', //Свойство содержит строку фильтирации(поиска) товаров
    isVisibleCart: false, //Флаг - отбражается ли корзина
    catalogUrl: '/catalogData.json', //Начальный url каталога товаров
    cartBoxUrl: '/getBasket.json', //Начальный url корзины товаров
    products: [],  // Массив продуктов каталога
    filtredItems: [], //Отфильтрованные товары
    cartItems: [], //массив товаров корзины
    imgProductItem: 'https://placehold.it/200x150', // Заглушка картинки товара каталога
    imgCartItem: 'https://placehold.it/50x70' // Заглушка картинки товара корзины

  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },

// Добавление товара в корзину
    addProduct(item){
      //console.log(product.id_product);
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          //Если вернулся положительный ответ "1"
          if (data.result === 1) {
            //проверяем наличие объекта товара в корзине
            let cartItem = this.cartItems.find(element => element.id_product === item.id_product);
            if (cartItem) {
              //если объект товара имеется в корзине, то увеличиваем количество("quantity")
              cartItem.quantity++;
            } else {
              //Иначе создаем и добавляем новый объект товара в корзину,
              //дополняя объект свойством количество("quantity")
              let newCartItem = Object.assign({quantity: 1}, item);
              this.cartItems.push(newCartItem)
            }
          } else {
            // Получен отрицательный ответ
            console.log(`Error: Answer result: ${data.result}`);
          }
        })
    },

    removeItem(item) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          //Если вернулся положительный ответ "1"
          if (data.result === 1) {
            //проверяем количество("quantity") товара в корзине
            if (item.quantity > 1) {
            //Если больше 1 штуки, то уменьшаем  
              item.quantity--;
            } else {
            //Иначе, удаляем объект товара из массива товаров в корзине  
              this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }
          } else {
            // Получен отрицательный ответ
            console.log(`Error: Answer result: ${data.result}`);
          }
        })
    },
   //Подсчет общей суммы товаров в корзине 
   getTotalCart(){
    return this.cartItems.reduce((accum, item) => accum += item.price*item.quantity, 0) + ' \u20bd';
   }, 
// Фильтрация товаров для вывода на страницу по строке поиска
    filter(){
      let regexp = new RegExp(this.filterText, 'i');
      this.filtredItems = this.products.filter(element => regexp.test(element.product_name));
    }
  },

  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        //Перебераем полученные данные о товарах каталога
        for(let item of data){
          //Добавляем в массив товаров("products")
          this.products.push(item);
        }
        //Заполняем массив filtred для вывода товаров на страницу
        this.filter();
      });
//      console.log(this.filtredItems);
//      console.log(this.products);
  }
  
});
///
