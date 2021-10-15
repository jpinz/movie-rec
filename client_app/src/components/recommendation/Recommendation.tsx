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
import { TMDbConstants } from "../../models/TMDbConstants"
import MediaTypeOptions from "../../models/MediaTypeOptions";
import { Typography } from 'antd';

const { Title } = Typography;

interface IRecommendationProps {}

const Recommendations: React.FC<IRecommendationProps> = ({}) => {
    const dispatch = useAppDispatch();
    const [isError, setIsError] = useState<boolean>(false);

    const movieRecommendations = useAppSelector((state) => state.recommendations.movieOptions)
    const showRecommendations = useAppSelector((state) => state.recommendations.showOptions)

    const countryCode = useAppSelector((state) => state.region.countryCode);
    const mediaTypeChoice = useAppSelector((state) => state.mediaTypes.choice);

    const body: any = {};

    const wantedGenres = useAppSelector((state) => state.genres.wanted);
    if (wantedGenres.length > 0) {
        body[`${TMDbConstants.WITH_GENRES_KEY}`] = wantedGenres.map(x => x.id).join(",");
    }

    const notWantedGenres = useAppSelector((state) => state.genres.not_wanted);
    if (notWantedGenres.length > 0) {
        body[`${TMDbConstants.WITHOUT_GENRES_KEY}`] = notWantedGenres.map(x => x.id).join(",");
    }

    const providers = useAppSelector((state) => state.provider.choices);
    if (providers.length > 0) {
        body[`${TMDbConstants.WITH_WATCH_PROVIDERS_KEY}`] = providers.join(",");
        body[`${TMDbConstants.WATCH_REGION_KEY}`] = countryCode;
    }

    const purchaseOption = useAppSelector((state) => state.provider.purchaseOption);
    if (purchaseOption !== '') {
      body[`${TMDbConstants.WITH_WATCH_MONETIZATION_TYPES_KEY}`] = purchaseOption;
    }

    const minimumRuntime = useAppSelector((state) => state.runtime.runtime.greaterThan);
    body[`${TMDbConstants.WITH_RUNTIME_GTE_KEY}`] = minimumRuntime;
    const maximumRuntime = useAppSelector((state) => state.runtime.runtime.lessThan);
    body[`${TMDbConstants.WITH_RUNTIME_LTE_KEY}`] = maximumRuntime;


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
                src={ImagesAPI.getImage(recommendation.poster_path)}
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
        <Title underline={true} level={3}>Displaying {mediaTypeChoice} recommendations with the following options (if any):</Title>
        {wantedGenres.length > 0 && (
            <Title level={4}>Genres: {wantedGenres.map(x => x.name).join(",")}</Title>
        )}
        {notWantedGenres.length > 0 && (
            <Title level={4}>Excluded genres: {notWantedGenres.map(x => x.name).join(",")}</Title>
        )}
        {providers.length > 0 && (
          <Title level={4}>Providers: {providers.map(x => x).join(",")}</Title>
        )}
        {purchaseOption !== '' && (
          <Title level={4}>Purchase option: {purchaseOption}</Title>
        )}
        <Title level={4}>Runtime range in minutes: [{minimumRuntime}, {maximumRuntime}]</Title>
        <br/>
        <div id="recommendations">
          <Title underline={true} level={4}>Recommendations:</Title>
          <SimpleGrid columns={5} spacing={10}>
            {isMovie && movieRecommendationCardMaker}
            {!isMovie && showRecommendationCardMaker}
          </SimpleGrid>
        </div>
      </div>
    );
}

export default Recommendations