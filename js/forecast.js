class Forecast {
    constructor() {
        this.name = "Forecast";
        $('.as2-wrap__page').empty();
        this.showForecastPage();
        this.forecastTimerId = 0;
    }

    closePage() {
        clearTimeout(this.forecastTimerId);
    }

    showForecastPage() {
        $('.as2-wrap__page').append('<div class="as2-forecast"></div>');
        this.showForecast();
        this.forecastTimerId = setTimeout(() => {
            this.forecastTimeout();
        }, this.getMillisecondsToTomorrow());
    }

    forecastTimeout() {
        $.get("http://api.openweathermap.org/data/2.5/forecast/daily?id=625665&cnt=5&units=metric&APPID=52827ce67cdeeaaf0c60c4b244f1bf10",
            (data) => {
                let formatterDate = new Intl.DateTimeFormat("ru", {
                    day: "numeric",
                    month: "numeric"
                });
                let formatterWeekday = new Intl.DateTimeFormat("ru", {
                    weekday: "short"
                });
                let forecastRows = document.querySelectorAll('.as2-forecast__row');
                for (let i = 0; i < 5; i++) {
                    let dayForecast;
                    dayForecast = '<div class = "as2-forecast__row">';
                    dayForecast += '<div>' + formatterWeekday.format(new Date(data.list[i].dt * 1000)) + '</div><div>' + formatterDate.format(new Date(data.list[i].dt * 1000)) + '</div>';
                    dayForecast += '<div><div>' + Math.round(data.list[i].temp.day) + 'C&deg;</div>';
                    dayForecast += '<img class = "as2-forecast__img" src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png"></img></div>';
                    dayForecast += '<div><div>' + Math.round(data.list[i].temp.night) + 'C&deg;</div>';
                    dayForecast += '<img class = "as2-forecast__img" src="http://openweathermap.org/img/w/01n.png"></img></div>';
                    dayForecast += '</div>';
                    forecastRows[i].innerHTML = dayForecast;
                }
            }, "json");

        this.forecastTimerId = setTimeout(() => {
            this.forecastTimeout();
        }, this.getMillisecondsToTomorrow());
    }

    showForecast() {
        $.get("http://api.openweathermap.org/data/2.5/forecast/daily?id=625665&cnt=5&units=metric&APPID=52827ce67cdeeaaf0c60c4b244f1bf10",
            (data) => {
                let formatterDate = new Intl.DateTimeFormat("ru", {
                    day: "numeric",
                    month: "numeric"
                });
                let formatterWeekday = new Intl.DateTimeFormat("ru", {
                    weekday: "short"
                });
                for (let i = 0; i < 5; i++) {
                    let dayForecast;
                    dayForecast = '<div class = "as2-forecast__row">';
                    dayForecast += '<div>' + formatterDate.format(new Date(data.list[i].dt * 1000)) + '</div><div>' + formatterWeekday.format(new Date(data.list[i].dt * 1000)) + '</div>';
                    dayForecast += '<div><div>' + Math.round(data.list[i].temp.day) + 'C&deg;</div>';
                    dayForecast += '<img class = "as2-forecast__img" src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png"></img></div>';
                    dayForecast += '<div><div>' + Math.round(data.list[i].temp.night) + 'C&deg;</div>';
                    dayForecast += '<img class = "as2-forecast__img" src="http://openweathermap.org/img/w/01n.png"></img></div>';
                    dayForecast += '</div>';
                    $('.as2-forecast').append(dayForecast);
                }
            }, "json");
    }

    getMillisecondsToTomorrow() {
        let now = new Date();
        let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        return (tomorrow - now + 1000);
    }

}