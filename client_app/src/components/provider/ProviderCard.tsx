import React from "react";
import { Badge, Card } from "antd";
import { ImagesAPI } from "../../api/api";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { IProvider } from "./providerSlice";

interface IProviderCardProps {
  provider: IProvider;
  selected: boolean;
  select: (id: number) => void;
}

const ProviderCard: React.FC<IProviderCardProps> = ({
  provider,
  selected,
  select,
}) => {
  const handleProviderSelect = () => {
    select(provider.provider_id);
  };

  let card = (
    <Card
      onClick={handleProviderSelect}
      hoverable
      style={{ width: 180 }}
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

  if (selected) {
    return (
        <div>
      <Badge count={<CheckCircleTwoTone twoToneColor="#52c41a" />}>
        {card}
      </Badge>
      </div>
    );
  }
  return card;
};

export default ProviderCard;
