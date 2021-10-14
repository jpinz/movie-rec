import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { Card } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  addProvider,
  removeProvider,
  populateProviders,
} from "./providerSlice";
import { ImagesAPI, ProvidersAPI } from "../../api/api";
import { IProvider } from "./providerSlice";

interface IProvidersProps {}

const Providers: React.FC<IProvidersProps> = ({}) => {
  const choices = useAppSelector((state) =>
    state.provider.options.filter((provider) =>
      state.provider.choices.includes(provider.provider_id)
    )
  );
  const providers = useAppSelector((state) => state.provider.options);
  const mediaTypeChoice = useAppSelector((state) => state.mediaTypes.choice);
  const countryCode = useAppSelector((state) => state.region.countryCode);
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState<boolean>(false);

  const handleProviderAdd = (
    _selectedList: [{}] | undefined,
    selectedItem: IProvider
  ) => {
    dispatch(addProvider(selectedItem.provider_id));
  };

  const handleProviderRemove = (
    _selectedList: [{}] | undefined,
    removedItem: IProvider
  ) => {
    dispatch(removeProvider(removedItem.provider_id));
  };

  useEffect(() => {
    ProvidersAPI.getProviders(mediaTypeChoice, countryCode)
      .then((data) => {
        console.log(data);
        dispatch(populateProviders(data));
      })
      .catch((err) => {
        setIsError(true);
      });
    return () => {};
  }, []);

  let providerCardMaker = providers.map((provider, index) => {
    return (
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt={provider.provider_name}
            src={ImagesAPI.getImage(provider.logo_path)}
          />
        }
      >
        <Card.Meta title={provider.provider_name} />
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
          Oop!!! Error getting the Providers!
        </Box>
      )}
      <h1>Providers for: {mediaTypeChoice} </h1>
      <div id="providers">
        <p>Providers:</p>
        <SimpleGrid columns={2} spacing={10}>
          {providerCardMaker}
        </SimpleGrid>
      </div>
    </div>
  );
};

export default Providers;
