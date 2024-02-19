const API_KEY = 'feaeef5a51ef41c49fceb7a0ca1046bb'
let news = []

const getLatesNews = async () => {
    const url = new URL(
        // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        'https://myfirstnewspage.netlify.app/top-headlines'
    )
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log("data: ", news)
}

getLatesNews()          // 함수 부르는거 까먹지 말기

