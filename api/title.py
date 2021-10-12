"""
Get the json response for a movie ID.
"""
import json
import requests

def title(api_key, movie_id):
    """Get the movie."""
    title_api_url = 'https://imdb-api.com/en/API/Title/'

    response = requests.get(title_api_url + api_key + '/' + movie_id, timeout=5)

    return json.loads(response.content)
