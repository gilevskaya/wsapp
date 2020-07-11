import React from "react";
import Recoil from "recoil";
import "styled-components/macro";

import { wsState } from "state";

export const MsgList = () => {
  const wsLastMessage = Recoil.useRecoilValue<string | null>(
    wsState.lastMessage
  );
  const [wsMessages, setWsMessages] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!wsLastMessage) return;
    setWsMessages((ms) => [...ms, wsLastMessage]);
  }, [wsLastMessage]);

  return (
    <div
      css={`
        font-size: 12pt;
        max-width: 100%;
        word-wrap: break-word;
      `}
    >
      {wsMessages.map((m, i /* TODO: add a proper key */) => (
        <div
          key={i}
          css={`
            padding-bottom: 10px;
          `}
        >
          {m}
        </div>
      ))}
    </div>
  );
};
