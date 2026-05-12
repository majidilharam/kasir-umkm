

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = "admin"
    const pass = "admin123"


    if(username === user && password === pass){

        localStorage.setItem("isLogin", "true")

        window.location.href = "index.html"


    }    else{
        document
        .getElementById("error")
        .classList.remove("hidden")
}
}