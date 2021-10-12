import json
import requests
from dotenv import dotenv_values
from api.title import title

config = dotenv_values(".env")
api_key = config["API_KEY"]

her_id = 'tt1798709'

movie_content = title(api_key, her_id)
print(json.dumps(movie_content, indent = 2))
