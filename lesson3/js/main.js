const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };
class CartBox {
  constructor(){
    this.items =[];
  }

  addItem(product){
    let itemIdx = this.getItem(product);
    if (itemIdx >=0 && this.items[itemIdx].count>=1){
      this.items[itemIdx].count++;
    } else {
      this.items.push(product);
      itemIdx = this.getItem(product);
      this.items[itemIdx].count = 1;
    }
  }
  delItem(product){
    const itemIdx = this.getItem(product);
    if (itemIdx >=0 && this.items[itemIdx].count>1){
      this.items[itemIdx].count--;
    } else{
      this.items.slice(itemIdx,1);
    }
  }
  getItem(product){
    for (let i=0;i<this.items.length;i++){
      if (this.items[i].id === product.id){
        return i;
      }
    }
  }
}

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.cartBox = new CartBox();
    this.allProducts = [];
    // this._fetchProducts();
    this._getProducts()
        .then((data) => {
            this.goods = [...data];
            this.render();
            this.addListener();
        });
  }

  // _fetchProducts() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     this.goods = JSON.parse(data);
  //     this.render();
  //     console.log(this.goods);
  //   });
  // }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(result => result.json())
        .catch(error => {
          console.log('Error!', error);
        });
  }

  calcSum(){
    return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
  
  /**
   * Вернет по id объект товара или null
   * @param {integer} id
   * @return {object} ProductItem
   */
  getProductById(id){
    for (let item of this.allProducts) {
      if (item.id === id) return item; 
    }
    return null;
  }

  /**
   * Добавим событие click кнопкам товара на странице
   */
  addListener() {
    const buttons = document.querySelector(this.container).getElementsByClassName('buy-btn');
    for (let i=0;i<buttons.length;i++){
      buttons[i].addEventListener('click',()=>{
        //id содержит идентификатор товара
        const id = +event.target.parentNode.parentNode.dataset.id;
        this.cartBox.addItem(this.getProductById(id));
        //console.log(this.cartBox);
      });
    }
   // console.log(buttons);
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

new ProductList();

