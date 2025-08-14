// Dados dos produtos
const products = [
    {
      id: 1,
      name: "Smartphone Moderno",
      description: "Smartphone com tela OLED e câmera de alta resolução",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Fones Bluetooth",
      description: "Fones sem fio com cancelamento de ruído ativo",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Laptop Premium",
      description: "Laptop ultrafino com processador de última geração",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Smartwatch",
      description: "Relógio inteligente com monitoramento de saúde",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Câmera Digital",
      description: "Câmera profissional com lente intercambiável",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop",
    },
    {
      id: 6,
      name: "Tablet Pro",
      description: "Tablet com tela de alta resolução e stylus incluído",
      price: 649.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
    },
  ]
  
  // Estado do carrinho
  let cart = []
  
  // Função para renderizar produtos
  function renderProducts() {
    const productsGrid = document.getElementById("products-grid")
  
    productsGrid.innerHTML = products
      .map(
        (product) => `
          <div class="product-card">
              <img src="${product.image}" alt="${product.name}" class="product-image">
              <div class="product-info">
                  <h3 class="product-name">${product.name}</h3>
                  <p class="product-description">${product.description}</p>
                  <div class="product-footer">
                      <span class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</span>
                      <button class="add-btn" onclick="addToCart(${product.id})">
                          Adicionar
                      </button>
                  </div>
              </div>
          </div>
      `,
      )
      .join("")
  }
  
  // Função para adicionar ao carrinho
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId)
    const existingItem = cart.find((item) => item.id === productId)
  
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
  
    updateCartUI()
  }
  
  // Função para remover do carrinho
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId)
    updateCartUI()
  }
  
  // Função para alterar quantidade
  function changeQuantity(productId, change) {
    const item = cart.find((item) => item.id === productId)
    if (item) {
      item.quantity += change
      if (item.quantity <= 0) {
        removeFromCart(productId)
      } else {
        updateCartUI()
      }
    }
  }
  
  // Função para atualizar UI do carrinho
  function updateCartUI() {
    const cartCount = document.getElementById("cart-count")
    const cartItems = document.getElementById("cart-items")
    const cartTotal = document.getElementById("cart-total")
  
    // Atualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
  
    // Atualizar itens do carrinho
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>'
    } else {
      cartItems.innerHTML = cart
        .map(
          (item) => `
              <div class="cart-item">
                  <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                  <div class="cart-item-info">
                      <div class="cart-item-name">${item.name}</div>
                      <div class="cart-item-price">R$ ${item.price.toFixed(2).replace(".", ",")}</div>
                      <div class="quantity-controls">
                          <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                          <span class="quantity">${item.quantity}</span>
                          <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                      </div>
                  </div>
              </div>
          `,
        )
        .join("")
    }
  
    // Atualizar total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cartTotal.textContent = total.toFixed(2).replace(".", ",")
  }
  
  // Função para mostrar/esconder carrinho
  function toggleCart() {
    const cartSidebar = document.getElementById("cart-sidebar")
    const overlay = document.getElementById("overlay")
  
    cartSidebar.classList.toggle("open")
    overlay.classList.toggle("active")
  }
  
  // Inicializar a página
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts()
    updateCartUI()
  })
  