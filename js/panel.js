class Panel {
    constructor() {
        this.page = new Home();
        this.addNavigationMenu();
        this.page.showHomePage();
        this.checkPageSize();
    }

    addNavigationMenu() {
        let NavigationMenu = '<div class="as2-navigation">';
        NavigationMenu +=  '<div class="as2-navigation__column">';
        NavigationMenu +=  '<button class="as2-navigation__smallButton"></button>';
        NavigationMenu +=  '<button class="as2-navigation__smallButton"></button>';
        NavigationMenu +=  '</div>';
        NavigationMenu +=  '<button class="as2-navigation__button"></button>';
        NavigationMenu +=  '<button class="as2-navigation__button"></button>';
        NavigationMenu +=  '</div>';
        $('.as2-wrap__navigation').append(NavigationMenu);
    }

    checkPageSize() {
        let page = document.querySelector('.as2-wrap__page');

        if (page.scrollHeight > page.clientHeight){
            $('.as2-navigation__column').css('visibility', 'visible');
        } else {
            $('.as2-navigation__column').css('visibility', 'hidden');
        }
    }

}