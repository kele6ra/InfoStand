function clock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let ac2Time = 0;
    let ac2Date = 0;

    if (((hours % 3 == 0) || (hours == 0)) && (minutes == 0) && (seconds == 0)) {
        getForecast();
        $('.ac2-slider_news').owlCarousel('destroy');
        $('.ac2-slider_news').empty();
        parseDataFromTutBy();
        parseDataFromTutByTimeout();
    }

    if (((minutes % 10 == 0) || (minutes == 0)) && (seconds == 0)) {
        getWeather();
    }

    if ((hours == 1) && (minutes == 0) && (seconds == 0)) {
        $('.ac2-slider_afisha').owlCarousel('destroy');
        $('.ac2-slider_afisha').empty();
        parseDataFromMogilevKino();
        parseDataFromMogilevKinoTimeout();
    }

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    ac2Time = hours + ":" + minutes + ":" + seconds;
    ac2Date = day + "." + month + "." + year;

    document.getElementsByClassName("ac2-top_time")[0].innerHTML = ac2Time;
    document.getElementsByClassName("ac2-top_date")[0].innerHTML = ac2Date;

    setTimeout("clock()", 1000);
};

function getForecast() {
    const cityID = 625665;
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + cityID + '&cnt=5&units=metric&APPID=52827ce67cdeeaaf0c60c4b244f1bf10',
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            let date;
            let day;
            let month;
            for (let i = 0; i < 5; i++) {
                let dayForecast;
                date = new Date(data.list[i].dt * 1000);
                day = date.getDate();
                month = date.getMonth() + 1;
                if (day < 10) {
                    day = "0" + day;
                }
                if (month < 10) {
                    month = "0" + month;
                }
                dayForecast = "<div>" + day + "." + month + "</div>";
                dayForecast += "<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></img>";
                dayForecast += "<div>" + Math.round(data.list[i].temp.day) + "&nbsp;C&deg;&nbsp;" + Math.round(data.list[i].temp.night) + "&nbsp;C&deg;</div>";
                document.getElementsByClassName("ac2-top_forecast")[i].innerHTML = dayForecast;
            }
        }
    });
}

function getWeather() {
    const cityID = 625665;
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&units=metric&APPID=52827ce67cdeeaaf0c60c4b244f1bf10",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            let temp = "<div>" + Math.round(data.main.temp) + "&nbsp;C&deg;</div>";
            let icon = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'></img>";
            document.getElementsByClassName("ac2-top_weather")[0].innerHTML = icon + temp;
        }
    });
}

function getCurrency() {
    $.ajax({
        url: " http://www.nbrb.by/API/ExRates/Rates?Periodicity=0",
        type: "GET",
        dataType: "json",
        success: function (data) {
            let currencyTable = '';
            for (let i = 0; i < data.length; i++) {
                if ((data[i].Cur_ID == '145') || (data[i].Cur_ID == '292') || (data[i].Cur_ID == '298')) {
                    currencyTable += "<div class=\"ac2-top_currencyRow\"><div>" + data[i].Cur_Abbreviation + "</div>" + "<div>" + data[i].Cur_OfficialRate + "</div></div>";
                }
            }
            document.getElementsByClassName("ac2-top_currencyTable")[0].innerHTML = currencyTable;
        }
    });
}

function parseDataFromMogilevKino() {
    let kinoImages = [];
    let kinoGallery = '';
    let i;

    getData('http://mogilevkino.by', function (data) {
        let html = document.createElement('div');
        let element;
        html.innerHTML = data;
        element = html.querySelectorAll('#movie-carousel img');
        for (i = 0; i < element.length; i++) {
            kinoImages[i] = element[i].src;
            kinoImages[i] = kinoImages[i].replace("w=162&h=243&q=250", "w=243&h=364&q=500");
        }
        kinoGallery = '';
        for (i = 0; i < kinoImages.length; i++) {
            kinoGallery += "<div><img src='" + kinoImages[i] + "'></img></div>";
        }

        document.getElementsByClassName("ac2-slider_afisha")[0].innerHTML = kinoGallery;
    });
}

function parseDataFromMogilevKinoTimeout() {
    setTimeout(function () {
        if (document.getElementsByClassName("ac2-slider_afisha")[0].children.length > 0) {
            $('.ac2-slider_afisha').owlCarousel({
                items: 4,
                loop: true,
                margin: 10,
                autoplay: true,
                autoplayTimeout: 10000,
                autoplayHoverPause: true,
                dots: false
            });
        } else {
            parseDataFromMogilevKinoTimeout();
        }
    }, 500);
}


function parseDataFromTutBy() {
    getData('https://news.tut.by/rss/geonews/mogilev.rss', function (data) {
        document.getElementsByClassName("ac2-slider_news")[0].innerHTML = '';
        let i = 0;
        $(data).find("item").each(function (i) { // or "item" or whatever suits your feed
            var el = $(this);
            i++;
            if (i < 15) {
                let title = el.find("title").text();
                let description = el.find("description").text().replace("thumbnails/", "");
                description = description.replace("height=\"48\"", "height=\"254\"");
                description = description.replace("height=\"54\"", "height=\"254\"");
                if (description.indexOf("*На правах рекламы") == -1) {
                    document.getElementsByClassName("ac2-slider_news")[0].innerHTML += "<div class=\"ac2-news\"><div class=\"ac2-news_title ac2-text ac2-text_common ac2-text__bold\">" + title + "</div><div class=\"ac2-text ac2-text_news\">" + description + "</div></div></div>";
                }
            }
        });
    });

}

function parseDataFromTutByTimeout() {
    setTimeout(function () {
        if (document.getElementsByClassName("ac2-slider_news")[0].children.length > 0) {
            $('.ac2-slider_news').owlCarousel({
                items: 3,
                loop: true,
                margin: 10,
                autoplay: true,
                autoplayTimeout: 10000,
                autoplayHoverPause: true,
                dots: false
            });
        } else {
            parseDataFromTutByTimeout();
        }
    }, 500);
}

function getData(url, c) {
    request(new XMLHttpRequest());
    function request(xhr) {
        xhr.open('GET', 'https://cors-escape.herokuapp.com/' + url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    c(xhr.responseText);
                }
            }
        }
    }
}

function runNextVideo(videoCount) {
    const maxNumber = 2;
    let videoPlayer = document.getElementsByClassName("ac2-video")[0];
    if (videoCount != 0) {
        videoCount = videoCount.substr(videoCount.indexOf('video/') + 6, 1);
        videoCount++;
    } else {
        videoCount = 1;
    }

    if (videoCount > maxNumber) {
        videoCount = 1;
    }

    let nextVideo = "video/" + videoCount + ".mp4";
    videoPlayer.src = nextVideo;
    let playPromise = videoPlayer.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
        })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
            });
    }
    videoCount++;
};