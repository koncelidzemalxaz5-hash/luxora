function contact(product) {

    const phone = "995XXXXXXXXX";

    const text =
        "Здравствуйте! Меня интересует товар: " + product;

    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(text);

    window.open(url, "_blank");
}


function toggleMenu() {

    const nav = document.querySelector(".nav");

    if (nav.style.display === "flex") {
        nav.style.display = "";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "78px";
        nav.style.right = "5%";
        nav.style.background = "white";
        nav.style.padding = "20px";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";
    }
}
