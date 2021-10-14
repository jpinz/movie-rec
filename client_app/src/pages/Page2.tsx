import Genres from '../components/genres/Genres';
import ContentRating from '../components/contentRating/ContentRating';
import Providers from '../components/provider/Providers';
import { IPage } from '../components/footer/footerSlice';

function Page2() {
  return (
    <div className="Page2">
        <Genres />
        <ContentRating />
        <Providers />
    </div>
  );
}

export const page2_def: IPage = {
  number: 2,
  name: "Page 2",
  description: "Genres, Content Rating, and Providers"
}

export default Page2;
