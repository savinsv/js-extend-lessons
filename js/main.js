const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (id,title, price) => {
    return `<div class="product-item" id="${id}">
                <h3>${title}</h3>
                <p>${price}</p>
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
        document.querySelector('.products').insertAdjacentHTML('beforeend',renderProduct(item.id,item.title, item.price));
    });
};
const productss = [];
renderProducts(products);
