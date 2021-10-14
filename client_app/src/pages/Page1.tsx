import React from 'react';
import { IPage } from '../components/footer/footerSlice';
import MediaTypes from '../components/mediaTypes/MediaTypes';
import RegionComponent from '../components/region/Region';

function Page1() {
  return (
    <div className="Page1">
        <MediaTypes />
        <RegionComponent />
    </div>
  );
}

export const page1_def: IPage = {
  number: 1,
  name: "Page 1",
  description: "Media Type & Region"
}

export default Page1;