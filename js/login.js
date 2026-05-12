const username = document.getElementById("username")
const password = document.getElementById("password")
const loginBtn = document.getElementById("loginBtn")

loginBtn.addEventListener("click", function (e){
    e.preventDefault() 


if (
    username.value === "admin" &&
    password.value === "admin123"
) {
    alert("login berhasil")
    window.location.href =  "dashboard.html"
} else {
    alert("yang bener dong")
}
})