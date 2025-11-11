import React, { useEffect } from "react";
import Banner from "../Components/Banner";
import CategorySection from "../Components/CategorySection";
import RecentBills from "../Components/RecentBills";
import AboutPreview from "../Components/AboutPreview";
import FaqPreview from "../Components/FaqPreview";
import useDocumentTitle from "../Hook/useDocumentTitle";


const Home = () => {
  useDocumentTitle('Home → Utility Bill Management');
  // auto scroll to top of this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner />
      <CategorySection />
      <RecentBills />
      <AboutPreview />
      <FaqPreview/>
    </div>
  );
};

export default Home;
