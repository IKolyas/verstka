// Product catalog
function createItem(id, name, price, img) {
    return { id, name, price, img }
}

function initCatalog() {
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let names = ['MANGO PEOPLE T-SHIRT', 'MANGO PEOPLE T-SHIRT', 'MANGO PEOPLE T-SHIRT', 'MANGO PEOPLE T-SHIRT',
        'MANGO PEOPLE T-SHIRT','MANGO PEOPLE T-SHIRT','MANGO PEOPLE T-SHIRT','MANGO PEOPLE T-SHIRT','MANGO PEOPLE T-SHIRT',];
    let prices = [52, 52, 52, 52, 52, 52, 52, 52, 52,];
    let images = [
        '../src/assets/images/man1.jpeg',
        '../src/assets/images/Image@1X.jpeg',
        '../src/assets/images/Layer%204@1X.jpeg',
        '../src/assets/images/Layer%205@1X.jpeg',
        '../src/assets/images/woman1.jpeg',
        '../src/assets/images/Layer%207@1X.jpeg',
        '../src/assets/images/Image@1.jpeg',
        '../src/assets/images/Image@xxx.jpeg',
        '../src/assets/images/Image@xxx.jpeg',
    ]
    return names.map((name, index) => createItem(ids[index], name, prices[index], images[index]));
}

const basket = {
    items: [],
    add(item) {
        //добавление товара в items корзины
    },
    remove(item) {
        //удаление товара в items корзины
    }
};

const catalog = {
    items: [],
    container: null,
    slBegin: undefined,
    slEnd: undefined,
    init(tagID, slBegin, slEnd) {
        this.slBegin = slBegin;
        this.slEnd = slEnd;
        this.container = document.querySelector(tagID);
        this.items = initCatalog();
        this._render();
    },
    _render() {
        let str = '';
        this.items.slice(this.slBegin, this.slEnd).forEach(item => {
            str += ` <div class="prodCard card col-12 col-md-6 col-lg-4 border-0 mx-0 px-0 mb-5">
                        <div class="psevProdCard mx-0 px-0">
                            <a href="#" class="d-flex justify-content-around"><i class="fas fa-cart-plus"></i>Add to Cart</a>
                        </div>
                        <img src="${item.img}" class="card-img-top" alt="...">
                        <div class="psevProdCardBody card-body d-flex flex-column align-content-start pb-0 px-0">
                            <h3 class="card-text px-3">${item.name}</h3>
                            <p class="d-flex justify-content-between px-3">$${item.price}<a href="#"><span class="psevAdd d-md-none">
                            <i class="fas fa-cart-plus"></i></span></a></p>
                        </div>
                    </div> `
        });
        if (this.container){
            this.container.innerHTML = str;
        }

    }
};

catalog.init('#catalog');
catalog.init('#index_catalog', 0, 8)
catalog.init('#single_catalog', 0, 4)

// end Product catalog


// openCart
function openCart() {
    let dropdownOn = document.querySelector('.drMyAccount');
    document.addEventListener('click', evt => {
        if (evt.target.classList.contains('my__cart')) {
                dropdownOn.classList.toggle('show');
            }
    })
}
let open = openCart()
//end openCart
