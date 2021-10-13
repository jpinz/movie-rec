import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Region } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setRegion } from "./regionSlice";

interface IRegionProps {}

const RegionComponent: React.FC<IRegionProps> = ({}) => {
  const countryCode = useAppSelector((state) => state.region.countryCode);
  const dispatch = useAppDispatch();

  const [countryCodeState, setCountryCode] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const onRegionSelect = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    dispatch(setRegion(countryCodeState ?? "US"));
  };

  useEffect(() => {
    Region.getRegion()
      .then((data) => {
        setCountryCode(data);
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
      <h1>Currently selected: {countryCodeState} </h1>
      <form onSubmit={onRegionSelect}>
        <input
          value={countryCodeState}
          onChange={(e) => setCountryCode(e.target.value)}
          type="text"
          placeholder="Enter a country code"
          className="input"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegionComponent;
