import json
import requests
from dotenv import dotenv_values
from imdb_api.imdb_api import Imdb_Api

config = dotenv_values(".env")
api_key = config["API_KEY"]

HER_ID = 'tt1798709'

api_obj = Imdb_Api(api_key)

movie_content = api_obj.Title(HER_ID)
print(json.dumps(movie_content.get(), indent = 2))
