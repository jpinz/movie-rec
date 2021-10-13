import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import MediaTypeOptions from "../../models/MediaTypeOptions";
import { MediaType } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setMediaType } from "./mediaTypeSlice";

interface IMediaTypesProps {}

const MediaTypes: React.FC<IMediaTypesProps> = ({}) => {
  const choice = useAppSelector((state) => state.mediaTypes.choice);
  const dispatch = useAppDispatch();

  const [mediaType, setMediaTypeState] = useState<MediaTypeOptions>();
  const [isError, setIsError] = useState<boolean>(false);

  const onMediaTypeSelect = (mediaType: MediaTypeOptions) => {
    dispatch(setMediaType(mediaType));
  };

  useEffect(() => {
    MediaType.getMediaType()
      .then((data) => {
        setMediaTypeState(data);
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
          Oop!!! Error getting the media type
        </Box>
      )}
      <h1>Currently selected: {choice} </h1>
      <button onClick={() => onMediaTypeSelect(MediaTypeOptions.Movie)}>
        Movie!
      </button>
      <button onClick={() => onMediaTypeSelect(MediaTypeOptions.TV)}>
        TV Show!
      </button>
    </div>
  );
};

export default MediaTypes;
