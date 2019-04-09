class Apps {
    constructor(openPage) {
        this.name = "Apps";
        this.openPage = openPage;
        $('.as2-wrap__page').empty();
        this.showAppsPage();
        this.button = document.querySelectorAll('.as2-apps__button');
        this.setButtonsEvents();
    }

    closePage(){
        this.button[0].removeEventListener("click", (e) => {
            this.openPage("Home");
        });
        this.button[1].removeEventListener("click", (e) => {
            this.openPage("Forecast");
        });
    }

    showAppsPage(){
        $('.as2-wrap__page').append('<div class="as2-apps"></div>');
        $('.as2-apps').append('<button class="as2-apps__button"><img class="as2-apps__buttonImg" src="img/home.svg"></button>');
        $('.as2-apps').append('<button class="as2-apps__button"><img class="as2-apps__buttonImg" src="img/forecast.svg"></button>');
    }

    setButtonsEvents(){
        this.button[0].addEventListener("click", (e) => {
            this.openPage("Home");
        });
        this.button[1].addEventListener("click", (e) => {
            this.openPage("Forecast");
        });
        
    }

}