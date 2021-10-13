import React from 'react';
import RegionComponent from '../components/region/Region';
import Genres from '../components/genres/Genres';

function Page2() {
  return (
    <div className="Page1">
        <Genres />
        <p>No Genres</p>
        <p>Content Rating</p>
        <p>Provider or Rent/buy</p>
    </div>
  );
}

export default Page2;