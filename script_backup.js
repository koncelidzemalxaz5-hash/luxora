function contact(product) {
    const phone = "995XXXXXXXXX";

    const text =
        "Здравствуйте! Меня интересует: " +
        product;

    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(text);

    window.open(url, "_blank");
}
