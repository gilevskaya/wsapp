import React from "react";
import Recoil from "recoil";
import "styled-components/macro";

import { wsState } from "state";
import { ls } from "utils";
import { colors } from "style";

export const URLInput = ({
  onConnect,
  onDisconnect,
}: {
  onConnect: Function;
  onDisconnect: Function;
}) => {
  const [wsUrl, setWsUrl] = Recoil.useRecoilState<string>(wsState.url);
  const wsReadyState = Recoil.useRecoilValue<number | null>(wsState.readyState);

  const isDisconnected = wsReadyState !== WebSocket.OPEN;

  return (
    <>
      <WSConnection />
      <div
        css={`
          height: 2.4rem;
          box-sizing: border-box;
          display: flex;
          align-items: stretch;
        `}
      >
        <input
          type="text"
          css={`
            outline: none;
            flex: 11;
            background-color: ${colors.gray._500};
            border: 1px solid ${colors.gray._800};
            padding-left: 0.8rem;
            padding-right: 0.8rem;
            font-weight: 600;
            font-size: 14pt;
          `}
          value={wsUrl}
          onChange={(e) => {
            setWsUrl(e.target.value);
          }}
        />
        <div
          css={`
            flex: 2;
          `}
        >
          <Button
            text={isDisconnected ? "connect" : "disconnect"}
            color={isDisconnected ? "green" : "red"}
            onClick={() => {
              if (isDisconnected) {
                onConnect(wsUrl);
                ls.setWsUrl(wsUrl);
              } else onDisconnect();
            }}
          />
        </div>
      </div>
    </>
  );
};

export const Button = ({
  color,
  onClick,
  text,
}: {
  color: "red" | "green";
  onClick: any;
  text: string;
}) => {
  const cmap = {
    green: [colors.green._800, colors.green._700, colors.green._600],
    red: [colors.red._800, colors.red._700, colors.red._600],
  };
  return (
    <button
      css={`
        width: 100%;
        height: 100%;
        text-align: center;
        outline: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 14pt;
        border: 1px solid ${cmap[color][0]};
        background: ${cmap[color][1]};
        &:hover {
          border: 1px solid ${cmap[color][1]};
          background: ${cmap[color][2]};
        }
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const WSConnection = () => {
  const wsReadyState = Recoil.useRecoilValue(wsState.readyState);
  return (
    <div
      css={`
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-size: 8pt;
        font-style: italic;
        font-weight: 400;
        color: ${colors.gray._500};
      `}
    >
      {getReadyStateName(wsReadyState) || ""}&nbsp;
    </div>
  );
};

function getReadyStateName(readyState: number | null): string {
  if (readyState == null) return "";
  /* 0 */ else if (readyState === WebSocket.CONNECTING) return "connecting";
  /* 1 */ else if (readyState === WebSocket.OPEN) return "open";
  /* 2 */ else if (readyState === WebSocket.CLOSING) return "closing";
  /* 3 */ else if (readyState === WebSocket.CLOSED) return "closed"; // 3
  throw new Error(`Unexpected connection code: ${readyState}`);
}
