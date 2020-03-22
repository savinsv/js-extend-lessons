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

//Доделанное задание к 3 уроку
let getRequest = (url) => {
  return new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
        //  console.log('Error');
            reject('Error');
        } else {
          //cb(xhr.responseText);
            resolve(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.send();
  })
};

// getRequest(`${API}/catalogData.jsons`).then((respData) => {
//   console.log(respData);
// }).catch((errorData) => {
//   console.log(errorData);
// });
//
// Конец доделанного задания к 3 уроку/

class CartBox {
  constructor(container = '.cart-prod-rows'){
    this.items =[];
    this.container = container;
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
    this.getTolatlRow(itemIdx);
  }

  delItem(product){
    const itemIdx = this.getItem(product);
    if (itemIdx >=0 && this.items[itemIdx].count>1){
      this.items[itemIdx].count--;
      this.getTolatlRow(itemIdx);
    } else{
      this.items.splice(itemIdx,1);
    }
    console.log(this);
    this.render();
  }

  getItem(product){
    for (let i=0;i<this.items.length;i++){
      if (this.items[i].id === product.id){
        return i;
      }
    }
  }
  getTolatlRow(id){
    this.items[id].total = this.items[id].count * this.items[id].price;
    return this.items[id].total;
  }

  getFullTotal(){
    const block = document.querySelector('.col-totalmoney');
    block.innerHTML = this.items.reduce((accum, item) => accum += item.total, 0) + ' \u20bd';
  }

  renderRow(product){
    return `<div class='cart-prod-row'>
              <div class="col-id">${product.id}</div>
              <div class="col-name">${product.title}</div>
              <div class="col-cost">${product.price}</div>
              <div class="col-quantity">${product.count}</div>
              <div class="col-amount">${product.total} \u20bd</div>
              <div class='col-delete'><i class='fas fa-trash-alt'></i></div>
            </div>`;
  }

  dropRows(){
    const block = document.querySelector(this.container);
    block.innerHTML = '';
  }

  getProductById(id){
    for (let item of this.items) {
      if (item.id === id) return item; 
    }
    return null;
  }

  addEvent(){
    const delBtns = document.querySelector(this.container).getElementsByClassName('fa-trash-alt');
    for (let delBtn of delBtns){
      delBtn.addEventListener('click',(event) =>{
        let id =+event.target.parentNode.parentNode.querySelector('.col-id').innerHTML; //dataset.id;
        this.delItem(this.getProductById(id));
      });
    };
  }

  render(){
    this.dropRows();
    const block = document.querySelector(this.container);
    for (let product of this.items) {
      block.insertAdjacentHTML('beforeend', this.renderRow(product));
    }
    this.addEvent();
    this.getFullTotal();
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
        //id содержит идентификатор товара на котором нажали кнопку "Купить"
        const id = +event.target.parentNode.parentNode.dataset.id;
        this.cartBox.addItem(this.getProductById(id));
        this.cartBox.render();
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

//Добавляем слушатель события "click" на кнопку "Корзина"
document.querySelector('.btn-cart').addEventListener('click',(event)=>{
  let showCart = document.querySelector('.cart-body');
 // console.log(getComputedStyle(showCart).visibility);
 if (getComputedStyle(showCart).visibility === 'hidden') {
    showCart.style.visibility = 'visible';
 } else {
    showCart.style.visibility = 'hidden';
 }
});


//Задание урока 4
//Регулярные выражения
const anyText = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;

//console.log(anyText);
//Ищет "'" по всей стоке
let regexp = /'/g;
//"\B'" ищет в начеле и конце строки, а "\s'" ищет одинойные символы
let regexp2 = /\B'|\s'/g;
// console.log(anyText.replace(regexp,'"'));
// console.log();
// console.log(anyText.replace(regexp2,'"'));