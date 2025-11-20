//this is for the product to load
async function loadData(links) {
    //Prevent page reload
    if (event) event.preventDefault();

    let productID;
    switch (links) {
        case "Mac":
            productID = 0;
            break;
        case "iPhone":
            productID = 1;
            break;
        case "iPad":
            productID = 2;
            break;
        case "Watch":
            productID = 3;
            break;
        default:
            console.warn("invalid url");
            break;
    }
    try {
        const response = await fetch('./code/ProductData.json');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        const category = data.Product[productID];

        const container = document.querySelector('.product-section');
        container.innerHTML = "";

        for (const key in category) {
            const details = category[key];
            if (!details) continue;

            const div = document.createElement("div");
            div.classList.add("product-card");
            div.innerHTML = `
                <img src="${details.ImageSource}" class="product-image">
                <h2 class="product-name">${details.ProductName}</h2>
                <p class="product-desc">Price: ₱${details.Price}</p>
                <button class="product-add" data-product-id="${key}" onclick="viewProduct('${key}',${productID})">View</button>
            `;
            container.appendChild(div);
        }

    } catch (err) {
        console.error("failed to fetch data:", err)
    }
}

// ← Remove the previous loadData() call
// loadData();

// Add this at the very end
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category"); // Mac, iPhone, iPad, Watch
    if (category) loadData(category);
});