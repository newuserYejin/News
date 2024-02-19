const API_KEY = 'feaeef5a51ef41c49fceb7a0ca1046bb'
let newsList = []

const getLatesNews = async () => {
    const url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        'https://myfirstnewspage.netlify.app/top-headlines'
    )
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    console.log("data: ", newsList)
    render()
}

const render = () => {
    const newsHTML = newsList.map((news) => {
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

    document.getElementById('news_board').innerHTML = newsHTML
}

getLatesNews()          // 함수 부르는거 까먹지 말기

