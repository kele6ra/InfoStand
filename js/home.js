'use strict';

class Home {
  constructor() {
    this.name = "Home";
    $('.as2-wrap__page').empty();
    this.clockTimerId;
    this.weatherTimerId;
  }

  closePage(){
    clearTimeout(this.clockTimerId);
    clearTimeout(this.weatherTimerId);
  }

  getTime() {
    let formatter = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    return (formatter.format(new Date()));
  }

  getDate() {
    let formatter = new Intl.DateTimeFormat("ru", {
      month: "long",
      day: "numeric"
    });
    return (formatter.format(new Date()));
  }

  getWeekday() {
    let formatter = new Intl.DateTimeFormat("ru", {
      weekday: "long"
    });
    return (formatter.format(new Date()));
  }

  showHomePage() {
    $('.as2-wrap__page').append('<div class="as2-home"></div>');
    this.showHeader();
    this.showDate();
    this.showTime();
    this.showWeekday();
    this.showWeather();

    this.clockTimerId = setTimeout(() => {
      this.clockTimeout();
    }, 1000);

    this.weatherTimerId = setTimeout(() => {
      this.weatherTimeout();
    }, 60000);
  }

  showHeader() {
    $('.as2-home').append('<div class="as2-home__row as2-home__row_header">Могилёв</div>');
  }

  showDate() {
    $('.as2-home').append('<div class="as2-home__row as2-home__row_date">' + this.getDate() + '</div>');
  }

  showWeekday() {
    $('.as2-home').append('<div class="as2-home__row as2-home__row_weekday">' + this.getWeekday() + '</div>');
  }

  showTime() {
    $('.as2-home').append('<div class="as2-home__row as2-home__row_time">' + this.getTime() + '</div>');
  }

  clockTimeout() {
    $(".as2-home__row_time").html(this.getTime());
    if ($('.as2-home__row_date').text() != this.getDate()) {
      $(".as2-home__row_date").html(this.getDate());
      $(".as2-home__row_weekday").html(this.getWeekday());
    }

    this.clockTimerId = setTimeout(() => {
      this.clockTimeout();
    }, 1000);
  }

  weatherTimeout() {
    $.get("http://api.openweathermap.org/data/2.5/weather?id=625665&units=metric&APPID=52827ce67cdeeaaf0c60c4b244f1bf10",
      (data) => {
        let formatter = new Intl.DateTimeFormat("ru", {
          hour: "numeric",
          minute: "numeric",
        });
        let weatherTable = document.querySelectorAll(".as2-home__row_weather");
        weatherTable[0].innerHTML = Math.round(data.main.temp) + '&nbsp;C&deg;<img class ="as2-home__img" src="http://openweathermap.org/img/w/' +
          data.weather[0].icon + '.png"></img>';
        weatherTable[1].innerHTML = Math.round(data.main.pressure * 0.750063755419211) + '&nbsp;мм.рт.ст.';
        weatherTable[2].innerHTML = Math.round(data.main.humidity) + '&nbsp;%';
        weatherTable[3].innerHTML = data.wind.speed + '&nbsp;м/с';
        weatherTable[4].innerHTML = '<img class ="as2-home__img" src="img/sunrise.png"></img>' + formatter.format(new Date(data.sys.sunrise * 1000)) +
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img class ="as2-home__img" src="img/sunset.png"></img>' + formatter.format(new Date(data.sys.sunset * 1000));
      }, "json");

      this.weatherTimerId = setTimeout(() => {
      this.weatherTimeout();
    }, 60000);
  }


  showWeather() {
    $.get("http://api.openweathermap.org/data/2.5/weather?id=625665&units=metric&APPID=52827ce67cdeeaaf0c60c4b244f1bf10",
      (data) => {
        let formatter = new Intl.DateTimeFormat("ru", {
          hour: "numeric",
          minute: "numeric",
        });
        $('.as2-home').append('<div class="as2-home__row as2-home__row_weather">' + Math.round(data.main.temp) +
          '&nbsp;C&deg;<img class ="as2-home__img" src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png"></img></div>');
        $('.as2-home').append('<div class="as2-home__row as2-home__row_weather">' + Math.round(data.main.pressure * 0.750063755419211) + '&nbsp;мм.рт.ст.</div>');
        $('.as2-home').append('<div class="as2-home__row as2-home__row_weather">' + Math.round(data.main.humidity) + '&nbsp;%</div>');
        $('.as2-home').append('<div class="as2-home__row as2-home__row_weather">' + data.wind.speed + '&nbsp;м/с</div>');

        $('.as2-home').append('<div class="as2-home__row as2-home__row_weather"><img class ="as2-home__img" src="img/sunrise.png"></img>' +
          formatter.format(new Date(data.sys.sunrise * 1000)) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img class ="as2-home__img" src="img/sunset.png"></img>' +
          formatter.format(new Date(data.sys.sunset * 1000)) + '</div>');
      }, "json");
  }
}