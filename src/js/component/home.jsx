import React, { useState } from "react";
import { SecondCounter } from "./SecondsCounter";

const Home = () => {
  return (
    <>
      <SecondCounter second="0" minute="0" hour="0" isRun={false} />
    </>
  );
};

export default Home;