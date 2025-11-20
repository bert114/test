// --- View Product ---
window.viewProduct = async function (keyName, id) {
    const response = await fetch('./code/ProductData.json');
    const data = await response.json();
    const category = data.Product[id];
    const product = category[keyName];

    // Store product for next page
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "viewProduct.html";
};

// --- Quantity Controls ---
function quantity(action) {
    const input = document.getElementById("quantity");
    let value = parseInt(input.value) || 1;

    if (action === '+' && value < 99) value++;
    if (action === '-' && value > 1) value--;

    input.value = value;
}

// --- Checkout Product ---
function checkOutProcess() {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    const quantity = parseInt(document.getElementById("quantity").value) || 1;

    if (!product) return;

    product.quantity = quantity;
    localStorage.setItem("checkoutProduct", JSON.stringify(product));

    window.location.href = "checkoutProcess.html";
}


// --- Add to Cart ---
function addToCart() {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!product) {
        console.error("No product selected!");
        return;
    }

    const quantity = parseInt(document.getElementById("quantity").value) || 1;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.ProductName === product.ProductName);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        product.quantity = quantity;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.ProductName} (${quantity}x) added to cart!`);
}
