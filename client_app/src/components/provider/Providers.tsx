import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Checkbox, List } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectProvider, populateProviders, selectRentBuy } from "./providerSlice";
import { ProvidersAPI } from "../../api/api";
import ProviderCard from "./ProviderCard";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { Typography } from 'antd';

const { Title } = Typography;

interface IProvidersProps {}

const Providers: React.FC<IProvidersProps> = ({}) => {
  const choices = useAppSelector((state) =>
    state.provider.options
      .filter((provider) =>
        state.provider.choices.includes(provider.provider_id)
      )
      .map((provider) => provider.provider_id)
  );
  const providers = useAppSelector((state) => state.provider.options);
  const mediaTypeChoice = useAppSelector((state) => state.mediaTypes.choice);
  const countryCode = useAppSelector((state) => state.region.countryCode);
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState<boolean>(false);


  const options = ['Rent', 'Buy'];

  const handleRentBuySelect = (selectedItems: CheckboxValueType[]) => {
    dispatch(selectRentBuy(selectedItems));
  };

  const handleProviderSelect = (selectedItem: number) => {
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
      <Title underline={true} level={3}>Select {mediaTypeChoice} streaming provider:</Title>
      <div>
        <Title level={4}>Willing to rent or buy?</Title>
        <Checkbox.Group options={options} onChange={handleRentBuySelect} />
      </div>
      <br/>
      <div id="providers">
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={providers}
          pagination={{
            pageSize: 16,
          }}
          renderItem={(provider) => (
            <List.Item>
              <ProviderCard
                provider={provider}
                selected={choices.indexOf(provider.provider_id) !== -1}
                select={handleProviderSelect}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Providers;
