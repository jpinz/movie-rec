import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectProvider,
  populateProviders,
} from "./providerSlice";
import { ProvidersAPI } from "../../api/api";
import ProviderCard from './ProviderCard';

interface IProvidersProps {}

const Providers: React.FC<IProvidersProps> = ({}) => {
  const choices = useAppSelector((state) =>
    state.provider.options.filter((provider) =>
      state.provider.choices.includes(provider.provider_id)
    ).map((provider) => provider.provider_id));
  const providers = useAppSelector((state) => state.provider.options);
  const mediaTypeChoice = useAppSelector((state) => state.mediaTypes.choice);
  const countryCode = useAppSelector((state) => state.region.countryCode);
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState<boolean>(false);

  const handleProviderSelect = (
    selectedItem: number
  ) => {
    dispatch(selectProvider(selectedItem));
  };

  useEffect(() => {
    ProvidersAPI.getProviders(mediaTypeChoice, countryCode)
      .then((data) => {
        dispatch(populateProviders(data));
      })
      .catch((err) => {
        setIsError(true);
      });
    return () => {};
  }, []);

  let providerCardMaker = providers.map((provider, index) => {
    return (
      <ProviderCard key={index} provider={provider} selected={choices.indexOf(provider.provider_id) !== -1} select={handleProviderSelect} />
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
          Oop!!! Error getting the Providers!
        </Box>
      )}
      <h1>Providers for: {mediaTypeChoice} </h1>
      <div id="providers">
        <SimpleGrid columns={5} spacing={10}>
          {providerCardMaker}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default Providers;
