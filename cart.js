// import { productObjResult, sectionTitle } from "/category.js";

// import { sectionTitle } from "./category";

// import { categoriesElement } from "/script.js";

const cartContainer = document.querySelector(".cart-container");
const productInfo = JSON.parse(localStorage.getItem("productInfo")) || [];
const arrayClothes = JSON.parse(localStorage.getItem("arrayClothes")) || [];
const table = document.querySelector("#cart-items");
const total = document.querySelector(".total");
let totalResult = [0] || [];
console.log(productInfo, table, arrayClothes);

function displayData(productInfo, arrayClothes) {
  const choose = productInfo?.length || arrayClothes?.length;
  console.log(choose);

  for (let i = 0; i < choose; i++) {
    const subTotal =
      (productInfo[i]?.quantity || arrayClothes[i]?.quantity) *
      (productInfo[i]?.price || arrayClothes[i]?.price);
    const products = `
   <tr>
            <td>${productInfo[i]?.name || arrayClothes[i]?.name}</td>
            <td>${productInfo[i]?.quantity || arrayClothes[i]?.quantity}</td>
            <td>${productInfo[i]?.price || arrayClothes[i]?.price}</td>
            <td>${subTotal?.toFixed(2)} $</td>
          </tr>
        
   `;

    table.insertAdjacentHTML("beforeend", products);
    totalResult.push(+subTotal?.toFixed(2));
  }
  const result = totalResult.reduce((el, acc) => el + acc);
  total.textContent = `${result.toFixed(2)} $`;
}
displayData(productInfo, arrayClothes);
