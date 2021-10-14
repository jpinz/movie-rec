import { IPage } from '../components/footer/footerSlice';
import Runtime from '../components/runtime/Runtime';

function Page3() {
  return (
    <div className="Page3">
        <Runtime />
        <p>Year</p>
        <p>Average Rating</p>
        <p>Language</p>
        <p>Style</p>
    </div>
  );
}

export const page3_def: IPage = {
  number: 3,
  name: "Page 3",
  description: "Runtime, year, average rating, language, and cartoon or live action"
}

export default Page3;
