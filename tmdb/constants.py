class TMDbConstants:

    # ---------- Shared /discover properties ----------

    SORT_BY_KEY='sort_by'
    """Key used to specify the ordering of returned TV shows and/or movies.
    Default value this is set to is 'popularity.desc'.
    The corresponding value for this key is a string."""

    PAGE_KEY='page'
    """Key used to specify which page of results to query.
    The corresponding value for this key is an integer in the range [1, 1000]."""

    VOTE_COUNT_GTE_KEY='vote_count.gte'
    """Key used to filter TV shows and/or movies that have a vote count greater than or equal to the provided value.
    The corresponding value for this key is a non-negative integer."""

    VOTE_AVERAGE_GTE_KEY='vote_average.gte'
    """Key used to filter TV shows and/or movies with a rating greater than or equal to the provided value.
    The corresponding value for this key is a non-negative number."""

    WITH_COMPANIES_KEY='with_companies'
    """Key used to filter TV shows and/or movies produced by all specified production companies.
    The corresponding value for this key is a comma-separated list of company IDs."""

    WITH_GENRES_KEY='with_genres'
    """Key used to filter TV shows and/or movies classified with the given genres.
    The corresponding value for this key is a comma-separated list of genre IDs."""

    WITHOUT_GENRES_KEY='without_genres'
    """Key used to filter TV shows and/or movies not classified with the given genres.
    The corresponding value for this key is a comma-separated list of genre IDs."""

    WITH_KEYWORDS_KEY='with_keywords'
    """Key used to filter TV shows and/or movies classified with the given keywords.
    The corresponding value for this key is a comma-separated list of keyword IDs."""

    WITHOUT_KEYWORDS_KEY='without_keywords'
    """Key used to filter TV shows and/or movies not classified with the given keywords.
    The corresponding value for this key is a comma-separated list of keyword IDs."""

    WITH_RUNTIME_GTE_KEY='with_runtime.gte'
    """Key used to filter TV show episodes and/or movies whose runtime is greater than or equal to the given value.
    The corresponding value for this key is an integer."""

    WITH_RUNTIME_LTE_KEY='with_runtime.lte'
    """Key used to filter TV show episodes and/or movies whose runtime is less than or equal to the given value.
    The corresponding value for this key is an integer."""

    WITH_WATCH_PROVIDERS_KEY='with_watch_providers'
    """Key used to filter TV shows and/or movies available to stream on a given platform.
    The corresponding value for this key is a comma-separated list of watch provider IDs."""

    WATCH_REGION_KEY='watch_region'
    """Key used to filter watch providers available for TV shows and/or movies by country.
    The corresponding value for this key is an ISO 3166-1 country code."""

    WITH_WATCH_MONETIZATION_TYPES_KEY='with_watch_monetization_types'
    """Key used to filter watch providers available for TV shows and/or movies by their cost to stream the media.
    The corresponding value for this key is a string from the following list: flatrate, free, ads, rent, buy."""

    # ---------- Movie /discover properties ----------

    CERTIFICATION_COUNTRY_KEY='certification_country'
    """Key used to filter on the country's certification that should be used.
    The corresponding value for this key is a string."""

    CERTIFICATION_KEY='certification'
    """Key used with 'certification_country' that filters on the certification.
    The corresponding value for this key is a string."""

    CERTIFICATION_LTE_KEY='certification.lte'
    """Key used to filter on movies that have a certification that is less than or equal to the specified value.
    The corresponding value for this key is a string."""

    CERTIFICATION_GTE_KEY='certification.gte'
    """Key used to filter on movies that have a certification that is less than or equal to the specified value.
    The corresponding value for this key is a string."""

    PRIMARY_RELEASE_YEAR_KEY='primary_release_year'
    """Key used to filter movies released in a specific year.
    The corresponding value for this key is an integer."""

    PRIMARY_RELEASE_DATE_GTE_KEY='primary_release_date.gte'
    """Key used to filter movies released on or after the given date.
    The corresponding value for this key is a string in the form of a date (YYYY-MM-DD)."""

    PRIMARY_RELEASE_DATE_LTE_KEY='primary_release_date.lte'
    """Key used to filter movies released on or before the given date.
    The corresponding value for this key is a string in the form of a date (YYYY-MM-DD)."""

    VOTE_COUNT_LTE_KEY='vote_count.lte'
    """Key used to filter movies that have a vote count less than or equal to the provided value.
    The corresponding value for this key is a positive integer."""

    VOTE_AVERAGE_LTE_KEY='vote_average.lte'
    """Key used to filter movies with a rating less than or equal to the provided value.
    The corresponding value for this key is a non-negative number."""

    WITH_CAST_KEY='with_cast'
    """Key used to filter movies containing all specified people as a part of the cast.
    The corresponding value for this key is a comma-separated list of people IDs."""

    WITH_CREW_KEY='with_crew'
    """Key used to filter movies containing all specified people as a part of the crew.
    The corresponding value for this key is a comma-separated list of people IDs."""

    WITH_PEOPLE_KEY='with_people'
    """Key used to filter movies containing all specified people as a part of the cast or crew.
    The corresponding value for this key is a comma-separated list of people IDs."""

    # ---------- TV /discover properties ----------

    FIRST_AIR_DATE_YEAR_KEY='first_air_date_year'
    """Key used to filter TV shows that first aired in the provided year.
    The corresponding value for this key is an integer."""

    FIRST_AIR_DATE_GTE_KEY='first_air_date.gte'
    """Key used to filter TV shows that first aired on or after the provided value.
    The corresponding value for this key is a string in the form of a date (YYYY-MM-DD)."""

    FIRST_AIR_DATE_LTE_KEY='first_air_date.lte'
    """Key used to filter TV shows that first aired on or before the provided value.
    The corresponding value for this key is a string in the form of a date (YYYY-MM-DD)."""