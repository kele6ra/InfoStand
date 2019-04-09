class CityGuide{
    constructor() {
        this.name = "Home";
        $('.as2-wrap__page').empty();
        this.clockTimerId;
        this.weatherTimerId;
        this.showHomePage();
      }
    
      closePage() {
        clearTimeout(this.clockTimerId);
        clearTimeout(this.weatherTimerId);
      }
}