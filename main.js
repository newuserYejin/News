const API_KEY = 'feaeef5a51ef41c49fceb7a0ca1046bb'
let newsList = []
const menus = document.querySelectorAll(".menus button")
const userInput = document.querySelector("#searchInput")
const searchButton = document.querySelector("#searchButton")

const getLatesNews = async () => {
    const url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        'https://myfirstnewspage.netlify.app/top-headlines'
    )
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    console.log("data: ", newsList)
    render(newsList)
}

const render = (e) => {
    let newsHTML
    if (e) {
        newsHTML = newsList.map((news) => {
            return `
        <div class="news row">
            <div class="col-lg-4">
                <img class="news_img"
                    src=${news.urlToImage}>
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>${news.description}</p>
                <div>${news.source.name} ${news.publishedAt}</div>
            </div>
        </div>
        `
        }).join("")
    } else {                            // 검색 결과 없을때의 html
        newsHTML = `
        <div class="news">
            <div class="none_news">검색 결과 없음</div>
        </div>
        `
        console.log("결과 없음")
    }

    document.getElementById('news_board').innerHTML = newsHTML
}

menus.forEach((menu) => {
    return menu.addEventListener("click", (event) => {
        getNewsByCategory(event)
    })
})

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    console.log(category)
    const url = new URL(`https://myfirstnewspage.netlify.app/top-headlines?category=${category}`)

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    newsList = data.articles
    render(newsList)
}

const getNewsByKeyword = async () => {
    const keyword = userInput.value
    console.log(keyword)

    const url = new URL(`https://myfirstnewspage.netlify.app/top-headlines?q=${keyword}`)

    const response = await fetch(url)
    const data = await response.json();
    console.log("data :", data)

    newsList = data.articles
    console.log("length:", newsList.articles)
    if (!data.articles || data.articles.length === 0) {         // 검색 결과가 없을때   
        render()
    } else {
        render(newsList)
    }
}

userInput.addEventListener("keypress", function (event) {       // enter 키 이벤트 추가
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

getLatesNews()          // 함수 부르는거 까먹지 말기



