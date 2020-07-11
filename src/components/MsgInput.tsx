import React from "react";
import "styled-components/macro";

import { Button } from "./URLInput";
import { colors } from "style";

export const MsgInput = ({ onSend }: { onSend: any }) => {
  const [message, setMessage] = React.useState<string>("");

  return (
    <div
      css={`
        height: 85%;
        display: flex;
      `}
    >
      <textarea
        css={`
          flex: 11;
          outline: none;
          background-color: ${colors.gray._500};
          border: 1px solid ${colors.gray._800};
          padding-left: 0.8rem;
          padding-right: 0.8rem;
          /* font-weight: 600; */
          font-size: 14pt;
        `}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div
        css={`
          flex: 2;
        `}
      >
        <Button color="green" text="send" onClick={() => onSend(message)} />
      </div>
    </div>
  );
};
