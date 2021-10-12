"""
Get the json response for a movie ID.
"""
import json
import requests

class Title:
    """The Title Class."""
    def __init__(self, api_base_url, movie_id):
        self.movie_id = movie_id
        self.api_url = api_base_url

    def get(self):
        response = requests.get(self.api_url + self.movie_id, timeout=5)
        return json.loads(response.content)
