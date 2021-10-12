import json
from dotenv import dotenv_values
import tmdbsimple as tmdb

tmdb.API_KEY = dotenv_values(".env")["API_KEY"]

movie = tmdb.Movies(603)
response = movie.info()
print(json.dumps(response, indent=2))
