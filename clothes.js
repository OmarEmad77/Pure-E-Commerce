// const link = "mens-shirts";
// import { displayProducts } from "/category.js";

import { fetchData } from "script.js";

const categoryGrid = document.querySelector(".category-grid");
let sectionTitle = document.querySelector(".section-title");
let productObjResult = [];
(async () => {
  const category = await fetchData(
    `https://dummyjson.com/products/category/mens-shirts`
  );
  console.log(category);

  displayProducts(category);
})();

// Add Products
let count = 0;
export const addProduct = () => {
  const addProductBtn = document.querySelectorAll(".plus-btn");
  const cartCount = document.querySelector(".cart-count");
  const cart = document.querySelectorAll(".cart");
  addProductBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const num = ++count;
      localStorage.setItem("cart", num);
      cartCount.textContent = num;

      const nameOfProduct =
        btn.parentElement.parentElement.firstElementChild.textContent;
      const productPrice =
        btn.parentElement.parentElement.children[2].firstElementChild
          .firstElementChild.textContent;

      const existingProduct = productObjResult.find(
        (item) => item.name === nameOfProduct
      );
      console.log(productObjResult, existingProduct);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        productObjResult.push({
          name: nameOfProduct,
          price: productPrice,
          quantity: 1,
        });
      }
      console.log(productObjResult);

      localStorage.setItem("productInfo", JSON.stringify(productObjResult));
    });
  });
  cart.forEach((ele) => {
    ele.addEventListener("click", function () {
      window.location.href = "cart.html";
    });
  });
};
function displayProducts(productInfo) {
  for (let i = 0; i < productInfo.products.length; i++) {
    const productCard = `
      <div class="category-card">
         <img
           src="${productInfo.products[i].images[1]}"
           alt="${productInfo.products[i].title}"
         />
         <div class="category-content">
           <h3>${productInfo.products[i].title}</h3>
           <p>${productInfo.products[i].description}</p>
           <div class = 'priceInfo'> <p class='dif' >Price : <span class = 'price'>${productInfo.products[i].price}</span></p>
           <button class="plus-btn">+</button></div>
          <div> <button class="cart">Go to Cart</button></div>
         </div>
       </div>
     `;
    sectionTitle.textContent = `
 Clothes Shop
  `;
    categoryGrid.insertAdjacentHTML("beforeend", productCard);
  }

  // Remove the last view Elements
  const removeElements = document
    .querySelectorAll(".category-link")
    .forEach((ele) => {
      ele.parentElement.parentElement.remove();
    });
  console.log(removeElements);
  addProduct();
}
