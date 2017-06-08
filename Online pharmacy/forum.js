//productList
var items = [
{
    'id': '1',
    'name': 'Benadryl Plus Capsules Pack of 12', 
    'country': 'USA',
    'ingredients': 'The active ingredients in Benadryl Plus Capsules are: 60 mg Pseudoephedrine hydrochloride and 8 mg acrivastine in each capsule. Other ingredients are: Lactose, sodium starch glycollate, magnesium stearate, gelatin, titanium dioxide and patent blue V. Buy Benadryl Plus Capsules Pack of 12 from Simple Online Pharmacy',
    'imgSrc': 'https://www.simpleonlinepharmacy.co.uk/wp-content/uploads/2015/04/phenergan10-01-300x300.jpg'

},
{
    'id': '2',
    'name': 'Clarityn Allergy Tablets Pack of 14',
    'country': 'Poland',
    'ingredients': 'The active ingredient in Clarityn Allergy is Loratadine. Buy Clarityn Allergy Tablets Pack of 14 from Simple Online Pharmacy',
    'imgSrc': 'https://www.simpleonlinepharmacy.co.uk/wp-content/uploads/2015/03/SimpleIMG3605540Pharmacy.jpg'
},
{
    'id': '3',
    'name': 'BecoAllergy Hayfever Tablets Pack of 7',
    'country': 'USA',
    'ingredients': 'Each film-coated tablet contains 10mg of Cetirizine Hydrochloride. Also contains Lactose. Buy BecoAllergy Hayfever Tablets Pack of 7 from Simple Online Pharmacy',
    'imgSrc': 'https://www.simpleonlinepharmacy.co.uk/wp-content/uploads/2015/03/SimpleIMG3852613Pharmacy.jpg'
},
{
    'id': '4',
    'name': 'LloydsPharmacy Chewable Calcium with Vitamin D - 30 Chewable Tablets',
    'country': 'German',
    'ingredients': 'Calcium Carbonate, Sorbitol, Maltodextrin, Magnesium Stearate, Vegetable Oil, Acacia, Sucrose, Modified Maize Starch, Sweetener (Sucralose), Flavouring, Maize Starch, Triglycerides, Vitamin D3, Antioxidant (Tocopherol). Food supplements should not be used as a substitute for a varied, balanced diet and healthy lifestyle. This container may be over-sized in comparison to the product to provide for sufficient product information.',
    'imgSrc': 'http://www.lloydspharmacy.com/wcsstore7.00.00.610/ExtendedSitesCatalogAssetStore/images/products/400x400/7187156.jpg'
},
{
    'id': '5',
    'name': 'Nivea Men Sensitive Cooling Moisturiser Cool 50ml',
    'country': 'Canada',
    'ingredients': 'Aqua, Glycerin, Tapioca Starch Polymethylsilsesquioxane, Dimethicone, Cetearyl Alcohol, Isopropyl Palmitate, Sodium Polyacrylate, Chamomilla Recutita Flower Extract, Fucus Vesiculosus Extract, Menthoxypropanediol, Tocopheryl Acetate, Maltodextrin, Caprylic/Capric Triglyceride, Xanthan Gum, Ethylhexylglycerin, Phenoxyethanol, Piroctone Olamine, Citral, Butylphenyl Methylpropional, Geraniol, Linalool, Limonene, Parfum',
    'imgSrc': 'http://www.lloydspharmacy.com/wcsstore7.00.00.610/ExtendedSitesCatalogAssetStore/images/products/400x400/6005960.jpg'
}];

//cartList
var cart = [];

//Starts when html is loaded
$().ready(function (event)
{
    $('#shoppingCart').on('click', showCart);
    $('#mainList').on('click', showList);
    $('.clearCart').on('click', onDeleteAllButtonClick);
    $('.sortButton').on('click', sortProducts);

    initialize();
})

function deleteAllItemsInCart() {
    deleteAllFromCart();
    $('#myModal').modal('toggle');
}

//creating elements from batabase. In our case it`s only "items"
function initialize() {
    items.forEach(function (item) {
        var product = createProduct(item);
        $('.products').append(product);
    });
}

//creating a template div and filling it with data
function createProduct(item) {

    //firstly , I wrote template div, and then used this:
    //http://www.willpeavy.com/minifier/

    var xmlString = '<div class="row"> <div class="col-md-3"> <img class="productImage" src="' + item.imgSrc + '"> </div><div class="col-md-6 "> <ul class="list-unstyled "> <li> <div class="d-flex justify-content-start"> <div class="p-2"><strong>Name of product: </strong></div><div class="p-2 productName">' + item.name + '</div></div></li><li id="Country"> <div class="d-flex justify-content-start"> <div class="p-2"><strong>Manufacturer country: </strong></div><div class="p-2 productCountry">' + item.country + '</div></div></li><li id="Ingredients"> <div class="d-flex justify-content-start"> <div class="p-2"><strong>Ingredients: </strong></div><div class="p-2 productIngredients">' + item.ingredients + '</div></div></li></ul> </div><div class="col-md-3"> <div class="p-2"> Enter the quantity: </div><div class="p-2"> <input type="number" class="p-2 input-sm col-sm-12 numberOfNewProduct" value="1"/> </div><div class="p-2"> <button type="button" class="btn btn-success col-sm-12 addToCart">Add</button> </div></div></div>';
    var li = document.createElement('li');
    li.innerHTML = xmlString;

    var product = $(li);
    product.addClass('list-group-item');
    product.attr('id', 'product-' + item.id);

    product.find('.addToCart').on('click', addToCart);
    return product;
}

// addes to cart the product
function addToCart() {
    
    var productContainer = $(this).closest('.list-group-item');
    //returns li
    var count = parseInt(productContainer.find('.numberOfNewProduct').val());
    var productId = productContainer.attr('id').replace('product-', '');
    
    var product = items.filter(function (item) {
        return productId === item.id;
    })[0];
    // returns 1-element array where productId === item.id;

    var index = isCartIncludeProduct(productId);
    
    if (index < 0) {
        var productForCart = Object.create(product);
        productForCart.amount = count;
        cart.push(productForCart);
    } else {
        cart[index].amount += count;
    }

    renderCartItem();
    renderCartAmount();
}

function isCartIncludeProduct(productId) {
    return cart.findIndex(function (item) {
        return productId === item.id;
    });
}

// shows cart product
function rednerCartProducts(item) {

    //firstly , I wrote template div, and then used this:
    //http://www.willpeavy.com/minifier/
    var xmlString = '<div class="row"> <div class="col-md-3"> <img class="productImage" src="' + item.imgSrc + '"> </div><div class="col-md-6 "> <ul class="list-unstyled "> <li> <div class="d-flex justify-content-start"> <div class="p-2"><strong>Name of product: </strong></div><div class="p-2 productName">' + item.name + '</div></div></li><li id="Country"> <div class="d-flex justify-content-start"> <div class="p-2"><strong>Manufacturer country: </strong></div><div class="p-2 productCountry">' + item.country + '</div></div></li><li id="Ingredients"> <div class="d-flex justify-content-start"> <div class="p-2"><strong>Ingredients: </strong></div><div class="p-2 productIngredients">' + item.ingredients + '</div></div></li></ul> </div><div class="col-md-3"> <div class="p-2"> Enter the quantity: </div><div class="p-2 "> ' + item.amount + ' </div><div class="p-2"> <button type="button" class="btn btn-danger deleteFromCart" data-toggle="modal" data-target="#myModal">Delete</button> </div></div></div>';
    var li = document.createElement('li');
    li.innerHTML = xmlString;

    var product = $(li);
    product.addClass('list-group-item');
    product.attr('id', 'productInCart-' + item.id);

    product.find('.deleteFromCart').on('click', onDeleteButtonClick);

    $('.cartList').append(product);
}

function onDeleteAllButtonClick() {
    $('.submitButton').off('click');
    $('.submitButton').on('click', deleteAllItemsInCart);
}

function onDeleteButtonClick() {
    $('.submitButton').off('click');
    $('.submitButton').on('click', deleteFromCart.bind(this));
}

function deleteFromCart() {
    var productContainer = $(this).closest('.list-group-item');
    //returns li
    var count = parseInt(productContainer.find('.numberOfNewProduct').val());
    var productId = productContainer.attr('id').replace('productInCart-', '');
    var index = isCartIncludeProduct(productId);

    if (index > -1) {
        cart.splice(index, 1);
        renderCartItem();
        renderCartAmount();
        $('#myModal').modal('toggle');
    }
}

function deleteAllFromCart() {
    cart = [];
    renderCartItem();
    renderCartAmount();
}

// rendering items in cart
function renderCartItem() {
    $('.cartList').empty();
    cart.forEach(rednerCartProducts);
}

// returns current cart amount
function getCartAmount() {
    if (cart.length) {
        return cart.reduce(function (amount, product) {
            return amount + product.amount;
        }, 0);
    } else {
        return 0;
    }
}

//refreshes cart amount
function renderCartAmount() {
    var amount = getCartAmount();
    $('.cartAmount').empty().text(amount);
}

function showCart() {
    $('#contentBox').addClass('hidden');
    $('#shoppingCartBox').removeClass('hidden');
}

function showList() {
    $('.products').empty();
    initialize();
    $('#shoppingCartBox').addClass('hidden');
    $('#contentBox').removeClass('hidden');
}

//sort and show products
function sortProducts() {
    // copying our list of products 
    // beause sort() sorts source array
    var tmpList = items.slice(0);
    //sorting it by name
    tmpList.sort(compareName);
    //deleting not sorted elements
    $('.products').empty();
    $('#shoppingCartBox').addClass('hidden');
    $('#contentBox').removeClass('hidden');

    // showing sorted list
    tmpList.forEach(function (item) {
        var product = createProduct(item);
        $('.products').append(product);
    });
}

//comparator for names
function compareName(product1, product2) {
    return (product1.name < product2.name) ? -1 : (product1.name > product2.name) ? 1 : 0;
}
