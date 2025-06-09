document.addEventListener('DOMContentLoaded', () => {
  // Tombol CTA "Lihat Menu"
  const ctaButton = document.getElementById('cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById('menu');
      window.scrollTo({
        top: target.offsetTop - document.querySelector('header').offsetHeight,
        behavior: 'smooth'
      });
    })
  }

  // Fokus otomatis ke input search + Tombol clear search
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  if (searchInput) {
    searchInput.focus();

    // Pencarian dengan highlight hasil
    searchInput.addEventListener('input', e => {
      const filter = e.target.value.toLowerCase();
      document.querySelectorAll('#menu-list .feature-item').forEach(item => {
        const name = item.textContent.toLowerCase();
        if (name.includes(filter)) {
          item.style.display = '';
          item.style.backgroundColor = '#fffae6'; // Highlight hasil pencarian
        } else {
          item.style.display = 'none';
          item.style.backgroundColor = '';
        }
      });
    });
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      document.querySelectorAll('#menu-list .feature-item').forEach(item => {
        item.style.display = '';
        item.style.backgroundColor = '';
      });
    });
  }

  // Smooth scroll nav
  const navLinks = document.querySelectorAll('header nav ul li a');
  const sections = document.querySelectorAll('main section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      window.scrollTo({
        top: target.offsetTop - document.querySelector('header').offsetHeight,
        behavior: 'smooth'
      });
    });
  });

  // Toggle menu mobile
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('navbar').classList.toggle('active');
  });

  // Keranjang sederhana
  const cart = {};
  const cartItemsList = document.getElementById('cart-items');
  const clearCartBtn = document.getElementById('clear-cart');

  function renderCart() {
    cartItemsList.innerHTML = '';
    const entries = Object.entries(cart);
    if (!entries.length) {
      cartItemsList.innerHTML = '<li>Keranjang kosong</li>';
      clearCartBtn.style.display = 'none';
      return;
    }
    clearCartBtn.style.display = 'block';
    entries.forEach(([name, qty]) => {
      const li = document.createElement('li');
      li.textContent = `${name} (x${qty})`;
      const btn = document.createElement('button');
      btn.textContent = 'Hapus';
      btn.className = 'cart-remove-btn';
      btn.onclick = () => {
        if (qty === 1) delete cart[name];
        else cart[name]--;
        renderCart();
      };
      li.appendChild(btn);
      cartItemsList.appendChild(li);
    });
  }

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', e => {
      e.stopPropagation();
      const item = button.closest('.feature-item');
      const name = item.dataset.name;
      cart[name] = (cart[name] || 0) + 1;
      renderCart();
    });
  });

  clearCartBtn.addEventListener('click', () => {
    Object.keys(cart).forEach(key => delete cart[key]);
    renderCart();
  });

  renderCart();
}); 

document.addEventListener('DOMContentLoaded', () => {
  // Tombol CTA "Lihat Menu"
  const ctaButton = document.getElementById('cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById('menu');
      window.scrollTo({
        top: target.offsetTop - document.querySelector('header').offsetHeight,
        behavior: 'smooth'
      });
    });
  }

  // Fokus otomatis ke input search + Tombol clear search
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  if (searchInput) {
    searchInput.focus();

    searchInput.addEventListener('input', e => {
      const filter = e.target.value.toLowerCase();
      document.querySelectorAll('#menu-list .feature-item').forEach(item => {
        const name = item.textContent.toLowerCase();
        if (name.includes(filter)) {
          item.style.display = '';
          item.style.backgroundColor = '#fffae6';
        } else {
          item.style.display = 'none';
          item.style.backgroundColor = '';
        }
      });
    });
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      document.querySelectorAll('#menu-list .feature-item').forEach(item => {
        item.style.display = '';
        item.style.backgroundColor = '';
      });
    });
  }

  // Smooth scroll nav
  const navLinks = document.querySelectorAll('header nav ul li a');
  const sections = document.querySelectorAll('main section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      window.scrollTo({
        top: target.offsetTop - document.querySelector('header').offsetHeight,
        behavior: 'smooth'
      });
    });
  });

  // Toggle menu mobile
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('navbar').classList.toggle('active');
  });

  // ---------- KERANJANG DENGAN KUANTITAS ----------
  let cart = [];

  // Tambahkan event ke tombol "Tambah ke Keranjang"
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.stopPropagation();
      const item = button.closest('.feature-item');
      const name = item.querySelector('h4').textContent;
      const priceText = item.querySelector('.price').textContent.replace(/[^\d]/g, '');
      const price = parseInt(priceText);

      // Periksa apakah item sudah ada di cart
      const existingItem = cart.find(i => i.name === name);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      updateCart();
    });
  });

  // Update tampilan keranjang dan total harga
  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} (x${item.qty}) - Rp${(item.price * item.qty).toLocaleString()}`;

      // Tombol hapus per item
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Hapus";
      removeBtn.className = "cart-remove-btn";
      removeBtn.addEventListener("click", e => {
        e.stopPropagation();
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          cart.splice(index, 1);
        }
        updateCart();
      });

      li.appendChild(removeBtn);
      cartItems.appendChild(li);

      total += item.price * item.qty;
    });

    totalPriceElem.textContent = `Rp${total.toLocaleString()}`;

    // Tampilkan / sembunyikan tombol clear-cart
    const clearCartBtn = document.getElementById('clear-cart');
    clearCartBtn.style.display = cart.length ? 'block' : 'none';
  }

  // Tombol kosongkan keranjang
  document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    updateCart();
  });

  // Inisialisasi
  updateCart();
});
// FAQ toggle interaktif
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const parent = question.parentElement;
    parent.classList.toggle('active');
  });
});
