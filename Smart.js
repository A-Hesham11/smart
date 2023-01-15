// Select All Links To Create The Scroll
let allLinks = document.querySelectorAll(".links a");

allLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        document.querySelector(e.target.dataset.section).scrollIntoView({behavior: "smooth"});

    });

});

// Select Links And Icon
let links = document.querySelector(".header .links");
let icon = document.querySelector(".header .fa-bars");

icon.onclick = function() {
    links.classList.toggle("toggle-show")
};

// Select Overlay Popup
let overlayBody = document.querySelector(".overlay-body");
let iconCart = document.querySelector(".landing-page .fa-cart-shopping");

iconCart.onclick = function() {

    overlayBody.classList.add("active");

    overlayBody.addEventListener("click", (e) => {

        e.target.classList.remove("active")

    });

};

// Call Functions Of Json
function getProduct() {

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function() {

        if (this.readyState === 4 && this.status === 200) {

            let productObject = JSON.parse(this.responseText);

            addProductData(productObject);

            // createProductCart(productObject);

        };
    };
    myRequest.open("GET", "Smart.json", true);
    myRequest.send();
};
getProduct();

// Add Object On Local Storage
let productData = JSON.parse(localStorage.getItem("paoduct_data"));

// Create The Structure Of Product
let productContainer = document.querySelector(".products .container");

function addProductData(obj) {

localStorage.setItem("pdoduct_data", JSON.stringify(obj));

// Create The Product Box
for (let i = 0; i < obj.length; i++) {

    let productBox = document.createElement("div");
    productBox.className = "product-box";

    let iconsShare = document.createElement("div");
    iconsShare.className = "icons-share";
    let iconHeart = document.createElement("i");
    iconHeart.className = "fa-solid fa-heart";
    let iconShare = document.createElement("i");
    iconShare.className = "fa-solid fa-share";
    iconsShare.appendChild(iconHeart);
    iconsShare.appendChild(iconShare);

    let productImage = document.createElement("img");
    productImage.src = obj[i].urlImg

    let productTitle = document.createElement("h3");
    productTitle.appendChild(document.createTextNode(obj[i].name));

    let productText = document.createElement("p");
    productText.appendChild(document.createTextNode(obj[i].text));

    let price = document.createElement("h4");
    price.appendChild(document.createTextNode(`$${obj[i].price}`));

    let icons = document.createElement("div");
    icons.className = "icons"

    for (let i = 0; i < 5; i++) {

        let iconsI = document.createElement("i");
        iconsI.className = "fa-solid fa-star";
        icons.appendChild(iconsI);

    };

    let buttonCart = document.createElement("button");
    buttonCart.id = "button-cart";
    buttonCart.appendChild(document.createTextNode("Add To Cart"));

    productBox.appendChild(iconsShare)
    productBox.appendChild(productImage);
    productBox.appendChild(productTitle);
    productBox.appendChild(productText);
    productBox.appendChild(price)
    productBox.appendChild(icons)
    productBox.appendChild(buttonCart);

    productContainer.appendChild(productBox);

// Create Cart Box To Add At Cart Shoping
let containerCart = document.querySelector(".overlay-body .container-cart");
let cartCount = document.querySelector(".cart-count");

buttonCart.onclick = function () {

        cartCount.textContent++;
        cartCount.classList.add("active");


        let cartBox = document.createElement("div");
        cartBox.className = "cart-box ";
        cartBox.classList.add("active");

        let productName = document.createElement("h3");
        productName.appendChild(document.createTextNode(obj[i].name));

        let cartBoxImage = document.createElement("div");
        let price = document.createElement("h4");
        let image = document.createElement("img");
        image.src = obj[i].urlImg
        price.appendChild(document.createTextNode(`Price:$${obj[i].price}`));
        cartBoxImage.appendChild(price);
        cartBoxImage.appendChild(image);

        let priceBox = document.createElement("div");
        let totalPrice = document.createElement("h4");
        totalPrice.appendChild(document.createTextNode("Total Price:$"));
        let totalPriceNum = document.createElement("p");
        totalPriceNum.appendChild(document.createTextNode(obj[i].price));
        total = obj[i].price;
        totalPrice.appendChild(totalPriceNum);
        priceBox.appendChild(totalPrice);

        let button = document.createElement("div")
        let minus = document.createElement("span");
        minus.className = "minus";
        minus.appendChild(document.createTextNode("-"));

        let count = document.createElement("input");
        count.value = 1;
        let plus = document.createElement("span");
        plus.className = "plus"
        plus.appendChild(document.createTextNode("+"));

        button.appendChild(minus);
        button.appendChild(count);
        button.appendChild(plus);
        priceBox.appendChild(button);

        plus.addEventListener("click", () => {
            count.value++
            totalPriceNum.innerText = +totalPriceNum.innerText + total
        });

        minus.onclick = function () {
            if (count.value > 1) {
                count.value--
                totalPriceNum.innerText = +totalPriceNum.innerText - total;
            } else {
                count.value;
                minus.className = "close";
            }
        };

        plus.addEventListener("click", () => {
            minus.classList.remove("close");
        });

        let buttonDelete = document.createElement("button");
        buttonDelete.className = "button-delete";
        buttonDelete.appendChild(document.createTextNode("Delete"));

        buttonDelete.addEventListener("click", (e) => {
            cartBox.remove();
            cartCount.textContent--;
            if (cartCount.textContent == 0) {
                cartCount.classList.remove("active");
            }
        });

        let buttonBuy = document.createElement("button");
        buttonBuy.className = "button-buy";
        buttonBuy.appendChild(document.createTextNode("Buy")); 
        let buttonCpmolete = document.createElement("i");
        buttonCpmolete.className = "fa-solid fa-check";
        buttonBuy.appendChild(buttonCpmolete) ;
        
        buttonBuy.addEventListener("click", (e) => {
            buttonCpmolete.style.left = 0;
        });

        cartBox.appendChild(productName);
        cartBox.appendChild(cartBoxImage);
        cartBox.appendChild(priceBox);
        cartBox.appendChild(buttonDelete);
        cartBox.appendChild(buttonBuy);
        containerCart.appendChild(cartBox);

    }

};

};

// Select Element Of About
let imgs = document.querySelectorAll(".images img");
let largeImage = document.querySelector(".image-show img");

imgs.forEach(img => {

    img.addEventListener("click", (e) => {

        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");

        });

        e.target.classList.toggle("active");

        largeImage.src = img.src

    });
});





