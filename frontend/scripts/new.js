
function toggleMenu(){
    let menuOpen = document.getElementById("mobileMenuOpen");
    let menuClose = document.getElementById("mobileMenuClose");
    let menuNavbar = document.getElementById("mobNavbar");
    if(menuOpen.dataset.open == "1" && menuClose.dataset.close == "0"){
        menuOpen.style.display = "none"
        menuClose.style.display = "flex"
        menuOpen.dataset.open = "0"
        menuClose.dataset.close = "1"
        mobNavbar.style.display = "flex"
    }
    else{
        mobNavbar.style.display = "none"
        menuOpen.style.display = "flex"
        menuClose.style.display = "none"
        menuOpen.dataset.open = "1"
        menuClose.dataset.close = "0"
    }
}
function sign(){
    window.location.href = "./signup.html";
};