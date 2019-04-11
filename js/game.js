class Game {
    constructor() {
        this.name = "Game";
        $('.as2-wrap__page').empty();
        this.showGamePage();
    }

    closePage() {
        
    }

    showGamePage() {
        $('.as2-wrap__page').append('<iframe class="as2-game" src="http://gameaboutsquares.com"></iframe>');
    }

  

}