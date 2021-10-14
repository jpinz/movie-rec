import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  addWanted,
  addNotWanted,
  removeWanted,
  removeNotWanted,
} from "./genreSlice";
import { GenresAPI } from "../../api/api";
import MediaTypeOptions from "../../models/MediaTypeOptions";
import Multiselect from "multiselect-react-dropdown";
import { Typography } from 'antd';

const { Title } = Typography;

interface IGenresProps {}

const Genres: React.FC<IGenresProps> = ({}) => {
  const wanted = useAppSelector((state) => state.genres.wanted);
  const not_wanted = useAppSelector((state) => state.genres.not_wanted);
  const mediaTypeChoice = useAppSelector((state) => state.mediaTypes.choice);
  const dispatch = useAppDispatch();
  const [genres, setGenres] = useState<Map<number, string>>(new Map());
  const [isError, setIsError] = useState<boolean>(false);

  const handleWantedGenresAdd = (
    _selectedList: IGenre[] | undefined,
    selectedItem: IGenre
  ) => {
    dispatch(addWanted(selectedItem));
  };

  const handleNotWantedGenresAdd = (
    _selectedList: IGenre[] | undefined,
    selectedItem: IGenre
  ) => {
    dispatch(addNotWanted(selectedItem));
  };

  const handleWantedGenresRemove = (
    _selectedList: IGenre[] | undefined,
    removedItem: IGenre
  ) => {
    dispatch(removeWanted(removedItem));
  };

  const handleNotWantedGenresRemove = (
    _selectedList: IGenre[] | undefined,
    removedItem: IGenre
  ) => {
    dispatch(removeNotWanted(removedItem));
  };

  useEffect(() => {
    GenresAPI.getGenres(mediaTypeChoice)
      .then((data) => {
        console.log(data);
        var result = new Map(data.map((key) => [key.id, key.name]));
        setGenres(result);
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
          Oop!!! Error getting the Genres
        </Box>
      )}
      <Title underline={true} level={3}>Select wanted and unwanted {mediaTypeChoice} genres (if any):</Title>
      <div id="wanted_genres">
      <Title level={4}>Wanted Genres:</Title>

        <Multiselect
          options={Array.from(genres, ([id, name]) => ({ id, name }))} // Options to display in the dropdown
          selectedValues={wanted} // Preselected value to persist in dropdown
          onSelect={handleWantedGenresAdd} // Function will trigger on select event
          onRemove={handleWantedGenresRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          selectionLimit={3}
        />
      </div>
      <br/>
      <div id="not_wanted_genres">
          <Title level={4}>Not Wanted Genres:</Title>
        <Multiselect
          options={Array.from(genres, ([id, name]) => ({ id, name }))} // Options to display in the dropdown
          selectedValues={not_wanted} // Preselected value to persist in dropdown
          onSelect={handleNotWantedGenresAdd} // Function will trigger on select event
          onRemove={handleNotWantedGenresRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
      </div>
      <br/>
    </div>
  );
};

export default Genres;
