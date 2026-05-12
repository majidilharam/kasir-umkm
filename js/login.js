const username = document.getElementById("username")
const password = document.getElementById("password")
const loginBtn = document.getElementById("loginBtn")
const errorMesagge = document.getElementById("errorMesagge")

loginBtn.addEventListener("click", function (e){
    e.preventDefault() 


if (
    username.value === "admin" &&
    password.value === "admin123"
) {
    alert("login berhasil")
    errorMesagge.innerHTML = " "

    window.location.href =  "dashboard.html"
} else {
    errorMesagge.innerHTML = "Username atau Password salah"
}
})