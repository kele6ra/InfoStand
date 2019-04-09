class Forecast {
    constructor() {
        this.name = "Forecast";
        $('.as2-wrap__page').empty();
        this.showForecastPage();
        this.forecatTimerId = 0;
    }

    closePage() {

    }

    showForecastPage() {
        $('.as2-wrap__page').append('<div class="as2-forecast"></div>');
        this.showForecast();
        this.forecatTimerId = setTimeout(() => {
            this.forecastTimeout();
        }, this.getMilisecondsToTomorrow());
    }

    forecastTimeout() {
        $.get("http://api.openweathermap.org/data/2.5/forecast/daily?id=625665&cnt=7&units=metric&APPID=52827ce67cdeeaaf0c60c4b244f1bf10",
            (data) => {
                let formatter = new Intl.DateTimeFormat("ru", {
                    day: "numeric",
                    month: "numeric",
                    weekday: "short"
                });
                let forecastRows = document.querySelectorAll('.as2-forecast__row');
                for (let i = 0; i < 7; i++) {
                    let dayForecast;
                    dayForecast = '<div class = "as2-forecast__row">';
                    dayForecast += '<div>' + formatter.format(new Date(data.list[i].dt * 1000)) + '</div>';
                    dayForecast += '<div>' + Math.round(data.list[i].temp.day) + 'C&deg;';
                    dayForecast += '<img class = "as2-forecast__img" src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png"></img></div>';
                    dayForecast += '<div>' + Math.round(data.list[i].temp.night) + 'C&deg;';
                    dayForecast += '<img class = "as2-forecast__img" src="http://openweathermap.org/img/w/01n.png"></img></div>';
                    dayForecast += '</div>';
                    forecastRows[i].innerHTML = dayForecast;
                }
            }, "json");

        this.forecatTimerId = setTimeout(() => {
            this.forecastTimeout();
        }, this.getMilisecondsToTomorrow());
    }

    showForecast() {
        $.get("http://api.openweathermap.org/data/2.5/forecast/daily?id=625665&cnt=7&units=metric&APPID=52827ce67cdeeaaf0c60c4b244f1bf10",
            (data) => {
                let formatter = new Intl.DateTimeFormat("ru", {
                    day: "numeric",
                    month: "numeric",
                    weekday: "short"
                });
                for (let i = 0; i < 7; i++) {
                    let dayForecast;
                    dayForecast = '<div class = "as2-forecast__row">';
                    dayForecast += '<div>' + formatter.format(new Date(data.list[i].dt * 1000)) + '</div>';
                    dayForecast += '<div>' + Math.round(data.list[i].temp.day) + 'C&deg;';
                    dayForecast += '<img class = "as2-forecast__img" src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png"></img></div>';
                    dayForecast += '<div>' + Math.round(data.list[i].temp.night) + 'C&deg;';
                    dayForecast += '<img class = "as2-forecast__img" src="http://openweathermap.org/img/w/01n.png"></img></div>';
                    dayForecast += '</div>';
                    $('.as2-forecast').append(dayForecast);
                }
            }, "json");
    }

    getMilisecondsToTomorrow() {
        let now = new Date();
        let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        return (tomorrow - now + 1000);
    }

}