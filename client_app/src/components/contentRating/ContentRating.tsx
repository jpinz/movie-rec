import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import MediaTypeOptions from "../../models/MediaTypeOptions";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  addContentRating,
  removeContentRating,
  populateContentRatings,
} from "./contentRatingSlice";
import { ContentRatingAPI } from "../../api/api";
import Multiselect from "multiselect-react-dropdown";
import { IContentRating } from "./contentRatingSlice";
import { Typography } from 'antd';

const { Title } = Typography;

interface IContentRatingProps {}

const ContentRating: React.FC<IContentRatingProps> = ({}) => {
  const choices = useAppSelector((state) =>
    state.contentRating.options.filter((rating) =>
      state.contentRating.choices.includes(rating.order)
    )
  );
  const ratings = useAppSelector((state) => state.contentRating.options);
  const mediaTypeChoice = useAppSelector((state) => state.mediaTypes.choice);
  const countryCode = useAppSelector((state) => state.region.countryCode);
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState<boolean>(false);

  const handleContentRatingAdd = (
    _selectedList: [{}] | undefined,
    selectedItem: IContentRating
  ) => {
    dispatch(addContentRating(selectedItem.order));
  };

  const handleContentRatingRemove = (
    _selectedList: [{}] | undefined,
    removedItem: IContentRating
  ) => {
    dispatch(removeContentRating(removedItem.order));
  };

  useEffect(() => {
    ContentRatingAPI.getContentRatings(mediaTypeChoice, countryCode)
      .then((data) => {
        console.log(data);
        dispatch(populateContentRatings(data));
      })
      .catch((err) => {
        setIsError(true);
      });
    return () => {};
  }, []);

  let ratingsAccordionList = ratings.map((rating, index) => {
    return (
      <AccordionItem key={index}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {rating.certification}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{rating.meaning}</AccordionPanel>
      </AccordionItem>
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
          Oop!!! Error getting the Content Ratings!
        </Box>
      )}
      <Title underline={true} level={3}>Select {mediaTypeChoice} content rating:</Title>
      <div id="content_ratings">
        <Title level={4}>Content rating options:</Title>
        <Multiselect
          options={ratings} // Options to display in the dropdown
          selectedValues={choices} // Preselected value to persist in dropdown
          onSelect={handleContentRatingAdd} // Function will trigger on select event
          onRemove={handleContentRatingRemove} // Function will trigger on remove event
          displayValue="certification" // Property name to display in the dropdown options
        />
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Content Rating Descriptions
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={4}>
              <Accordion defaultIndex={[0]}>
                {ratingsAccordionList}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <br/>
    </div>
  );
};

export default ContentRating;
