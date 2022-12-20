
const button = document.querySelector("#generate-quote");
const quoteArea = document.querySelector("#quote")
const loadingScreen = document.querySelector(".center")


button.addEventListener('click', () => {
    const quoteSection = document.getElementById("quote")
    quoteSection.querySelector("blockquote").innerText = "";
    quoteSection.querySelector(".img").innerHTML = null;

    console.log(quoteSection.querySelector(".img"))

    const getQuote = async () => {
        loadingScreen.style.display = "block";
        console.log("Loading...");
        let request = await fetch("https://thatsthespir.it/api")
        let data = await request.json();
        return data;
    };

    try {
        getQuote().then(quote => {
            const spanImg = document.querySelector(".img")
            spanImg.innerHTML = null;
            console.log("Quote: ", quote);
            const divQuote = document.getElementById("quote");
            const quoteBlock = divQuote.querySelector("blockquote");
            quoteBlock.innerText = quote.quote;

            const author = quoteArea.querySelector(".author");

            author.innerText = quote.author;
            if (quote.photo !== '') {
                spanImg.style.display = "block";
                let newImg = document.createElement("img");

                newImg.setAttribute("src", quote.photo);
                newImg.setAttribute("alt", quote.author);
                newImg.classList = "author-pic"
                spanImg.appendChild(newImg)
            } else {
                spanImg.style.display = "none";
                return;
            }

            loadingScreen.style.display = "none";
            console.log("coucou")

        })

        quoteArea.style.opacity = 1;
        loadingScreen.style.opacity = 0;

    } catch (error) {
        window.alert(error)
    }
});
