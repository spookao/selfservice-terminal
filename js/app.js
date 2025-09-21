let cart = [];
let currentItem = null;
let orderNumber = Math.floor(Math.random() * 900) + 100;

document.addEventListener('DOMContentLoaded', () => {
    const startOrderBtn = document.getElementById('start-order-btn');
    const backBtn = document.getElementById('back-btn');
    const viewCartBtn = document.getElementById('view-cart-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const backToCartBtn = document.getElementById('back-to-cart-btn');
    const newOrderBtn = document.getElementById('new-order-btn');
    const cancelCustomizeBtn = document.getElementById('cancel-customize-btn');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    const welcomeScreen = document.getElementById('welcome-screen');
    const menuScreen = document.getElementById('menu-screen');
    const cartScreen = document.getElementById('cart-screen');
    const paymentScreen = document.getElementById('payment-screen');
    const orderConfirmationScreen = document.getElementById('order-confirmation-screen');
    const customizeScreen = document.getElementById('customize-screen');

    const menuItemsContainer = document.getElementById('menu-items');
    const cartItemsContainer = document.getElementById('cart-items');
    const customizeOptionsContainer = document.getElementById('customize-options');
    const customizeItemName = document.getElementById('customize-item-name');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const orderNumberDisplay = document.getElementById('order-number');

    const categoryBtns = document.querySelectorAll('.category-btn');

    startOrderBtn.addEventListener('click', () => {
        showScreen(welcomeScreen, menuScreen, 'right');
        loadMenuItems('burgers');
    });

    backBtn.addEventListener('click', () => {
        showScreen(menuScreen, welcomeScreen, 'left');
    });

    viewCartBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            showScreen(menuScreen, cartScreen, 'right');
            updateCartDisplay();
        } else {
            showToast('Seu carrinho está vazio!');
        }
    });

    backToMenuBtn.addEventListener('click', () => {
        showScreen(cartScreen, menuScreen, 'left');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            showScreen(cartScreen, paymentScreen, 'right');
        } else {
            showToast('Seu carrinho está vazio!');
        }
    });

    backToCartBtn.addEventListener('click', () => {
        showScreen(paymentScreen, cartScreen, 'left');
    });

    newOrderBtn.addEventListener('click', () => {
        cart = [];
        updateCartCount();
        orderNumber = Math.floor(Math.random() * 900) + 100;
        showScreen(orderConfirmationScreen, welcomeScreen, 'left');
    });

    cancelCustomizeBtn.addEventListener('click', () => {
        showScreen(customizeScreen, menuScreen, 'left');
        currentItem = null;
    });

    addToCartBtn.addEventListener('click', () => {
        if (currentItem) {
            addItemToCart(currentItem);
            showScreen(customizeScreen, menuScreen, 'left');
            currentItem = null;
            showToast('Item adicionado ao carrinho!');
        }
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            loadMenuItems(category);
        });
    });

    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            
            setTimeout(() => {
                processPayment(option.dataset.payment);
            }, 1000);
        });
    });

    function showScreen(fromScreen, toScreen, direction) {
        fromScreen.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
        toScreen.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');

        if (direction === 'right') {
            fromScreen.classList.add('slide-out-left');
            toScreen.classList.add('slide-in-right');
        } else {
            fromScreen.classList.add('slide-out-right');
            toScreen.classList.add('slide-in-left');
        }

        setTimeout(() => {
            fromScreen.classList.add('hidden');
            toScreen.classList.remove('hidden');
        }, 300);
    }

    function loadMenuItems(category) {
        menuItemsContainer.innerHTML = '';
        
        menuData[category].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <div class="menu-item-image" style="background-image: url('${item.image}')"></div>
                <div class="menu-item-info">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-description">${item.description}</div>
                    <div class="menu-item-price">€${item.price.toFixed(2)}</div>
                    ${item.customizable ? '<button class="customize-btn">Personalizar</button>' : ''}
                </div>
            `;
            
            menuItem.addEventListener('click', (e) => {
                if (e.target.classList.contains('customize-btn')) {
                    showCustomizeScreen(item);
                } else {
                    if (!item.customizable) {
                        const cartItem = {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                            customizations: []
                        };
                        cart.push(cartItem);
                        updateCartCount();
                        showToast('Item adicionado ao carrinho!');
                    } else {
                        showCustomizeScreen(item);
                    }
                }
            });
            
            menuItemsContainer.appendChild(menuItem);
        });
    }

    function showCustomizeScreen(item) {
        currentItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            customizations: []
        };
        
        customizeItemName.textContent = `Personalizar ${item.name}`;
        customizeOptionsContainer.innerHTML = '';
        
        if (item.customizationOptions) {
            for (const category in item.customizationOptions) {
                const options = item.customizationOptions[category];
                
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'customize-category';
                
                const categoryTitle = document.createElement('div');
                categoryTitle.className = 'customize-category-title';
                categoryTitle.textContent = getCategoryTitle(category);
                categoryContainer.appendChild(categoryTitle);
                
                options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'customize-option';
                    
                    const inputType = getInputType(category);
                    const inputName = `${category}-option`;
                    
                    optionElement.innerHTML = `
                        <label class="customize-option-name">
                            <input type="${inputType}" name="${inputName}" value="${option.id}" ${option.default ? 'checked' : ''}>
                            ${option.name}
                        </label>
                        <span class="customize-option-price">${option.price > 0 ? '+' : ''}${option.price !== 0 ? '€' + option.price.toFixed(2) : ''}</span>
                    `;
                    
                    const input = optionElement.querySelector('input');
                    input.addEventListener('change', () => {
                        updateCustomizations(category, option, input.checked);
                    });
                    
                    if (option.default) {
                        updateCustomizations(category, option, true);
                    }
                    
                    categoryContainer.appendChild(optionElement);
                });
                
                customizeOptionsContainer.appendChild(categoryContainer);
            }
        }
        
        showScreen(menuScreen, customizeScreen, 'right');
    }

    function getCategoryTitle(category) {
        const titles = {
            ingredients: 'Ingredientes',
            sauces: 'Molhos',
            size: 'Tamanho',
            extras: 'Extras',
            type: 'Tipo',
            ice: 'Gelo',
            sugar: 'Açúcar',
            flavor: 'Sabor',
            toppings: 'Coberturas',
            burger: 'Hambúrguer',
            sides: 'Acompanhamentos',
            drinks: 'Bebidas',
            dessert: 'Sobremesa',
            burgers: 'Hambúrgueres'
        };
        
        return titles[category] || category.charAt(0).toUpperCase() + category.slice(1);
    }

    function getInputType(category) {
        const multipleSelectionCategories = ['ingredients', 'sauces', 'extras', 'toppings'];
        
        return multipleSelectionCategories.includes(category) ? 'checkbox' : 'radio';
    }

    function updateCustomizations(category, option, isSelected) {
        if (getInputType(category) === 'radio') {
            currentItem.customizations = currentItem.customizations.filter(c => c.category !== category);
        } else {
            currentItem.customizations = currentItem.customizations.filter(c => !(c.category === category && c.id === option.id));
        }

        if (isSelected) {
            currentItem.customizations.push({
                category: category,
                id: option.id,
                name: option.name,
                price: option.price
            });
        }

        updateCurrentItemPrice();
    }

    function updateCurrentItemPrice() {
        if (!currentItem) return;
        
        let totalPrice = currentItem.price;
        
        currentItem.customizations.forEach(customization => {
            totalPrice += customization.price;
        });

        currentItem.totalPrice = totalPrice;
    }

    function addItemToCart(item) {
        const cartItem = {
            id: item.id,
            name: item.name,
            basePrice: item.price,
            totalPrice: item.totalPrice || item.price,
            quantity: 1,
            customizations: [...item.customizations]
        };
        
        cart.push(cartItem);
        updateCartCount();
    }

    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
            cartTotal.textContent = '€0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            let customizationsText = '';
            if (item.customizations && item.customizations.length > 0) {
                const customizationsByCategory = {};
                
                item.customizations.forEach(c => {
                    if (!customizationsByCategory[c.category]) {
                        customizationsByCategory[c.category] = [];
                    }
                    customizationsByCategory[c.category].push(c.name);
                });
                
                for (const category in customizationsByCategory) {
                    customizationsText += `${getCategoryTitle(category)}: ${customizationsByCategory[category].join(', ')}; `;
                }
                
                customizationsText = customizationsText.slice(0, -2);
            }
            
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${customizationsText ? `<div class="cart-item-customizations">${customizationsText}</div>` : ''}
                </div>
                <div class="cart-item-price">€${(item.totalPrice * item.quantity).toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                    <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            const decreaseBtn = cartItem.querySelector('.decrease');
            const increaseBtn = cartItem.querySelector('.increase');
            const removeBtn = cartItem.querySelector('.remove-item-btn');
            const quantityDisplay = cartItem.querySelector('.cart-item-quantity');
            
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityDisplay.textContent = item.quantity;
                    updateCartTotal();
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                quantityDisplay.textContent = item.quantity;
                updateCartTotal();
            });
            
            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCartDisplay();
                updateCartCount();
            });
            
            cartItemsContainer.appendChild(cartItem);
            
            total += item.totalPrice * item.quantity;
        });
        
        cartTotal.textContent = `€${total.toFixed(2)}`;
    }

    function updateCartTotal() {
        let total = 0;
        
        cart.forEach(item => {
            total += item.totalPrice * item.quantity;
        });
        
        cartTotal.textContent = `€${total.toFixed(2)}`;
    }

    function processPayment(paymentMethod) {
        orderNumberDisplay.textContent = orderNumber;
        
        sendOrderToAPI(paymentMethod);
        
        showScreen(paymentScreen, orderConfirmationScreen, 'right');
    }

    function sendOrderToAPI(paymentMethod) {
        const order = {
            orderNumber: orderNumber,
            items: cart,
            total: parseFloat(cartTotal.textContent.replace('€', '')),
            paymentMethod: paymentMethod,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
        
        fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Pedido enviado com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar pedido:', error);
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }


    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});