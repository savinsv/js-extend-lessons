class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
        this._render();
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
}

class ProductItem {
    constructor(product, img='https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
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

new ProductList();
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