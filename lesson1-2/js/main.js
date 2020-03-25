class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
        this._render();
        this.total = this.getTotal();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    _addEventListener() {

    }

    /**
     * Возвращает сумму продуктов занесенных в массив allProducts
     */
    getTotal() {
        let total = 0;
        for (let item of this.allProducts){
            total += item.count*item.price;
        }
        return total;
    }
}

class ProductItem {
    constructor(product, img='https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        //По хорошему нужно ещё поле количество единиц текущего товара
        //Чтобы в корзине не плодились строки одного и того же товара
        this.count = 1; 
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <a href="#"><img src="${this.img}"  alt=${this.title}></a>
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

class CartBox {
    constructor(container = '.cartbox'){
        this.items =[];
    }
    //Добавить продукт в корзину. Нужно проверить наличие передаваемого товара в корзине.
    //если товар есть увеличить значение count и пересчитать сумму данного товара.
    addItem(product) {

    }

    //Удалить продук из корзины. При удалении уменшается count до единицы. 
    //Если count равен 1, то элемен удаляется из массива
    delItem(product) {

    }

}

class CartBoxItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.count = product.count;
        this.price = product.price;
        this.total = this.count * this.price;
    }

     /**
     * 
     * @param {string or number} value
     * @return {string} key of property 
     */
    findKey (value){
        for (let key in this){
            if (this[key] === value) return key;
        }
        return null;
    }

    /**
     * @return {string} HTML представение карточки продукта для корзины
     */
    getHTML() {
        let row = '';
        row = `<div class='cart-prod-row'>`;
        for (let element in this) {
            row += `<div class='col-${this.findKey(this[element])}'>${this[element]}</div>`;
        };
        row += `<div class='col-delete'><i class='fas fa-trash-alt'></i></div></div>`;
        return row;    
    }
}

const productList = new ProductList();

console.log(productList.total);

//console.log((new ProductList()).getTotal());
/* ProList = new ProductList();
console.log(ProList.getTotal());
 */
/* const products = [
    {id: 1, img: "http://placehold.it/200x150" , title: 'Notebook', price: 20000},
    {id: 2, img: "http://placehold.it/200x150" , title: 'Mouse', price: 1500},
    {id: 3, img: "http://placehold.it/200x150" , title: 'Keyboard', price: 5000},
    {id: 4, img: "http://placehold.it/200x150" , title: 'Gamepad', price: 4500},
];

const renderProduct = ({id,img,title, price}) => {
    //Добавил id, чтобы потом его не генерить из массива products
    return `<div class="product-item" id="${id}">
                <h3>${title}</h3>
                <a href="#"><img src=${img} alt=${title}></a>
                <h4>${price}</h4>
                <button class="buy-btn">Добавить в корзину</button>
            </div>`;
};

const renderProducts = list => {
    // const productList = list.map(item => renderProduct(item.id,item.title, item.price));
    // let productBox = document.querySelector('.products');
    // productList.forEach(item => {
    //     productBox.insertAdjacentHTML('beforeend',item);
    // }); 

    //Так будет короче, но мало читабильно...
    // list.map(item => renderProduct(item.id,item.title, item.price)).forEach(item => {
    //     document.querySelector('.products').insertAdjacentHTML('beforeend',item);
    // });

    //Но вот так, по моему, лучше. Нет смысла создавать промежуточный массив
    list.forEach(item => {
        document.querySelector('.products').insertAdjacentHTML('beforeend',renderProduct(item));
    });
};


renderProducts(products);
 */