import hashlib
import json
import requests
from dotenv import dotenv_values
from flask import Flask, session, jsonify, url_for, escape, request
import constants
import tmdb
from tmdb.client import TMDbClient
from tmdb.constants import TMDbConstants

env_values = dotenv_values(".env")

base_api_endpoint = f'/api/v{constants.API_VERSION}'
tmdb_access_token = dotenv_values(".env")["ACCESS_TOKEN"]
app = Flask(__name__)
tmdb_client = TMDbClient(tmdb_access_token)


def get_country(ip_address):
    try:
        response = requests.get("http://ip-api.com/json/{}".format(ip_address))
        country = response.json()['countryCode']
        return country
    except Exception as e:
        return "Unknown"

def get_or_create_value(key, func, *args):
    if session.get(key):
        return jsonify(session[key])
    result = func(*args)
    session[key] = result
    return jsonify(result)

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

# A route to get details about a company from TMDb
@app.route(f'{base_api_endpoint}/company/<int:id>', methods=['GET'])
def api_company(id):
    key = f'company_{id}'
    return get_or_create_value(key, tmdb_client.get_company, id)

# A route to get movie certifications from TMDb
@app.route(f'{base_api_endpoint}/movie/certification/<country_code>', methods=['GET'])
def api_movie_certifications(country_code):
    key = f'movie_certifications_{country_code}'
    return get_or_create_value(key, tmdb_client.get_movie_certifications, country_code)

# A route to get TV show certifications from TMDb
@app.route(f'{base_api_endpoint}/tv/certification/<country_code>', methods=['GET'])
def api_tv_certifications(country_code):
    key = f'tv_certifications_{country_code}'
    return get_or_create_value(key, tmdb_client.get_tv_certifications, country_code)

# A route to get movie genres from TMDb
@app.route(f'{base_api_endpoint}/movie/genres', methods=['GET'])
def api_movie_genres():
    key = 'movie_genres'
    return get_or_create_value(key, tmdb_client.get_movie_genres)

# A route to get TV genres from TMDb
@app.route(f'{base_api_endpoint}/tv/genres', methods=['GET'])
def api_tv_genres():
    key = 'tv_genres'
    return get_or_create_value(key, tmdb_client.get_tv_genres)

# A route to get details for a given keyword from TMDb
@app.route(f'{base_api_endpoint}/keyword/<int:id>', methods=['GET'])
def api_keyword(id):
    key = f'keyword_{id}'
    return get_or_create_value(key, tmdb_client.get_keyword, id)

# A route to get movies with a given keyword from TMDb
@app.route(f'{base_api_endpoint}/keyword/<int:id>/movies', methods=['GET'])
def api_keyword_movies(id):
    key = f'keyword_movies_{id}'
    return get_or_create_value(key, tmdb_client.get_keyword_movies, id)

# A route to get details for a given movie from TMDb
@app.route(f'{base_api_endpoint}/movie/<int:id>', methods=['GET'])
def api_movie(id):
    key = f'movie_{id}'
    return get_or_create_value(key, tmdb_client.get_movie, id)

# A route to get the list of people a part of the cast of a given movie from TMDb
@app.route(f'{base_api_endpoint}/movie/<int:id>/cast', methods=['GET'])
def api_movie_cast(id):
    key = f'movie_cast_{id}'
    return get_or_create_value(key, tmdb_client.get_movie_cast, id)

# A route to get the list of people a part of the crew of a given movie from TMDb
@app.route(f'{base_api_endpoint}/movie/<int:id>/crew', methods=['GET'])
def api_movie_crew(id):
    key = f'movie_crew_{id}'
    return get_or_create_value(key, tmdb_client.get_movie_crew, id)

# A route to get the list of keywords associated with a given movie from TMDb
@app.route(f'{base_api_endpoint}/movie/<int:id>/keywords', methods=['GET'])
def api_movie_keywords(id):
    key = f'movie_keywords_{id}'
    return get_or_create_value(key, tmdb_client.get_movie_keywords, id)

# A route to get the list of release dates associated with a given movie from TMDb
@app.route(f'{base_api_endpoint}/movie/<int:id>/releases', methods=['GET'])
def api_movie_releases(id):
    key = f'movie_releases_{id}'
    return get_or_create_value(key, tmdb_client.get_movie_release_dates, id)

# A route to get the list of providers available to stream a given movie from TMDb
@app.route(f'{base_api_endpoint}/movie/<int:id>/providers', methods=['GET'])
def api_movie_providers(id):
    key = f'movie_providers_{id}'
    return get_or_create_value(key, tmdb_client.get_movie_providers, id)

# A route to get the list of movies a given person was credited with being a part of the cast from TMDb
@app.route(f'{base_api_endpoint}/person/<int:id>/moviesCast', methods=['GET'])
def api_person_movies_cast(id):
    key = f'person_movies_cast_{id}'
    return get_or_create_value(key, tmdb_client.get_person_movies_cast, id)

# A route to get the list of movies a given person was credited with being a part of the crew from TMDb
@app.route(f'{base_api_endpoint}/person/<int:id>/moviesCrew', methods=['GET'])
def api_person_movies_crew(id):
    key = f'person_movies_crew_{id}'
    return get_or_create_value(key, tmdb_client.get_person_movies_crew, id)

# A route to get the list of TV shows a given person was credited with being a part of the cast from TMDb
@app.route(f'{base_api_endpoint}/person/<int:id>/tvCast', methods=['GET'])
def api_person_tv_cast(id):
    key = f'person_tv_cast_{id}'
    return get_or_create_value(key, tmdb_client.get_person_tv_cast, id)

# A route to get the list of TV shows a given person was credited with being a part of the crew from TMDb
@app.route(f'{base_api_endpoint}/person/<int:id>/tvCrew', methods=['GET'])
def api_person_tv_crew(id):
    key = f'person_tv_crew_{id}'
    return get_or_create_value(key, tmdb_client.get_person_tv_crew, id)

# A route to get the list of both TV shows AND movies a given person was credited with being a part of the cast from TMDb
@app.route(f'{base_api_endpoint}/person/<int:id>/allCast', methods=['GET'])
def api_person_all_cast(id):
    key = f'person_all_cast_{id}'
    return get_or_create_value(key, tmdb_client.get_person_all_cast, id)

# A route to get the list of TV shows AND movies a given person was credited with being a part of the crew from TMDb
@app.route(f'{base_api_endpoint}/person/<int:id>/allCrew', methods=['GET'])
def api_person_all_crew(id):
    key = f'person_all_crew_{id}'
    return get_or_create_value(key, tmdb_client.get_person_all_crew, id)

# A route to get details for a given TV show from TMDb
@app.route(f'{base_api_endpoint}/tv/<int:id>', methods=['GET'])
def api_tv(id):
    key = f'tv_{id}'
    return get_or_create_value(key, tmdb_client.get_tv, id)

# A route to get the list of people a part of the cast of a given TV show from TMDb
@app.route(f'{base_api_endpoint}/tv/<int:id>/cast', methods=['GET'])
def api_tv_cast(id):
    key = f'tv_cast_{id}'
    return get_or_create_value(key, tmdb_client.get_tv_cast, id)

# A route to get the list of people a part of the crew of a given TV show from TMDb
@app.route(f'{base_api_endpoint}/tv/<int:id>/crew', methods=['GET'])
def api_tv_crew(id):
    key = f'tv_crew_{id}'
    return get_or_create_value(key, tmdb_client.get_tv_crew, id)

# A route to get all content ratings for a given TV show from TMDb
@app.route(f'{base_api_endpoint}/tv/<int:id>/contentRatings', methods=['GET'])
def api_tv_content_ratings(id):
    key = f'tv_content_ratings_{id}'
    return get_or_create_value(key, tmdb_client.get_tv_content_ratings, id)

# A route to get all keywords associated with a given TV show from TMDb
@app.route(f'{base_api_endpoint}/tv/<int:id>/keywords', methods=['GET'])
def api_tv_keywords(id):
    key = f'tv_keywords_{id}'
    return get_or_create_value(key, tmdb_client.get_tv_keywords, id)

# A route to get the list of providers available to stream a given TV show from TMDb
@app.route(f'{base_api_endpoint}/tv/<int:id>/providers', methods=['GET'])
def api_tv_providers(id):
    key = f'tv_providers_{id}'
    return get_or_create_value(key, tmdb_client.get_tv_providers, id)

# A route to get the countries that provider data is available for from TMDb
@app.route(f'{base_api_endpoint}/providers', methods=['GET'])
def api_providers():
    key = 'providers'
    return get_or_create_value(key, tmdb_client.get_provider_countries)

# A route to get the list of movie providers with available data from TMDb
@app.route(f'{base_api_endpoint}/providers/movie/<watch_region>', methods=['GET'])
def api_providers_movies(watch_region=''):
    key = f'providers_movies_{watch_region}'
    return jsonify(tmdb_client.get_movie_providers(watch_region=watch_region))

# A route to get the list of TV show providers with available data from TMDb
@app.route(f'{base_api_endpoint}/providers/tv/<watch_region>', methods=['GET'])

def api_providers_tv(watch_region=''):
    key = f'providers_tv_{watch_region}'
    return get_or_create_value(key, tmdb_client.get_tv_providers, watch_region)

# A route to discover movies based on given criteria
@app.route(f'{base_api_endpoint}/discover/movies', methods=['GET'])
def api_discover_movies():
    hash = hashlib.md5(json.dumps(request.json, sort_keys=True, indent=2))
    key = f'discover_movie_{hash}'
    prop = json.load(request.json)
    return get_or_create_value(key, tmdb_client.discover_movies, prop)

# A route to discover TV shows based on given criteria
@app.route(f'{base_api_endpoint}/discover/tv', methods=['GET'])
def api_discover_tv():
    hash = hashlib.md5(json.dumps(request.json, sort_keys=True, indent=2))
    key = f'discover_movie_{hash}'
    prop = json.load(request.json)
    return get_or_create_value(key, tmdb_client.discover_tv, prop)

if __name__ == '__main__':
    app.secret_key = env_values['FLASK_SECRET']
    app.run(debug=True, host='0.0.0.0', port=5050)