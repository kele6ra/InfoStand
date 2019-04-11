class Panel {
    constructor() {
        this.page = new Home();
        this.addNavigationMenu();
        this.addPageNavigationButtons();
        this.prevPage = "Home";
        this.openBoundFunction = this.openPage.bind(this);


        setTimeout(() => {
            this.checkPageSize();
        }, 200);
    }

    addNavigationMenu() {
        let NavigationMenu = '<div class="as2-navigation">';
        NavigationMenu += '<div class="as2-navigation__column as2-navigation__scrollButtons">';
        NavigationMenu += '<button class="as2-navigation__button as2-navigation__button_small"><img class ="as2-navigation__buttonImg" src="img/expand_less.svg"></img></button>';
        NavigationMenu += '<button class="as2-navigation__button as2-navigation__button_small"><img class ="as2-navigation__buttonImg" src="img/expand_more.svg"></img></button>';
        NavigationMenu += '</div>';
        NavigationMenu += '<div class="as2-navigation__column">';
        NavigationMenu += '<button class="as2-navigation__button"><img class ="as2-navigation__buttonImg" src="img/apps.svg"></img></button>';
        NavigationMenu += '</div>';
        NavigationMenu += '<div class="as2-navigation__column">';
        NavigationMenu += '<button class="as2-navigation__button"><img class ="as2-navigation__buttonImg" src="img/arrow_back.svg"></img></button>';
        NavigationMenu += '</div></div>';
        $('.as2-wrap__navigation').append(NavigationMenu);
        this.navigationButtons = document.querySelectorAll('.as2-navigation__button');
        this.navigationButtons[0].addEventListener("click", (e) => {
            this.scrollPage('toTop');
        });
        this.navigationButtons[1].addEventListener("click", (e) => {
            this.scrollPage('toBottom');
        });
        this.navigationButtons[2].addEventListener("click", (e) => {
            this.openPage('Apps');
        });
        this.navigationButtons[3].addEventListener("click", (e) => {
            this.openPrevPage();
        });
    }

    addPageNavigationButtons() {
        this.pageElement = document.querySelector('.as2-wrap__page');
        let NavigationButtons = '<div class="as2-button as2-button__pageNavigation as2-button__pageNavigation_prev"><img src="img/left-chevron.svg"></img></div>';
        NavigationButtons += '<div class="as2-button as2-button__pageNavigation as2-button__pageNavigation_next"><img src="img/right-chevron.svg"></img></div>';
        $('.as2-wrap__page').append(NavigationButtons);
        this.pageButtons = document.querySelectorAll('.as2-button__pageNavigation');
        this.makePageNavigationVisible(false);
        this.pageButtons[0].addEventListener("click", (e) => {
            this.changePage("prev");
        });
        this.pageButtons[1].addEventListener("click", (e) => {
            this.changePage("next");
        });
        this.pageElement.addEventListener("mouseover", (e) => {
            this.makePageNavigationVisible(true);
        });
        this.pageElement.addEventListener("mouseout", (e) => {
            this.makePageNavigationVisible(false);
        });
    }

    checkPageSize() {
        const content = document.querySelector('.as2-wrap__page');
        if (content.scrollHeight > content.clientHeight) {
            $('.as2-navigation__scrollButtons').css('visibility', 'visible');
        } else {
            $('.as2-navigation__scrollButtons').css('visibility', 'hidden');
        }
    }

    makePageNavigationVisible(visible) {
        if (visible) {
            $('.as2-button__pageNavigation').css('visibility', 'visible');
        } else {
            $('.as2-button__pageNavigation').css('visibility', 'hidden');
        }
    }

    scrollPage(destination) {
        const content = document.querySelector('.as2-wrap__page');
        switch (destination) {
            case "toTop":
                content.scrollTop -= content.clientHeight;
                break;
            case "toBottom":
                content.scrollTop += content.clientHeight;
                break;
            default:
                break;
        }
    }

    openPage(newPage) {
        console.log("prevPage:" +  this.prevPage + ", currentPage:" + this.page.name);
        this.prevPage = this.page.name == this.prevPage ? this.prevPage : this.page.name;
        console.log("prevPageAfter:" +  this.prevPage + ", currentPageAfter:" + this.page.name);
        this.page.closePage();
        switch (newPage) {
            case "Home":
                this.page = new Home();
                this.addPageNavigationButtons();
                this.makePageNavigationVisible(false);
                break;
            case "Apps":
                this.page = new Apps(this.openBoundFunction);
                break;
            case "Forecast":
                this.page = new Forecast();
                this.addPageNavigationButtons();
                this.makePageNavigationVisible(false);
                break;
            case "Game":
                this.page = new Game();
                this.addPageNavigationButtons();
                this.makePageNavigationVisible(false);
                break;
            default:
                break;
        }

        setTimeout(() => {
            this.checkPageSize();
        }, 200);
    }

    changePage(pageButton) {
        if (pageButton == "next") {
            switch (this.page.name) {
                case "Home":
                    this.openPage("Forecast");
                    break;
                case "Forecast":
                    this.openPage("Game");
                    break;
                case "Game":
                    this.openPage("Home");
                    break;
                default:
                    break;
            }
        } else if (pageButton == "prev") {
            switch (this.page.name) {
                case "Home":
                    this.openPage("Game");
                    break;
                case "Forecast":
                    this.openPage("Home");
                    break;
                case "Game":
                    this.openPage("Forecast");
                    break;
                default:
                    break;
            }
        }
    }

    openPrevPage() {
        this.openPage(this.prevPage)
    }
}
