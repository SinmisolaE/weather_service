$(document).ready(function() {
    $('#weather_form').on('submit', function(event) {
        event.preventDefault();

        const city = $('INPUT#cityName').val();
        if (city) {
            $.ajax({
                url: '/weather',
                method: 'GET',
                data: {city: city},
                success: function(data) {
                    if (data.error) {
                        alert('Error: ' + data.error);
                    } else{
                        updateWeather(data);

                        $.ajax ({
                            url: '/forecast',
                            method: 'GET',
                            data: {city: city},
                            success: function(data) {
                                if (data.error) {
                                    alert('Error: ' + data.error);
                                } else {
                                    updateForecast(data);
                                }
                            }

                        })
                    }
                }
            })
        }
    })
})

function updateWeather(data) {
    $('#icon').attr('src', `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`);
    $('#weather-temp').text(data["main"]["temp"] + " °C");
    $('#condition').text(data["weather"][0]["description"]);
    $('#wind-speed').text("Wind: " + data["wind"]["speed"] + " m/s");
    $('#humid').text("Humidty: " + data["main"]["humidity"] + "%");
    $('#pressure').text("Pressure: " + data["main"]["pressure"] + " hpa");
}

function updateForecast(data) {
    $('#fore_heading').text("FORECASTS")

    // day one of forecast
    $('#fore_icon_1').attr('src', `https://openweathermap.org/img/wn/${data["list"][7]["weather"][0]["icon"]}@2x.png`);
    $('#fore_temp_1').text(data["list"][7]["main"]["temp"] + " °C");
    $('#wind-speed_1').text(data["list"][7]["wind"]["speed"] + " m/s");
    $('#day_1').text(get_date(data["list"][7]["dt"]));
    $('#condition_1').text(data["list"][7]["weather"][0]["description"]);
    $('#wind-speed_1').text("Wind: " + data["list"][7]["wind"]["speed"] + " m/s");
    $('#humid_1').text("Humidty: " + data["list"][7]["main"]["humidity"] + "%");
    $('#pressure_1').text("Pressure: " + data["list"][7]["main"]["pressure"] + " hpa");

    //day two of forecast
    $('#fore_icon_2').attr('src', `https://openweathermap.org/img/wn/${data["list"][15]["weather"][0]["icon"]}@2x.png`);
    $('#fore_temp_2').text(data["list"][15]["main"]["temp"] + " °C");
    $('#wind-speed_2').text(data["list"][15]["wind"]["speed"] + " m/s");
    $('#day_2').text(get_date(data["list"][15]["dt"]));
    $('#condition_2').text(data["list"][15]["weather"][0]["description"]);
    $('#wind-speed_2').text("Wind: " + data["list"][15]["wind"]["speed"] + " m/s");
    $('#humid_2').text("Humidty: " + data["list"][15]["main"]["humidity"] + "%");
    $('#pressure_2').text("Pressure: " + data["list"][15]["main"]["pressure"] + " hpa");

    // day three of forecast
    $('#fore_icon_3').attr('src', `https://openweathermap.org/img/wn/${data["list"][23]["weather"][0]["icon"]}@2x.png`);
    $('#fore_temp_3').text(data["list"][23]["main"]["temp"]+ " °C");
    $('#wind-speed_3').text(data["list"][23]["wind"]["speed"] + " m/s");
    $('#day_3').text(get_date(data["list"][23]["dt"]));
    $('#condition_3').text(data["list"][23]["weather"][0]["description"]);
    $('#wind-speed_3').text("Wind: " + data["list"][23]["wind"]["speed"] + " m/s");
    $('#humid_3').text("Humidty: " + data["list"][23]["main"]["humidity"] + "%");
    $('#pressure_3').text("Pressure: " + data["list"][23]["main"]["pressure"] + " hpa");

    // day four of forecast
    $('#fore_icon_4').attr('src', `https://openweathermap.org/img/wn/${data["list"][31]["weather"][0]["icon"]}@2x.png`);
    $('#fore_temp_4').text(data["list"][31]["main"]["temp"]+ " °C");
    $('#wind-speed_4').text(data["list"][31]["wind"]["speed"] + " m/s");
    $('#day_4').text(get_date(data["list"][31]["dt"]));
    $('#condition_4').text(data["list"][31]["weather"][0]["description"]);
    $('#wind-speed_4').text("Wind: " + data["list"][31]["wind"]["speed"] + " m/s");
    $('#humid_4').text("Humidty: " + data["list"][31]["main"]["humidity"] + "%");
    $('#pressure_4').text("Pressure: " + data["list"][31]["main"]["pressure"] + " hpa");

    // day five of forecast
    $('#fore_icon_5').attr('src', `https://openweathermap.org/img/wn/${data["list"][39]["weather"][0]["icon"]}@2x.png`);
    $('#fore_temp_5').text(data["list"][39]["main"]["temp"]+ " °C");
    $('#wind-speed_5').text(data["list"][39]["wind"]["speed"] + " m/s");
    $('#day_5').text(get_date(data["list"][39]["dt"]));
    $('#condition_5').text(data["list"][39]["weather"][0]["description"]);
    $('#wind-speed_5').text("Wind: " + data["list"][39]["wind"]["speed"] + " m/s");
    $('#humid_5').text("Humidty: " + data["list"][39]["main"]["humidity"] + "%");
    $('#pressure_5').text("Pressure: " + data["list"][39]["main"]["pressure"] + " hpa");
}

function get_date(data) {
    timestamp = data * 1000
    date = new Date(timestamp)
    options = {weekday: 'short'}
    day = date.toLocaleDateString('en-US', options)
    console.log(day)
    return(day)
}
