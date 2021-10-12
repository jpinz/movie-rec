import json
import requests
from dotenv import dotenv_values
import tmdbsimple as tmdb
from flask import Flask, session, redirect, url_for, escape, request
import constants
from tmdb.client import TMDbClient

env_values = dotenv_values(".env")

base_api_endpoint = f'/api/v{constants.API_VERSION}'
tmdb_api_key = dotenv_values(".env")["API_KEY"]
app = Flask(__name__)
tmdb_client = TMDbClient(tmdb_api_key)


def get_country(ip_address):
    try:
        response = requests.get("http://ip-api.com/json/{}".format(ip_address))
        country = response.json()['countryCode']
        return country
    except Exception as e:
        return "Unknown"

@app.route('/', methods=['GET'])
def welcome():
    return "Welcome to the Movie Recommender"


# A route to get/set the user's desired media type.
@app.route(f'{base_api_endpoint}/media_type', methods=['GET', 'POST'])
def api_media_type():
    if request.method == 'POST':
        media_type = request.json.get('mediaType')
        session['mediaType'] = media_type
        return media_type
    if session.get('mediaType'):
        return session['mediaType']
    return "No media type specified."


# A route to get/set the user's region.
@app.route(f'{base_api_endpoint}/region', methods=['GET', 'POST'])
def api_region():
    if request.method == 'POST':
        country = request.json.get('countryCode')
        session['countryCode'] = country
        return country
    if session.get('countryCode'):
        return session['countryCode']

    country = 'US'
    if app.debug:
        session['countryCode'] = country
        return country

    if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
        country = get_country(request.environ['REMOTE_ADDR'])
    else:
        country = get_country(request.environ['HTTP_X_FORWARDED_FOR'])
    session['countryCode'] = country
    return country

# A route to get movie genres from TMDb
@app.route(f'{base_api_endpoint}/movie/genres', methods=['GET'])
def api_movie_genres():
    if session.get('movie_genres'):
        return session['movie_genres']
    genres = tmdb_client.get_movie_genres()
    session['movie_genres'] = genres
    return genres

# A route to get TV genres from TMDb
@app.route(f'{base_api_endpoint}/tv/genres', methods=['GET'])
def api_tv_genres():
    if session.get('tv_genres'):
        return session['tv_genres']
    genres = tmdb_client.get_tv_genres()
    session['tv_genres'] = genres
    return genres

if __name__ == '__main__':
    app.secret_key = env_values['FLASK_SECRET']
    app.run(debug=True, host='0.0.0.0', port=5050)

#
# movie = tmdb.Movies(603)
# response = movie.info()
# # print(json.dumps(response, indent=2))
# print(json.dumps(movie, indent=2))
