console.log(`hello from Zefta Lab`);

// let login = localStorage.getItem("logIn");
// console.log(login);

// let login = localStorage.setItem("logIn", false);
const loginDone = localStorage.getItem("logIn");
console.log(loginDone);

if (loginDone === "false" || !loginDone) {
  location.href = "signUp.html";
}

// UI Elements
const navContainer = document.querySelector(".nav-wrapper");
const navLinks = document.querySelector(".nav-links");
const logo = document.querySelector(".logo");
const menuToggle = document.querySelector(".menu-toggle");
const hideNav = document.querySelector(".icon-hide-nav");
const cartCount = document.querySelector(".cart-count");
export let categoriesElement = document.querySelector(".category-grid");
export var showData = true;
const emailClothesOffers = document.querySelector(".email");
const emailClothesOffersSubmit = document.querySelector(".email-submit");
const personInfo = JSON.parse(localStorage.getItem("PersonEmails"));
const container = document.querySelectorAll(".container");
console.log(personInfo);
let email;

const emails = personInfo.forEach((info) => {
  email = info.userName + info.age + info.gender + "@gmail.com";
});
console.log(email);

let arrayClothes = [];
// Toggle For Mobile
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("menu-toggle");
  navContainer.style.justifyContent = "center";
  navLinks.style.display = "flex";
  logo.style.display = "none";
  hideNav.style.display = "block";
});

hideNav.addEventListener("click", () => {
  menuToggle.classList.toggle("menu-toggle");
  navLinks.style.display = "none";
  navContainer.style.justifyContent = "space-between";
  logo.style.display = "flex";
  hideNav.style.display = "none";
});
let clear = true;
// setTimeout(() => {
//   if (cartCount.textContent === "0") {
//     localStorage.clear();
//   }
// }, 1000);

// Get the data
export async function fetchData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    const Error = "There is no Internet Connection";
    container.forEach((el) => {
      el.textContent = Error;
      el.style.textAlign = "center";
    });
    throw new Error(err);
  }
}

// Display the data
function displayData(obj) {
  for (let i = 0; i < 6; i++) {
    const imageUrl = [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/1.webp",
    ];
    const categoryCard = `     
      <div class="category-card">
        <img
          src="${imageUrl[i]}"
          alt="${obj[i].slug}"
        />
        <div class="category-content">
          <h3>${obj[i].name}</h3>
          <a href="" class="category-link" data-category = '${obj[i].slug}'>Shop Now</a>
        </div>
      </div>
    `;
    categoriesElement.insertAdjacentHTML("beforeend", categoryCard);
    // arrayCategories.push(obj[i].name);
  }
  // console.log(arrayCategories);
  // Got to categories Link

  const categoryLinks = document.querySelectorAll(".category-link");

  categoryLinks.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e.target);
      console.log(e.target.dataset.category);
      const link = e.target.dataset.category;

      console.log(link);

      localStorage.setItem("category", JSON.stringify(link));
      categoriesElement.innerHTML = "";
      window.location.href = "category.html";
    });
  });
  addProductToCart();
}

async function viewData() {
  const categories = await fetchData(
    `https://dummyjson.com/products/categories`
  );
  console.log(categories);
  displayData(categories);
}

viewData();
let count = 0;
function addProductToCart() {
  const addOneBtn = document.querySelectorAll(".quick-add");
  addOneBtn.forEach((ele) => {
    ele.addEventListener("click", () => {
      const num = ++count;
      cartCount.textContent = num;
      const nameOfProduct =
        ele.parentElement.parentElement.nextElementSibling.firstElementChild
          .textContent;
      const productPrice =
        +ele.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling.lastChild.textContent.replace(
          "$",
          ""
        );
      console.log(nameOfProduct, productPrice);

      const here = arrayClothes.find((item) => item.name === nameOfProduct);
      if (here) {
        here.quantity += 1;
      } else {
        arrayClothes.push({
          name: nameOfProduct,
          price: productPrice,
          quantity: 1,
        });
      }
      localStorage.setItem("arrayClothes", JSON.stringify(arrayClothes));
      localStorage.removeItem("productInfo");
    });
  });
}

emailClothesOffersSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (emailClothesOffers.value === email) {
    location.href = "clothes.html";
  }
});
