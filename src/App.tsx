import React from "react";
import { RecoilRoot } from "recoil";
import "styled-components/macro";

import { WSConnect } from "components/WSConnect";

export const App = () => {
  return (
    <RecoilRoot>
      <WSConnect />
    </RecoilRoot>
  );
};
