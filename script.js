// Cart array to store items
let cart = [];

/**
 * Add item to cart
 * @param {string} name - Product name
 * @param {number} price - Product price
 * @param {string} image - Product image URL
 * @param {string} size - Selected size
 * @param {string} color - Selected color
 * @param {number} qty - Quantity
 */
function addToCart(name, price, image, size, color, qty) {
    qty = Number(qty);

    // Check if item with same specs already exists
    let existingItem = cart.find(item =>
        item.name === name &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
        // If exists, increase quantity
        existingItem.qty += qty;
    } else {
        // If new, add to cart
        cart.push({
            name: name,
            price: price,
            image: image,
            size: size,
            color: color,
            qty: qty
        });
    }

    showCart();
    
    // Show confirmation
    alert(qty + " x " + name + " added to cart!");
}

/**
 * Display cart items and calculate total
 */
function showCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function (item, index) {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-row">
                <!-- PRODUCT INFO -->
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>Rs. ${item.price}</p>
                        <p>Size: ${item.size}</p>
                        <p>Color: ${item.color}</p>
                    </div>
                </div>

                <!-- QUANTITY CONTROLS -->
                <div class="quantity-box">
                    <button onclick="decreaseQty(${index})">−</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty(${index})">+</button>
                </div>

                <!-- ITEM TOTAL -->
                <div class="item-total">
                    Rs. ${itemTotal}
                    <br><br>
                    <button class="delete-btn" onclick="removeItem(${index})" title="Delete item">🗑</button>
                </div>
            </div>
        `;
    });

    // Update grand total
    document.getElementById("total").innerHTML = "Grand Total: Rs " + total;
}

/**
 * Increase quantity of cart item
 * @param {number} index - Cart item index
 */
function increaseQty(index) {
    cart[index].qty++;
    showCart();
}

/**
 * Decrease quantity of cart item
 * @param {number} index - Cart item index
 */
function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        removeItem(index);
        return;
    }
    showCart();
}

/**
 * Remove item from cart
 * @param {number} index - Cart item index
 */
function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}

/**
 * Show payment section and scroll to it
 */
function showPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items first.");
        return;
    }

    let paymentSection = document.getElementById("payment-section");
    paymentSection.style.display = "block";

    // Smooth scroll to payment section
    paymentSection.scrollIntoView({ behavior: "smooth" });
}
function toggleSection(id) {
    const section = document.getElementById(id);

    if (section.style.display === "block") {
        section.style.display = "none";
    } else {
        section.style.display = "block";

        // Smooth scroll
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}