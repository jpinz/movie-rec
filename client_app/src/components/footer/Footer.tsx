import { Steps } from "antd";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectPage, nextPage, prevPage, IPage } from "./footerSlice";
import { useHistory } from "react-router-dom";

const { Step } = Steps;

interface IFooterProps {
  pages: IPage[];
}

const Footer: React.FC<IFooterProps> = ({ pages }) => {
  const currentPage = useAppSelector((state) => state.footer.page);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handlePageSelect = (selectedPage: number) => {
    dispatch(selectPage(selectedPage));
    if (selectedPage === 0) {
      history.push("/");
    } else {
      history.push(`/page${selectedPage + 1}`);
    }
  };

  let stepMaker = pages.map((page, index) => {
    return (
      <Step key={index} title={page.name} description={page.description} />
    );
  });

  return (
    <Steps current={currentPage} onChange={handlePageSelect}>
      {stepMaker}
    </Steps>
  );
};

export default Footer;
