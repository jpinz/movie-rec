"""
The class encapsulating the access to the API.
"""

from imdb_api.title import Title

class Imdb_Api:
    """The Api Class."""
    def __init__(self, api_key):
        self.api_key = api_key
        self.api_base_url = 'https://imdb-api.com/en/API/'

    def Title(self, movie_id):
        return Title(self.api_base_url + 'Title/' + self.api_key + '/', movie_id)
