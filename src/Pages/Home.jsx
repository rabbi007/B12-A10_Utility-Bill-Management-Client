import React from "react";
import Banner from "../Components/Banner";
import CategorySection from "../Components/CategorySection";
import RecentBills from "../Components/RecentBills";


const Home = () => {
  return (
       <div>
        <Banner/>
        <CategorySection/>
        <RecentBills/>
      </div>
  );
};

export default Home;
