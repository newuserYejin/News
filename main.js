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

// 페이지네이션을 위한 변수들 세팅
let totalResults = 0
let page = 1
const pageSize = 15
const pageGroupSize = 5

const getNews = async () => {
    try {
        url.searchParams.set("page", page)       // &page라는 params 설정
        url.searchParams.set("pageSize", pageSize)

        const response = await fetch(url)

        const data = await response.json()
        console.log("data: ", data)
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search")
            }
            newsList = data.articles
            totalResults = data.totalResults
            console.log("totalResults~~:", totalResults)
            render()
            pagiNationRender()
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
    page = 1
    getNews()
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    url = new URL(`https://myfirstnewspage.netlify.app/top-headlines?category=${category}`)
    page = 1
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

const pagiNationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize)
    const pageGroup = Math.ceil(page / pageGroupSize)
    let lastPage = pageGroup * pageGroupSize
    let previousPageHTML = ``

    console.log("lastpage: ", lastPage)

    // 마지막 페이지 그룹의 그룹사이즈 보다 작으면 lastPage = totalPage
    if (lastPage > totalPages) {
        lastPage = totalPages
    }

    console.log("totalResults: ", totalResults)
    console.log("totalPages: ", totalPages)
    console.log("lastPage:", lastPage)

    const firstPage = lastPage - (pageGroupSize - 1) <= 0 ? 1 : lastPage - (pageGroupSize - 1)

    if (page > 1) {
        previousPageHTML = `
        <li class="page-item" onclick = "moveToPage(${1})">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" onclick = "moveToPage(${page - 1})">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&lt</span>
            </a>
        </li>
        `
    }

    let nextPageHTML = ``
    if (page < totalPages) {
        nextPageHTML = `
        <li class="page-item" onclick = "moveToPage(${page + 1})">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&gt</span>
            </a>
        </li>
        <li class="page-item" onclick = "moveToPage(${totalPages})">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        `
    }

    let pagiNationHTML = ``

    for (let i = firstPage; i <= lastPage; i++) {
        pagiNationHTML += `<li class="page-item ${i === page ? "active" : ""}" onclick = moveToPage(${i})><a class="page-link" href="#">${i}</a></li>`
    }

    if (totalPages > pageGroupSize) {
        document.querySelector(".pagination").innerHTML = previousPageHTML + pagiNationHTML + nextPageHTML
    } else {
        document.querySelector(".pagination").innerHTML = pagiNationHTML
    }
}

const moveToPage = (pageNum) => {              // 위에서 전달하는 i가 내가 현재 누르는 페이지의 정보를 가지고 있다
    console.log("moveToPage", pageNum)
    page = pageNum

    getNews()
}

getLatesNews()          // 함수 부르는거 까먹지 말기

/* <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav> */

