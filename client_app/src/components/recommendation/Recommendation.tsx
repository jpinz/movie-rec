import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { Card } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  populateMovies,
  populateShows,
} from "./recommendationSlice";
import { ImagesAPI, MovieRecommendationAPI, ShowRecommendationAPI } from "../../api/api";
import { IMovie, IShow } from "./recommendationSlice";
import { TMDbConstants } from "../../models/TMDbConstants"
import MediaTypeOptions from "../../models/MediaTypeOptions";

interface IRecommendationProps {}

const Recommendations: React.FC<IRecommendationProps> = ({}) => {
    const dispatch = useAppDispatch();
    const [isError, setIsError] = useState<boolean>(false);

    const movieRecommendations = useAppSelector((state) => state.recommendations.movieOptions)
    const showRecommendations = useAppSelector((state) => state.recommendations.showOptions)

    const countryCode = useAppSelector((state) => state.region.countryCode);
    const mediaTypeChoice = useAppSelector((state) => state.mediaTypes.choice);
    const wantedGenres = useAppSelector((state) => state.genres.wanted);
    const body: any = {};
    if (wantedGenres.length > 0) {
        body[`${TMDbConstants.WITH_GENRES_KEY}`] = wantedGenres.map(x => x.id).join(",");
    }

    // Sort by average rating descending
    body[`${TMDbConstants.SORT_BY_KEY}`] = 'vote_average.desc'

    // Filter out anything with less than 1000 votes (until option is added to set number of votes)
    body[`${TMDbConstants.VOTE_COUNT_GTE_KEY}`] = 1000

    const isMovie = mediaTypeChoice == MediaTypeOptions.Movie;

    useEffect(() => {
        if (isMovie) {
           MovieRecommendationAPI.getRecommendations(body)
            .then((data) => {
                console.log(data);
                dispatch(populateMovies(data));
            })
            .catch((err) => {
                setIsError(true);
            });
        } else {
            ShowRecommendationAPI.getRecommendations(body)
            .then((data) => {
                console.log(data);
                dispatch(populateShows(data));
            })
            .catch((err) => {
                setIsError(true);
            });
        }
        return () => {};
    }, []);

    let movieRecommendationCardMaker = movieRecommendations.map((recommendation, index) => {
        return (
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt={recommendation.title}
                src={ImagesAPI.getImage(recommendation.poster_path)}
              />
            }
          >
            <Card.Meta title={recommendation.title} />
          </Card>
        );
      });

      let showRecommendationCardMaker = showRecommendations.map((recommendation, index) => {
        return (
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt={recommendation.name}
                src={ImagesAPI.getImage(recommendation.name)}
              />
            }
          >
            <Card.Meta title={recommendation.name} />
          </Card>
        );
      });

    return (
      <div>
        {isError && (
          <Box
            mt="1"
            fontWeight="bold"
            fontSize="sm"
            as="p"
            isTruncated
            color="red"
          >
            Oop!!! Error getting the recommendations!
          </Box>
        )}
        <h1>Recommendation for: {mediaTypeChoice} </h1>
        {wantedGenres.length > 0 && (
            <h1>Genres: {wantedGenres.map(x => x.name).join(",")}</h1>
        )}
        <div id="recommendations">
          <p>Recommendations:</p>
          <SimpleGrid columns={5} spacing={10}>
            {isMovie && movieRecommendationCardMaker}
            {!isMovie && showRecommendationCardMaker}
          </SimpleGrid>
        </div>
      </div>
    );
}

export default Recommendations