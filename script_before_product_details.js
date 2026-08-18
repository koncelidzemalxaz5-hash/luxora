let selectedCategory = "all";

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

/* ==================================================
   ФИЛЬТРАЦИЯ КАТАЛОГА
   ================================================== */

function filterProducts(category, button) {

    selectedCategory = category;

    const buttons =
        document.querySelectorAll(".category-btn");

    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    filterCatalog();
}


function filterCatalog() {

    console.log("SEARCH DEBUG: filterCatalog запущен");

    const products =
        Array.from(document.querySelectorAll(".product"));

    const searchInput =
        document.getElementById("catalogSearch");

    const priceInput =
        document.getElementById("maxPrice");

    const search =
        (searchInput?.value || "").toLowerCase().trim();

    console.log("SEARCH DEBUG:", {
        search: search,
        products: products.length,
        selectedCategory: selectedCategory
    });

    const maxPrice =
        Number(priceInput?.value || 0);

    let visibleCount = 0;

    products.forEach(function(product) {

        const title =
            product.querySelector("h3")?.textContent
            .toLowerCase() || "";

        const description =
            product.querySelector("p")?.textContent
            .toLowerCase() || "";

        const priceText =
            product.querySelector("strong")?.textContent || "";

        const price =
            Number(
                priceText
                    .replace(/[^\d]/g, "")
            );

        const categoryMatch =
            selectedCategory === "all" ||
            product.classList.contains(selectedCategory);

        const searchMatch =
            !search ||
            title.includes(search) ||
            description.includes(search);

        const priceMatch =
            maxPrice === 0 ||
            price <= maxPrice;

        if (
            categoryMatch &&
            searchMatch &&
            priceMatch
        ) {

            product.style.display = "";
            visibleCount++;

        } else {

            product.style.display = "none";

        }

    });

    updateEmptyCatalogMessage(visibleCount);
}


function updateEmptyCatalogMessage(count) {

    let message =
        document.getElementById("catalogEmpty");

    if (!message) {

        message =
            document.createElement("div");

        message.id = "catalogEmpty";
        message.className = "catalog-empty";

        const products =
            document.querySelector(".products");

        if (products) {
            products.parentNode.insertBefore(
                message,
                products.nextSibling
            );
        }
    }

    if (count === 0) {

        message.textContent =
            "Ничего не найдено. Попробуйте изменить поиск или цену.";

        message.style.display = "block";

    } else {

        message.style.display = "none";
    }
}


function sortCatalog() {

    const sort =
        document.getElementById("sortProducts")?.value;

    const container =
        document.querySelector(".products");

    if (!container) return;

    const products =
        Array.from(
            container.querySelectorAll(".product")
        );

    products.sort(function(a, b) {

        const priceA =
            Number(
                a.querySelector("strong")?.textContent
                .replace(/[^\d]/g, "") || 0
            );

        const priceB =
            Number(
                b.querySelector("strong")?.textContent
                .replace(/[^\d]/g, "") || 0
            );

        if (sort === "low") {
            return priceA - priceB;
        }

        if (sort === "high") {
            return priceB - priceA;
        }

        return 0;
    });

    products.forEach(function(product) {
        container.appendChild(product);
    });

    filterCatalog();
}

