import React from 'react';
import Genres from '../components/genres/Genres';
import ContentRating from '../components/contentRating/ContentRating';

function Page2() {
  return (
    <div className="Page1">
        <Genres />
        <ContentRating />
        <p>Provider or Rent/buy</p>
    </div>
  );
}

export default Page2;