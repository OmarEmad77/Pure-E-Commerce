// import { login } from "/script.js";
// console.log(login);

//Ui Ele
const formSubmit = document.querySelector(".submit-btn");
const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const age = document.querySelector("#age");
const gender = document.querySelector("#gender");
const signupContainer = document.querySelector(".signup-container");
const massage = document.createElement("div");

massage.style.cssText = `
color: #920e0e;
  text-align: center;
   font-size: 1rem;
   margin : 20px ;
`;
massage.textContent = "SignUp Is Not Correct You Must Fill All Fields ";
let personInfo = [];
formSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (!userName.value || !age.value || !gender.value || !password.value) {
    signupContainer.firstElementChild.after(massage);
  } else {
    massage.textContent = "";
    personInfo.push({
      userName: userName.value,
      password: password.value,
      age: age.value,
      gender: gender.value === "male" ? "M" : "F",
    });

    localStorage.setItem("PersonEmails", JSON.stringify(personInfo));
    localStorage.setItem("logIn", true);
    location.href = "logIn.html";
  }
});
