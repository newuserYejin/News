const API_KEY = 'feaeef5a51ef41c49fceb7a0ca1046bb'
let newsList = []
const menus = document.querySelectorAll(".menus button")
const side_menus = document.querySelectorAll(".side_menu .menu_button button")
const side_menuArea = document.querySelector(".side_menu")
const userInput = document.querySelector("#searchInput")
const searchButton = document.querySelector("#searchButton")
const bar_menuIcon = document.querySelector(".bar_menu i")
const side_closeButton = document.querySelector(".side_menu i")
let url = new URL('https://myfirstnewspage.netlify.app/top-headlines')

const getNews = async () => {
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    return newsList
}

const getLatesNews = async () => {
    url = new URL('https://myfirstnewspage.netlify.app/top-headlines')

    await getNews()

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
        userInput.value = ""
    })
})

side_menus.forEach((menu) => {
    return menu.addEventListener("click", (event) => {
        getNewsByCategory(event)
        side_menuArea.classList.toggle("show-menu");
    })
})

bar_menuIcon.addEventListener("click", () => {
    side_menuArea.classList.toggle("show-menu");
})

side_closeButton.addEventListener("click", () => {
    side_menuArea.classList.toggle("show-menu");
})

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    console.log(category)
    url = new URL(`https://myfirstnewspage.netlify.app/top-headlines?category=${category}`)

    await getNews()

    render(newsList)
}

const getNewsByKeyword = async () => {
    const keyword = userInput.value
    console.log(keyword)

    url = new URL(`https://myfirstnewspage.netlify.app/top-headlines?q=${keyword}`)

    await getNews()

    console.log("length:", newsList.articles)

    // if (!data.articles || data.articles.length === 0) {         // 검색 결과가 없을때   
    //     render()
    // } else {
    //     render(newsList)
    // }

    if (newsList.length === 0) {
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

const inputArea_input = document.querySelector(".inputArea div")

function show_input() {
    inputArea_input.classList.toggle("hidden")
}

getLatesNews()          // 함수 부르는거 까먹지 말기



