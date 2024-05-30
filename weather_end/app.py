""" Runs the flask application as well as the methods to implement the weather service"""

from flask import Flask, request, jsonify, render_template
import requests
import os


app = Flask(__name__)


api_key = 'c2e0e4f2cf6615c7bff539488fd08b31'

def get_lat_lon(city):
    # fetch geo codes location for the inputed city
    lat_long_url = f'https://api.openweathermap.org/geo/1.0/direct?q={city}&appid={api_key}'
    lat_long_response = requests.get(lat_long_url)
    if lat_long_response.status_code == 200:
        geo_data = lat_long_response.json()
        if geo_data:
            lat = geo_data[0]["lat"]
            lon = geo_data[0]["lon"]
            return lat, lon
        else:
            return ValueError('Not Found!')
    else:
        return ValueError(f'Error: {lat_long_response.status_code}')


@app.route('/')
def index():
    """ Renders the design once flask is running"""
    return render_template('weath.html')

@app.route('/weather', methods=['GET'])
def get_weather():
    """ Methods implements and return data for current weather information"""

    city = request.args.get('city')
    
    try:
        lat, lon = get_lat_lon(city)
    except ValueError as e:
        return jsonify({'Error': str(e)})
    
    #fetch the current weather condition
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={api_key}'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        print(data)
        return jsonify(data)
    else:
        return (jsonify({'Error': response.status_code}))


@app.route('/forecast', methods=['GET'])
def get_forecast():
    """ Implement and returns the forecast information of the inputed city"""

    city = request.args.get('city')

    try:
        lat, lon = get_lat_lon(city)
    except ValueError as e:
        return jsonify({'Error': str(e)})
    
    #fetch the forecast weather condition
    url = f'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={api_key}'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return (jsonify({'error: input again'}))

if __name__ == '__main__':
    app.run(debug=True)