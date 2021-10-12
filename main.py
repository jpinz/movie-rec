import requests
import json
from dotenv import dotenv_values
config = dotenv_values(".env")
api_key = config["API_KEY"]

her_id = 'tt1798709'
search_api_url = 'https://imdb-api.com/en/API/Title/'

response = requests.get(search_api_url + api_key + '/' + her_id, timeout=5)

movie_content = json.loads(response.content)
print(json.dumps(movie_content, indent = 2))
