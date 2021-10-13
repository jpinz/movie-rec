import React from 'react';
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

export default Page1;