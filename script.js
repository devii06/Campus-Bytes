/* ==========================================================
   CAMPUS BITES - JAVASCRIPT APP LOGIC (Expanded Menu & Vertical Scroll)
   ========================================================== */

let menuItems = [
    // Breakfast (7:30 AM - 9:00 AM)
    { id: 1, name: "Masala Dosa & Chutney", category: "Breakfast", price: 65, stock: "Available", special: true, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80" },
    
    { id: 3, name: "Egg Omelette & Toast", category: "Breakfast", price: 50, stock: "Only a few left", special: false, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80" },
    { id: 4, name: "Poha with Sev & Peanuts", category: "Breakfast", price: 40, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80" },
    { id: 5, name: "Vada Sambar (2 pcs)", category: "Breakfast", price: 50, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80" },

    // Lunch (12:00 PM - 3:00 PM)
    { id: 6, name: "South Indian Thali Meals", category: "Lunch", price: 90, stock: "Available", special: true, img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&q=80" },
    { id: 7, name: "Chicken Biryani Special", category: "Lunch", price: 130, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80" },
    { id: 8, name: "Paneer Butter Masala Rice Bowl", category: "Lunch", price: 110, stock: "Out of stock", special: false, img: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=500&q=80" },
    { id: 9, name: "Veg Fried Rice & Manchurian", category: "Lunch", price: 100, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80" },
    { id: 10, name: "Dal Tadka & Jeera Rice", category: "Lunch", price: 80, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80" },

    // Snacks (11:00 AM - 3:00 PM)
    { id: 11, name: "Crispy French Fries", category: "Snacks", price: 60, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80" },
    { id: 12, name: "Cheesy Veggie Sandwich", category: "Snacks", price: 75, stock: "Only a few left", special: true, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80" },
    { id: 13, name: "Spicy Veg Momos (6 pcs)", category: "Snacks", price: 80, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&q=80" },
    { id: 14, name: "Samosa Chaat", category: "Snacks", price: 45, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80" },
    { id: 15, name: "Paneer Cheese Roll", category: "Snacks", price: 85, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80" },

    // Beverages (All Day)
    { id: 16, name: "Cold Coffee Shake", category: "Beverages", price: 70, stock: "Available", special: true, img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80" },
    { id: 17, name: "Fresh Mango Smoothie", category: "Beverages", price: 85, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&q=80" },
    { id: 18, name: "Masala Chai & Biscuits", category: "Beverages", price: 25, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80" },
    { id: 19, name: "Lemon Mint Mojito", category: "Beverages", price: 60, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80" },
    { id: 20, name: "Badam Milk", category: "Beverages", price: 50, stock: "Available", special: false, img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80" }
];

let currentUser = null;
let cart = [];
let orders = [
    {
        token: "CB-1044",
        username: "student123",
        items: [{ name: "Masala Dosa & Chutney", price: 52, quantity: 2 }],
        total: 104,
        paymentMode: "Online",
        status: "Ready",
        time: "10:15 AM"
    }
];

let campaignText = "Diwali Special menu live now! Enjoy 20% off on all festive combos and Today's Specials.";

/* ==========================================================
   PERSISTENCE — localStorage
   Keeps login session, cart, orders, menu and the campaign
   banner intact across page refreshes.
   ========================================================== */
const STORAGE_KEY = "campusBites_state_v1";

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            currentUser: currentUser,
            cart: cart,
            orders: orders,
            menuItems: menuItems,
            campaignText: campaignText
        }));
    } catch (e) {
        console.warn("Campus Bites: could not save state to localStorage.", e);
    }
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (saved.menuItems) menuItems = saved.menuItems;
        if (saved.orders) orders = saved.orders;
        if (saved.campaignText) campaignText = saved.campaignText;
        if (saved.cart) cart = saved.cart;
        if (saved.currentUser) currentUser = saved.currentUser;
    } catch (e) {
        console.warn("Campus Bites: could not load saved state from localStorage.", e);
    }
}

// Restore whatever was saved before any rendering happens
loadState();

// AUTHENTICATION
function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (tab === 'login') {
        document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('signup-form').classList.add('hidden');
    } else {
        document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
        document.getElementById('signup-form').classList.remove('hidden');
        document.getElementById('login-form').classList.add('hidden');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const role = document.querySelector('input[name="login-role"]:checked').value;
    currentUser = { username: user, role: role };
    saveState();
    initAppSession();
}

function handleSignup(e) {
    e.preventDefault();
    const user = document.getElementById('signup-user').value.trim();
    const role = document.getElementById('signup-role').value;
    currentUser = { username: user, role: role };
    saveState();
    alert(`Account created successfully! Welcome to Campus Bites, ${user}.`);
    initAppSession();
}

function initAppSession() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    
    const roleBadge = document.getElementById('header-role-badge');
    const staffNavBtn = document.getElementById('nav-staff-btn');
    
    if (currentUser.role === 'staff') {
        roleBadge.textContent = "Staff & Admin Portal";
        staffNavBtn.classList.remove('hidden');
    } else {
        roleBadge.textContent = "Student Portal";
        staffNavBtn.classList.add('hidden');
    }

    renderCampaignBanner();
    renderVerticalMenu();
    renderTodaysSpecials();
    renderCart();
    renderMyOrders();
    updateCartCount();
}

function handleLogout() {
    currentUser = null;
    cart = [];
    saveState();
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('login-form').reset();
}

function navigateStaffDashboard() {
    const staffSec = document.getElementById('staff-section');
    staffSec.classList.toggle('hidden');
    if (!staffSec.classList.contains('hidden')) {
        staffSec.scrollIntoView({ behavior: 'smooth' });
        renderStaffDashboard();
    }
}

function renderCampaignBanner() {
    document.getElementById('campaign-text').textContent = campaignText;
}

function updateCampaignBanner() {
    const val = document.getElementById('staff-campaign-input').value.trim();
    if (!val) return;
    campaignText = val;
    renderCampaignBanner();
    saveState();
    document.getElementById('staff-campaign-input').value = "";
    alert("Campaign announcement updated successfully!");
}

function getEffectivePrice(item) {
    return item.special ? Math.round(item.price * 0.8) : item.price;
}

// RENDER VERTICAL SCROLLING MENU WITH CORRECT TIMINGS
function renderVerticalMenu() {
    const container = document.getElementById('vertical-menu-container');
    const searchTxt = document.getElementById('search-input')?.value.toLowerCase() || "";
    const availabilityFilter = document.getElementById('availability-filter')?.value || "all";

    const categories = [
        { name: "Breakfast", timing: "07:30 AM - 09:00 AM" },
        { name: "Lunch", timing: "12:00 PM - 03:00 PM" },
        { name: "Snacks", timing: "11:00 AM - 03:00 PM" },
        { name: "Beverages", timing: "Available All Day" }
    ];

    container.innerHTML = categories.map(catObj => {
        let catItems = menuItems.filter(item => {
            let matchCat = item.category === catObj.name;
            let matchSearch = item.name.toLowerCase().includes(searchTxt);
            let matchAvail = availabilityFilter === 'all' || (availabilityFilter === 'available' && item.stock !== 'Out of stock');
            return matchCat && matchSearch && matchAvail;
        });

        if (catItems.length === 0) return '';

        return `
            <div class="category-block">
                <div class="category-header-row">
                    <h3>${catObj.name}</h3>
                    <span class="category-timing-badge">⏰ ${catObj.timing}</span>
                </div>
                <div class="menu-grid">
                    ${catItems.map(item => {
                        const effPrice = getEffectivePrice(item);
                        const isOut = item.stock === 'Out of stock';
                        let stockClass = item.stock === 'Available' ? 'stock-available' : (item.stock === 'Only a few left' ? 'stock-few' : 'stock-out');
                        return `
                            <div class="menu-card">
                                <div class="menu-img-wrap">
                                    <img src="${item.img}" alt="${item.name}">
                                    ${item.special ? `<span class="special-badge">🌟 20% OFF</span>` : ''}
                                    <span class="stock-tag ${stockClass}">${item.stock}</span>
                                </div>
                                <div class="menu-card-body">
                                    <div class="menu-title-price">
                                        <h4>${item.name}</h4>
                                        <div class="price-box">
                                            ${item.special ? `<span class="original-price">₹${item.price}</span>` : ''}
                                            <span class="current-price">₹${effPrice}</span>
                                        </div>
                                    </div>
                                    <button class="btn-add-cart" ${isOut ? 'disabled' : ''} onclick="addToCart(${item.id})">
                                        ${isOut ? 'Out of Stock' : 'Add to Cart 🛒'}
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function renderTodaysSpecials() {
    const grid = document.getElementById('todays-special-grid');
    const specials = menuItems.filter(i => i.special);

    grid.innerHTML = specials.map(item => {
        const effPrice = getEffectivePrice(item);
        return `
            <div class="menu-card">
                <div class="menu-img-wrap">
                    <img src="${item.img}" alt="${item.name}">
                    <span class="special-badge">🌟 Today's Special</span>
                </div>
                <div class="menu-card-body">
                    <div class="menu-title-price">
                        <h4>${item.name}</h4>
                        <div class="price-box">
                            <span class="original-price">₹${item.price}</span>
                            <span class="current-price">₹${effPrice}</span>
                        </div>
                    </div>
                    <button class="btn-add-cart" onclick="addToCart(${item.id})">Add to Cart 🛒</button>
                </div>
            </div>
        `;
    }).join('');
}

// CART MANAGEMENT (No Pop-ups)
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item || item.stock === 'Out of stock') return;

    const existing = cart.find(c => c.item.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ item: item, quantity: 1 });
    }
    updateCartCount();
    renderCart();
    saveState();
}

function updateCartCount() {
    const totalQty = cart.reduce((sum, c) => sum + c.quantity, 0);
    document.getElementById('cart-count-badge').textContent = totalQty;
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const summary = document.getElementById('cart-summary-details');

    if (cart.length === 0) {
        list.innerHTML = `<p style="text-align:center; padding: 20px; color: var(--sage-700);">Your cart is currently empty. Scroll up to browse the menu.</p>`;
        summary.innerHTML = `<p style="color:#777;">No items selected.</p>`;
        document.getElementById('cart-grand-total').textContent = `₹0`;
        return;
    }

    list.innerHTML = cart.map((c, index) => {
        const effPrice = getEffectivePrice(c.item);
        return `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <h4>${c.item.name}</h4>
                    <p>₹${effPrice} each</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <span><b>${c.quantity}</b></span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    <button class="btn-logout" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    let grandTotal = 0;
    summary.innerHTML = cart.map(c => {
        const effPrice = getEffectivePrice(c.item);
        const lineTotal = effPrice * c.quantity;
        grandTotal += lineTotal;
        return `<div class="flex-between" style="font-size:0.9rem; margin-bottom:6px;"><span>${c.item.name} (x${c.quantity})</span> <span>₹${lineTotal}</span></div>`;
    }).join('');

    document.getElementById('cart-grand-total').textContent = `₹${grandTotal}`;
}

function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartCount();
    renderCart();
    saveState();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
    saveState();
}

// ORDER FLOW
function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const payMode = document.querySelector('input[name="payment-mode"]:checked').value;
    const tokenNum = `CB-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let grandTotal = cart.reduce((sum, c) => sum + (getEffectivePrice(c.item) * c.quantity), 0);

    const newOrder = {
        token: tokenNum,
        username: currentUser.username,
        items: cart.map(c => ({ name: c.item.name, price: getEffectivePrice(c.item), quantity: c.quantity })),
        total: grandTotal,
        paymentMode: payMode === 'online' ? 'Online (Simulated UPI)' : 'Counter Cash/Offline',
        status: 'Placed',
        time: now
    };

    orders.unshift(newOrder);
    showReceiptModal(newOrder);
    cart = [];
    updateCartCount();
    renderCart();
    renderMyOrders();
    saveState();
}

function showReceiptModal(order) {
    document.getElementById('receipt-timestamp').textContent = `Placed at ${order.time} | Student: ${order.username}`;
    document.getElementById('receipt-token-num').textContent = order.token;
    document.getElementById('receipt-pay-mode').textContent = order.paymentMode;
    document.getElementById('receipt-grand-total').textContent = `₹${order.total}`;

    document.getElementById('receipt-items-list').innerHTML = order.items.map(i => `
        <div class="flex-between"><span>${i.name} (x${i.quantity})</span> <span>₹${i.price * i.quantity}</span></div>
    `).join('');

    document.getElementById('receipt-modal').classList.remove('hidden');
}

function closeReceiptModal() {
    document.getElementById('receipt-modal').classList.add('hidden');
    document.getElementById('orders-section').scrollIntoView({ behavior: 'smooth' });
}

function renderMyOrders() {
    const list = document.getElementById('my-orders-list');
    const myOrders = orders.filter(o => currentUser.role === 'staff' || o.username === currentUser.username);

    if (myOrders.length === 0) {
        list.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--sage-700);">No active or past tokens found.</p>`;
        return;
    }

    list.innerHTML = myOrders.map(o => {
        let statusClass = o.status === 'Ready' ? 'status-ready' : (o.status === 'Preparing' ? 'status-preparing' : (o.status === 'Served' ? 'status-served' : 'status-placed'));
        return `
            <div class="token-ticket-card">
                <div class="ticket-header">
                    <span class="ticket-token-num">${o.token}</span>
                    <span class="tp-status ${statusClass}">${o.status}</span>
                </div>
                <div class="ticket-items-list">
                    ${o.items.map(i => `• ${i.name} x${i.quantity}`).join('<br>')}
                </div>
                <div class="ticket-footer">
                    <span>Total: ₹${o.total} (${o.paymentMode})</span>
                    <span>${o.time}</span>
                </div>
            </div>
        `;
    }).join('');
}

// STAFF DASHBOARD & ADMIN
function renderStaffDashboard() {
    const container = document.getElementById('staff-orders-container');
    const statuses = ['Placed', 'Preparing', 'Ready', 'Served'];

    container.innerHTML = statuses.map(status => {
        const filtered = orders.filter(o => o.status === status);
        return `
            <div class="kanban-column">
                <h4>${status} (${filtered.length})</h4>
                ${filtered.length === 0 ? `<p style="font-size:0.85rem; color:#777; text-align:center; margin-top:20px;">No orders</p>` : ''}
                ${filtered.map(o => `
                    <div class="kanban-order-card">
                        <div class="flex-between">
                            <span class="token-code">${o.token}</span>
                            <span style="font-size:0.8rem; font-weight:700;">₹${o.total}</span>
                        </div>
                        <p style="font-size:0.8rem; color:#555; margin: 4px 0;">User: ${o.username}</p>
                        <div style="font-size:0.85rem; margin-bottom:8px;">
                            ${o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </div>
                        ${status !== 'Served' ? `
                            <button class="btn-serve" onclick="advanceOrderStatus('${o.token}')">
                                ${status === 'Placed' ? 'Start Preparing ➔' : (status === 'Preparing' ? 'Mark Ready 🔔' : 'Mark as Served ✅')}
                            </button>
                        ` : '<span style="font-size:0.75rem; color:var(--success-green); font-weight:700;">🔒 Bill Locked & Served</span>'}
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');
}

function advanceOrderStatus(tokenNum) {
    const order = orders.find(o => o.token === tokenNum);
    if (!order) return;
    if (order.status === 'Placed') order.status = 'Preparing';
    else if (order.status === 'Preparing') order.status = 'Ready';
    else if (order.status === 'Ready') order.status = 'Served';
    renderStaffDashboard();
    renderMyOrders();
    saveState();
}

function openMenuManagerModal() {
    document.getElementById('menu-manager-modal').classList.remove('hidden');
    renderAdminMenuList();
}

function closeMenuManagerModal() {
    document.getElementById('menu-manager-modal').classList.add('hidden');
    renderVerticalMenu();
    renderTodaysSpecials();
}

function renderAdminMenuList() {
    const list = document.getElementById('admin-menu-list');
    list.innerHTML = menuItems.map(item => `
        <div class="admin-item-row">
            <div><strong>${item.name}</strong> (${item.category}) - ₹${item.price} ${item.special ? '🌟 Special' : ''}</div>
            <div style="display:flex; gap:8px; align-items:center;">
                <select onchange="updateItemStock(${item.id}, this.value)">
                    <option value="Available" ${item.stock==='Available'?'selected':''}>Available</option>
                    <option value="Only a few left" ${item.stock==='Only a few left'?'selected':''}>Few left</option>
                    <option value="Out of stock" ${item.stock==='Out of stock'?'selected':''}>Out of stock</option>
                </select>
                <button class="btn-logout" onclick="deleteMenuItem(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateItemStock(id, newStock) {
    const item = menuItems.find(i => i.id === id);
    if (item) item.stock = newStock;
    saveState();
}

function deleteMenuItem(id) {
    menuItems = menuItems.filter(i => i.id !== id);
    renderAdminMenuList();
    saveState();
}

function handleAddNewItem(e) {
    e.preventDefault();
    const name = document.getElementById('new-item-name').value.trim();
    const category = document.getElementById('new-item-cat').value;
    const price = parseFloat(document.getElementById('new-item-price').value);
    const stock = document.getElementById('new-item-stock').value;
    const special = document.getElementById('new-item-special').checked;
    const img = document.getElementById('new-item-img').value.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80";

    menuItems.push({ id: Date.now(), name, category, price, stock, special, img });
    document.getElementById('add-item-form').reset();
    renderAdminMenuList();
    saveState();
    alert("New item added successfully!");
}

function handleContactSubmit(e) {
    e.preventDefault();
    alert("Thank you! Your query has been submitted to the canteen administration.");
    document.getElementById('contact-form').reset();
}

/* ==========================================================
   RESTORE SESSION ON PAGE LOAD
   If a user was logged in before refresh, skip the auth wall
   and rebuild the app screen from the saved state.
   ========================================================== */
if (currentUser) {
    initAppSession();
}