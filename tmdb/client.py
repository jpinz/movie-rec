import requests
import json
from tmdb.constants import TMDbConstants

class TMDbClient:
    base_url = 'https://api.themoviedb.org/3'
    access_token = ''

    def __init__(self, access_token):
        self.access_token = access_token

    def get(self, endpoint):
        """Makes a GET request against the provided endpoint on TMDb.

        Args:
            endpoint: the endpoint to append to the base URL of the TMDb API.
        Returns:
            The JSON response from TMDb.
        Raises:
            None.
        """

        url = f'{self.base_url}{endpoint}'
        response = requests.get(url, headers={'Authorization': f'Bearer {self.access_token}'})
        return json.loads(response.content.decode('ascii', 'ignore'))

    def discover(self, endpoint, prop):
        """Discovers all TV shows or movies that meet the criteria outlined in the given properties dictionary.
        This function will only return the first page of results (up to 20 elements).

        Args:
            endpoint: the endpoint to append to the base URL of the TMDb API.
            prop: a dictionary containing all criteria that must be met during discovery.
        Returns:
            A list of TV show or movie objects that meet the given criteria.
        Raises:
            None.
        """

        seen = False
        for key, value in prop.items():
            if seen:
                endpoint = f'{endpoint}&{key}={value}'
            else:
                seen = True
                endpoint = f'{endpoint}?{key}={value}'

        response = self.get(endpoint)
        return response['results']

    def get_company(self, company_id):
        """Gets details for a specific company.

        Args:
            company_id: the TMDb ID for a company.
        Returns:
            An object containing metadata about a company.
        Raises:
            None.
        """

        endpoint = f'/company/{company_id}'
        return self.get(endpoint)

    def get_movie_certifications(self, country_code=''):
        """Gets regional certifications for movies for a given country, if provided.

        Args:
            country_code: (optional) the country to get the movie certifications for.
        Returns:
            A dictionary mapping a country code to the list of certifications in that region.
            Note: the lower the rating, the wider the audience that can view (I think? NR is lowest priority in US)
            e.g., { "US": [ { "certification": "G", "meaning": "...", "order": 1 } ] }
        Raises:
            None.
        """

        endpoint = '/certification/movie/list'
        response = self.get(endpoint)
        if country_code:
            return response['certifications'][country_code]
        return response['certifications']

    def get_tv_certifications(self, country_code=''):
        """Gets regional certifications for TV shows for a given country, if provided.

        Args:
            country_code: (optional) the country to get the TV certifications for.
        Returns:
            A dictionary mapping a country code to the list of certifications in that region.
            Note: the lower the rating, the wider the audience that can view (I think? NR is lowest priority in US)
            e.g., { "US": [ { "certification": "G", "meaning": "...", "order": 1 } ] }
        Raises:
            None.
        """

        endpoint = '/certification/tv/list'
        response = self.get(endpoint)
        if country_code:
            return response['certifications'][country_code]
        return response['certifications']

    def get_movie_genres(self):
        """Gets all genres for movies.

        Args:
            None.
        Returns:
            A list of genre objects that include the TMDb ID and the name of the genre.
            e.g., [ { "id": 1, "name": "Spooky" }, { "id": 2, "name": "Not Spooky" } ]
        Raises:
            None.
        """

        endpoint = '/genre/movie/list'
        response = self.get(endpoint)
        return response['genres']

    def get_tv_genres(self):
        """Gets all genres for TV shows.

        Args:
            None.
        Returns:
            A list of genre objects that include the TMDb ID and the name of the genre.
            e.g., [{"id": 1, "name": "Spooky"}, {"id": 2, "name": "Not Spooky"}]
        Raises:
            None.
        """

        endpoint = '/genre/tv/list'
        response = self.get(endpoint)
        return response['genres']

    def get_keyword(self, keyword_id):
        """Gets the details for a given keyword.

        Args:
            keyword_id: the TMDb ID of the keyword.
        Returns:
            The basic metadata for the keyword, including the TMDb ID and name.
        Raises:
            None.
        """

        endpoint = f'/keyword/{keyword_id}'
        return self.get(endpoint)

    def get_keyword_movies(self, keyword_id):
        """Gets all movies that belong to a keyword.
        Note: Use the /discover call instead if more flexibility is needed.

        Args:
            keyword_id: the TMDb ID of a keyword.
        Returns:
            A list of metadata for movies that belong to the given keyword.
        Raises:
            None.
        """

        endpoint = f'/keyword/{keyword_id}/movies'
        response = self.get(endpoint)
        return response['results']

    def get_movie(self, movie_id):
        """Gets metadata about a given movie.

        Args:
            movie_id: the TMDb ID of a movie.
        Returns:
            A collection of metadata about the given movie.
            e.g., genres, original_language, original_title, popularity, release_date, runtime, title, vote_average, etc.
        Raises:
            None.
        """

        endpoint = f'/movie/{movie_id}'
        return self.get(endpoint)

    def get_movie_cast(self, movie_id):
        """Gets metadata about the cast for a given movie.

        Args:
            movie_id: the TMDb ID of a movie.
        Returns:
            A list of objects representing the person a part of the cast.
            e.g., [ { "id": 287, "name": "Brad Pitt", "known_for_department": "Acting", "character": "Tyler Durden" } ]
        Raises:
            None.
        """

        endpoint = f'/movie/{movie_id}/credits'
        response = self.get(endpoint)
        return response['cast']

    def get_movie_crew(self, movie_id):
        """Gets metadata about the crew for a given movie.

        Args:
            movie_id: the TMDb ID of a movie.
        Returns:
            A list of objects representing the person a part of the crew.
            e.g., [ { "id": 7467, "name": "David Fincher", "known_for_department": "Directing", "job": "Director" } ]
        Raises:
            None.
        """

        endpoint = f'/movie/{movie_id}/credits'
        response = self.get(endpoint)
        return response['crew']

    def get_movie_keywords(self, movie_id):
        """Gets all keywords for a given movie.

        Args:
            movie_id: the TMDb ID of a movie.
        Returns:
            A list of keyword objects associated with the given movie.
        Raises:
            None.
        """

        endpoint = f'/movie/{movie_id}/keywords'
        response = self.get(endpoint)
        return response['keywords']

    def get_movie_release_dates(self, movie_id):
        """Gets all release dates for a given movie.

        Args:
            movie_id: the TMDb ID of a movie.
        Returns:
            A list of release date objects for each country.
            e.g., [ { "iso_3166_1": "US", "release_dates": [ { "certification": "R", "release_date": "<datetime>" } ] } ]
        Raises:
            None.
        """

        endpoint = f'/movie/{movie_id}/release_dates'
        response = self.get(endpoint)
        return response['results']

    def get_movie_providers(self, movie_id):
        """Gets the providers that a movie can be viewed on.
        The provider information is pulled from JustWatch: https://www.justwatch.com/

        Args:
            movie_id: the TMDb ID of a movie.
        Returns:
            A dictionary mapping country codes to the providers that are currently streaming the movie in that country.
        Raises:
            None.
        """

        endpoint = f'/movie/{movie_id}/watch/providers'
        response = self.get(endpoint)
        return response['results']

    def get_person_movies_cast(self, person_id):
        """Gets all movies that a person was credited with being in as a part of the cast.

        Args:
            person_id: the TMDb ID of the person.
        Returns:
            A list of movies that the person was credited with being in as a part of the cast.
            e.g., [ { "character": "Tyler Durden", "title": "Fight Club", "id": 550, ... } ]
        Raises:
            None
        """

        endpoint = f'/person/{person_id}/movie_credits'
        response = self.get(endpoint)
        return response['cast']

    def get_person_movies_crew(self, person_id):
        """Gets all movies that a person was credited with being in as a part of the crew.

        Args:
            person_id: the TMDb ID of the person.
        Returns:
            A list of movies that the person was credited with being in as a part of the crew.
            e.g., [ { "job": "Writer", "title": "Whiplash", "id": 367412, ... } ]
        Raises:
            None
        """

        endpoint = f'/person/{person_id}/movie_credits'
        response = self.get(endpoint)
        return response['crew']

    def get_person_tv_cast(self, person_id):
        """Gets all TV shows that a person was credited with being in as a part of the cast.

        Args:
            person_id: the TMDb ID of the person.
        Returns:
            A list of TV shows that the person was credited with being in as a part of the cast.
            e.g., [ { "character": "Walter White", "name": "Breaking Bad", "id": 1396, ... } ]
        Raises:
            None
        """

        endpoint = f'/person/{person_id}/tv_credits'
        response = self.get(endpoint)
        return response['cast']

    def get_person_tv_crew(self, person_id):
        """Gets all TV shows that a person was credited with being in as a part of the crew.

        Args:
            person_id: the TMDb ID of the person.
        Returns:
            A list of TV shows that the person was credited with being in as a part of the crew.
            e.g., [ { "job": "Writer", "name": "Mr. Robot", "id": 62560 } ]
        Raises:
            None
        """

        endpoint = f'/person/{person_id}/tv_credits'
        response = self.get(endpoint)
        return response['crew']

    def get_person_all_cast(self, person_id):
        """Gets all TV shows AND movies that a person was credited with being in as a part of the cast.

        Args:
            person_id: the TMDb ID of the person.
        Returns:
            A list of TV shows AND movies that the person was credited with being in as a part of the cast.
        Raises:
            None
        """

        endpoint = f'/person/{person_id}/combined_credits'
        response = self.get(endpoint)
        return response['cast']

    def get_person_all_crew(self, person_id):
        """Gets all TV shows AND movies that a person was credited with being in.

        Args:
            person_id: the TMDb ID of the person.
        Returns:
            A list of TV shows AND movies that the person was credited with being in as a part of the crew.
        Raises:
            None
        """

        endpoint = f'/person/{person_id}/combined_credits'
        response = self.get(endpoint)
        return response['crew']

    def get_tv(self, tv_id):
        """Gets metadata about a given TV show.

        Args:
            tv_id: the TMDb ID of a TV show.
        Returns:
            A collection of metadata about the given TV show.
            e.g., created_by, genres, id, name, number_of_episodes, number_of_seasons, vote_average, etc.
        Raises:
            None.
        """

        endpoint = f'/tv/{tv_id}'
        return self.get(endpoint)

    def get_tv_cast(self, tv_id):
        """Gets all of the people credited with being a part of the cast of the given TV show.

        Args:
            tv_id: the TMDb ID of a TV show.
        Returns:
            A list of people credited with being a part of the cast of the given TV show.
            e.g., [ { "id": 22970, "name": "Peter Dinklage", "roles": [ { "character": "Tyrion Lannister" } ], ... } ]
        Raises:
            None.
        """

        endpoint = f'/tv/{tv_id}/aggregate_credits'
        response = self.get(endpoint)
        return response['cast']

    def get_tv_crew(self, tv_id):
        """Gets all of the people credited with being a part of the crew of the given TV show.

        Args:
            tv_id: the TMDb ID of a TV show.
        Returns:
            A list of people credited with being a part of the crew of the given TV show.
            e.g., [ { "id": 66633, "name": "Vince Gilligan", "department": "Directing", "jobs": { ... } ], ... } ]
        Raises:
            None.
        """

        endpoint = f'/tv/{tv_id}/aggregate_credits'
        response = self.get(endpoint)
        return response['crew']

    def get_tv_content_ratings(self, tv_id):
        """Gets all content ratings for a given TV show.

        Args:
            tv_id: the TMDb ID of a TV show.
        Returns:
            A dictionary mapping country codes to the content rating of the TV show in that country.
        Raises:
            None.
        """

        endpoint = f'/tv/{tv_id}/content_ratings'
        response = self.get(endpoint)
        return response['results']

    def get_tv_keywords(self, tv_id):
        """Gets all keywords for a given TV show.

        Args:
            tv_id: the TMDb ID of a TV show.
        Returns:
            A list of keyword objects associated with the given TV show.
        Raises:
            None.
        """

        endpoint = f'/tv/{tv_id}/keywords'
        response = self.get(endpoint)
        return response['results']

    def get_tv_providers(self, tv_id):
        """Gets the providers that a TV show can be viewed on.
        The provider information is pulled from JustWatch: https://www.justwatch.com/

        Args:
            tv_id: the TMDb ID of a TV show.
        Returns:
            A dictionary mapping country codes to the providers that are currently streaming the TV show in that country.
        Raises:
            None.
        """

        endpoint = f'/tv/{tv_id}/watch/providers'
        response = self.get(endpoint)
        return response['results']

    def get_provider_countries(self):
        """Gets the list of countries that provider data is available for.
        The provider information is pulled from JustWatch: https://www.justwatch.com/

        Args:
            None.
        Returns:
            A list of country objects where provider data is available.
        Raises:
            None.
        """

        endpoint = f'/watch/providers/regions'
        response = self.get(endpoint)
        return response['results']

    def get_movie_providers(self, watch_region=''):
        """Gets the list of movie providers with available data.
        The provider information is pulled from JustWatch: https://www.justwatch.com/

        Args:
            watch_region: (optional) the ISO-3166-1 country code to filter results down by (e.g., US, CA, AU).
        Returns:
            A list of providers available for movies (if watch_region provided, scoped down to the country).
        Raises:
            None.
        """
        endpoint = f'/watch/providers/movie'
        if not watch_region:
            endpoint = f'{endpoint}?watch_region={watch_region}'

        response = self.get(endpoint)
        return response['results']

    def get_tv_providers(self, watch_region=''):
        """Gets the list of TV show providers with available data.
        The provider information is pulled from JustWatch: https://www.justwatch.com/

        Args:
            watch_region: (optional) the ISO-3166-1 country code to filter results down by (e.g., US, CA, AU).
        Returns:
            A list of providers available for TV shows (if watch_region provided, scoped down to the country).
        Raises:
            None.
        """
        endpoint = f'/watch/providers/tv'
        if not watch_region:
            endpoint = f'{endpoint}?watch_region={watch_region}'

        response = self.get(endpoint)
        return response['results']

    def discover_movies(self, prop):
        """Discovers movies that meet criteria outlined in the given properties dictionary.

        Args:
            prop: a dictionary of movie criteria set by the client
        Returns:
            A list of movie objects that meet the criteria specified.
        Raises:
            None.
        """

        endpoint = f'/discover/movie'
        return self.discover(endpoint, prop)

    def discover_tv(self, prop):
        """Discovers TV shows that meet criteria outlined in the given properties dictionary.

        Args:
            prop: a dictionary of movie criteria set by the client
        Returns:
            A list of TV show objects that meet the criteria specified.
        Raises:
            None.
        """

        endpoint = f'/discover/tv'
        return self.discover(endpoint, prop)