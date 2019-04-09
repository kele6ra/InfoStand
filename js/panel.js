class Panel {
    constructor() {
        this.page = new Home();
        this.addNavigationMenu();
        this.prevPage = "Home";
        this.openBoundFunction = this.openPage.bind(this);
        this.buttons = document.querySelectorAll('.as2-navigation__button');
        this.setButtonsEvents();
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
        NavigationMenu += '<button class="as2-navigation__button"><img class ="as2-navigation__buttonImg" src="img/menu.svg"></img></button>';
        NavigationMenu += '</div>';
        NavigationMenu += '<div class="as2-navigation__column">';
        NavigationMenu += '<button class="as2-navigation__button"><img class ="as2-navigation__buttonImg" src="img/arrow_back.svg"></img></button>';
        NavigationMenu += '</div></div>';
        $('.as2-wrap__navigation').append(NavigationMenu);
    }

    checkPageSize() {
        const content = document.querySelector('.as2-wrap__page');
        if (content.scrollHeight > content.clientHeight) {
            $('.as2-navigation__scrollButtons').css('visibility', 'visible');
        } else {
            $('.as2-navigation__scrollButtons').css('visibility', 'hidden');
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
        this.prevPage = this.page.name == this.prevPage ? this.prevPage : this.page.name;

        this.page.closePage();
        switch (newPage) {
            case "Home":
                this.page = new Home();
                break;
            case "Apps":
                this.page = new Apps(this.openBoundFunction);
                break;
            case "Forecast":
                this.page = new Forecast();
                break;
            default:
                break;
        }

        setTimeout(() => {
            this.checkPageSize();
        }, 200);
    }

    openPrevPage() {
        this.openPage(this.prevPage)
    }

    setButtonsEvents() {
        this.buttons[0].addEventListener("click", (e) => {
            this.scrollPage('toTop');
        });
        this.buttons[1].addEventListener("click", (e) => {
            this.scrollPage('toBottom');
        });
        this.buttons[2].addEventListener("click", (e) => {
            this.openPage('Apps');
        });
        this.buttons[3].addEventListener("click", (e) => {
            this.openPrevPage();
        });
    }
}
