const products = [
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
