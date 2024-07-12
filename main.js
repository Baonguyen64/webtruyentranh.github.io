const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");
signInBtn.addEventListener("click", () => {
container.classList.remove("right-panel-active");
});
signUpBtn.addEventListener("click", ()=> {
container.classList.add("right-panel-active");
});
fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e)=> e.preventDefault());
//hiển thị mk
function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        document.querySelector(`#${inputId} + .toggle-password`).textContent = "Ẩn mật khẩu";
    } else {
        passwordInput.type = "password";
        document.querySelector(`#${inputId} + .toggle-password`).textContent = "Hiện mật khẩu";
    }
}
