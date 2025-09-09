// Fetch dishes from backend
async function fetchDishes() {
  try {
    const res = await fetch("http://localhost:8000/api/foods");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching dishes:", err);
    return [];
  }
}

// Generate stars
function getStars(rating) {
  const rounded = Math.round(rating);
  let stars = "";
  for (let i = 0; i < rounded; i++) stars += "★";
  for (let i = rounded; i < 5; i++) stars += "☆";
  return `<span class="dish-rating">${stars} <span class="dish-rating-num">${rating.toFixed(
    1
  )}</span></span>`;
}

const dishesContainer = document.querySelector(".dishes");
const categoryBtns = document.querySelectorAll(".category-btn");

async function renderDishes(filter = "all") {
  dishesContainer.innerHTML = "";

  const dishes = await fetchDishes();
  const filtered =
    filter === "all" ? dishes : dishes.filter((d) => d.category === filter);

  filtered.forEach((dish) => {
    const card = document.createElement("div");
    card.className = "dish-card";
    if (dish.rating >= 4.7) {
      card.classList.add("top-rated");
    }
    card.innerHTML = `
            ${dish.rating >= 4.7 ? '<div class="top-badge">Top Rated ⭐</div>' : ""}
            <img src="${dish.img}" alt="${dish.title}">
            <div class="dish-title">${dish.title}</div>
            <div class="dish-category">${
              dish.category.charAt(0).toUpperCase() + dish.category.slice(1)
            }</div>
            <div class="dish-desc">${dish.desc}</div>
            ${getStars(dish.rating)}
        `;
    card.addEventListener("click", () => showDishModal(dish));
    dishesContainer.appendChild(card);
  });
}

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".category-btn.active")?.classList.remove("active");
    btn.classList.add("active");
    renderDishes(btn.dataset.category);
  });
});

function showDishModal(dish) {
  let modal = document.getElementById("dish-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "dish-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "1000";
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
        <div style="background:#fff3e0;padding:2rem;border-radius:16px;max-width:350px;text-align:center;position:relative;">
            <button id="close-modal" style="position:absolute;top:10px;right:10px;background:none;border:none;font-size:1.5rem;cursor:pointer;">&times;</button>
            <img src="${dish.img}" alt="${dish.title}" style="width:100%;border-radius:12px;margin-bottom:1rem;">
            <div class="dish-title">${dish.title}</div>
            <div class="dish-category">${
              dish.category.charAt(0).toUpperCase() + dish.category.slice(1)
            }</div>
            <div class="dish-desc">${dish.desc}</div>
            ${getStars(dish.rating)}
        </div>
    `;
  modal.style.display = "flex";
  document.getElementById("close-modal").onclick = () => {
    modal.style.display = "none";
  };
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
}

// Initial render
renderDishes("all");
document
  .querySelector('.category-btn[data-category="all"]')
  .classList.add("active");

// Contact form handler
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    contactForm.reset();
  });
}

// Login form handler
const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("token", data.token);
        loginForm.reset();
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("⚠️ Something went wrong");
    }
  });
}


// Order form handler
const orderForm = document.querySelector(".order-form");
if (orderForm) {
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const dish = orderForm.dish.value;
    const quantity = orderForm.quantity.value;
    const name = orderForm["order-name"].value;
    alert(
      `Thank you, ${name}! Your order for ${quantity} x ${dish} has been placed.`
    );
    orderForm.reset();
  });
}
