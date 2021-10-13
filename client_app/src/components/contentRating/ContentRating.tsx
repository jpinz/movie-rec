import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import MediaTypeOptions from "../../models/MediaTypeOptions";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  addContentRating,
  removeContentRating,
} from "./contentRatingSlice";
import { ContentRatingAPI } from "../../api/api";
import Multiselect from "multiselect-react-dropdown";

interface IContentRatingProps {}

const ContentRating: React.FC<IContentRatingProps> = ({}) => {

  const choices = useAppSelector((state) => state.contentRating.choices);
  const mediaTypeChoice = useAppSelector((state) => state.mediaTypes.choice);
  const countryCode = useAppSelector((state) => state.region.countryCode);
  const dispatch = useAppDispatch();
  const [ratings, setRatings] = useState<Map<number, string>>(new Map());
  const [isError, setIsError] = useState<boolean>(false);

  const handleContentRatingAdd = (
    _selectedList: [{}] | undefined,
    selectedItem: number
  ) => {
    dispatch(addContentRating(selectedItem));
  };

  const handleContentRatingRemove = (
    _selectedList: [{}] | undefined,
    removedItem: number
  ) => {
    dispatch(removeContentRating(removedItem));
  };

  useEffect(() => {
    ContentRatingAPI.getContentRatings(mediaTypeChoice, countryCode)
      .then((data) => {
        console.log(data);
        var result = new Map(data.map((key) => [key.order, key.certification]));
        setRatings(result);
      })
      .catch((err) => {
        setIsError(true);
      });
    return () => {};
  }, []);

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
          Oop!!! Error getting the Content Ratings!
        </Box>
      )}
      <h1>Content Ratings for: {mediaTypeChoice} </h1>
      <div id="content_ratings">
      <p>Wanted Genres:</p>

        <Multiselect
          options={Array.from(ratings, ([order, certification]) => ({ order, certification }))} // Options to display in the dropdown
          selectedValues={choices} // Preselected value to persist in dropdown
          onSelect={handleContentRatingAdd} // Function will trigger on select event
          onRemove={handleContentRatingRemove} // Function will trigger on remove event
          displayValue="certification" // Property name to display in the dropdown options
        />
      </div>
    </div>
  );
};

export default ContentRating;
