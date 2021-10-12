import json
import requests
from dotenv import dotenv_values
import tmdbsimple as tmdb
from flask import Flask, session, redirect, url_for, escape, request
import constants

base_api_endpoint = f'/api/v{constants.API_VERSION}'
tmdb_base_api_endpoint = 'https://api.themoviedb.org/3'
tmdb_api_key = dotenv_values(".env")["API_KEY"]
app = Flask(__name__)


def get_country(ip_address):
    try:
        response = requests.get("http://ip-api.com/json/{}".format(ip_address))
        country = response.json()['countryCode']
        return country
    except Exception as e:
        return "Unknown"

def get_genres(type):
    if type == "movies":
        tmdb_genre_endpoint = f'{tmdb_base_api_endpoint}/genre/movie/list?api_key={tmdb_api_key}'
    elif type == "tv":
        tmdb_genre_endpoint = f'{tmdb_base_api_endpoint}/genre/tv/list?api_key={tmdb_api_key}'
    else:
        raise NotImplementedError
    response = requests.get(tmdb_genre_endpoint)
    genres = response.json()['genres']
    return genres

@app.route('/welcome/', methods=['GET'])
def welcome():
    return "Welcome to localhost:5050"

# A route to get/set the user's desired media type.
@app.route(f'{base_api_endpoint}/media_type', methods=['GET', 'POST'])
def api_media_type():
    if request.method == 'POST':
        media_type = request.args.get('mediaType')
        session['mediaType'] = media_type
        return media_type
    if session['mediaType']:
        return session['mediaType']
    return

# A route to get/set the user's region.
@app.route(f'{base_api_endpoint}/region', methods=['GET', 'POST'])
def api_region():
    if request.method == 'POST':
        country = request.args.get('countryCode')
        session['countryCode'] = country
        return country
    if session.get('countryCode'):
        return session['countryCode']
    country = get_country(request.remote_addr)
    session['countryCode'] = country
    return country

# A route to get movie genres from TMDb
@app.route(f'{base_api_endpoint}/movie/genres', methods=['GET'])
def api_movie_genres():
    if session.get('movie_genres'):
        return session['movie_genres']
    genres = get_genres("movie")
    session['movie_genres'] = genres
    return genres

# A route to get TV genres from TMDb
@app.route(f'{base_api_endpoint}/tv/genres', methods=['GET'])
def api_tv_genres():
    if session.get('tv_genres'):
        return session['tv_genres']
    genres = get_genres("tv")
    session['tv_genres'] = genres
    return genres

if __name__ == '__main__':
    app.secret_key = 'floridasux'
    app.run(host='0.0.0.0', port=5050)

# tmdb.API_KEY = dotenv_values(".env")["API_KEY"]
#
# movie = tmdb.Movies(603)
# response = movie.info()
# # print(json.dumps(response, indent=2))
# print(json.dumps(movie, indent=2))
