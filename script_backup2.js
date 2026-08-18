const WHATSAPP_PHONE = "995571696968";

function contact(product) {
    const text =
        "Здравствуйте! Меня интересует товар: " + product;

    const url =
        "https://wa.me/" +
        WHATSAPP_PHONE +
        "?text=" +
        encodeURIComponent(text);

    window.open(url, "_blank");
}


function openProduct(title, price, description, image) {

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalPrice").textContent = price;
    document.getElementById("modalDescription").textContent = description;

    const modalImage = document.getElementById("modalImage");

    modalImage.style.backgroundImage =
        'url("' + image + '")';

    const button =
        document.getElementById("modalWhatsApp");

    button.onclick = function () {

        const text =
            "Здравствуйте! Меня интересует товар: " +
            title +
            ". Цена: " +
            price;

        const url =
            "https://wa.me/" +
            WHATSAPP_PHONE +
            "?text=" +
            encodeURIComponent(text);

        window.open(url, "_blank");
    };

    document
        .getElementById("productModal")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeProduct() {

    document
        .getElementById("productModal")
        .classList.remove("active");

    document.body.style.overflow = "";
}


function toggleMenu() {

    const nav = document.querySelector(".nav");

    if (!nav) return;

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
        nav.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.12)";
    }
}


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeProduct();
    }

});


document.addEventListener("DOMContentLoaded", function() {

    const products =
        document.querySelectorAll(".product");

    products.forEach(function(product) {

        product.style.cursor = "pointer";

        product.addEventListener("click", function(event) {

            if (event.target.closest("button")) {
                return;
            }

            const title =
                product.querySelector("h3")?.textContent ||
                "Мебель LUXORA";

            const price =
                product.querySelector("strong")?.textContent ||
                "Цена по запросу";

            const description =
                product.querySelector("p")?.textContent ||
                "Современная мебель для вашего дома.";

            let image = "";

            const photo =
                product.querySelector(".product-photo");

            if (photo) {
                const style =
                    window.getComputedStyle(photo);

                image =
                    style.backgroundImage
                        .replace(/^url\(["']?/, "")
                        .replace(/["']?\)$/, "");
            }

            openProduct(
                title,
                price,
                description,
                image
            );
        });

    });

});
