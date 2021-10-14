import Recommendation from '../components/recommendation/Recommendation';
import { IPage } from '../components/footer/footerSlice';

function Page6() {
  return (
    <div className="Page6">
      < Recommendation/>
    </div>
  );
}

export const page6_def: IPage = {
  number: 6,
  name: "Page 6",
  description: "Recommendations"
}

export default Page6;