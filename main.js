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
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search")
            }
            newsList = data.articles
            render()
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        console.log("error: ", error.message)
        errorRender(error.message)
    }
}

const getLatesNews = async () => {
    url = new URL(
        'https://myfirstnewspage.netlify.app/top-headlines'
    )
    getNews()
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    url = new URL(`https://myfirstnewspage.netlify.app/top-headlines?category=${category}`)

    getNews()
}

const getNewsByKeyword = async () => {
    const keyword = userInput.value
    console.log(keyword)

    url = new URL(`https://myfirstnewspage.netlify.app/top-headlines?q=${keyword}`)

    getNews()
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

const errorRender = (errorMessage) => {
    const errorHTML = `
    <div class="alert alert-danger">
        <div class="none_news">${errorMessage}</div>
    </div>
    `

    document.getElementById("news_board").innerHTML = errorHTML
}

getLatesNews()          // 함수 부르는거 까먹지 말기



