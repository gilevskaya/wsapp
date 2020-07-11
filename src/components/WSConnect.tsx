import React from "react";
import Recoil from "recoil";
import Dashboard from "react-grid-dashboard";
import "styled-components/macro";

import { MsgList } from "./MsgList";
import { MsgInput } from "./MsgInput";
import { URLInput } from "./URLInput";
import { wsState } from "state";
import { colors } from "style";

export const WSConnect = () => {
  const setWsReadyState = Recoil.useSetRecoilState<number | null>(
    wsState.readyState
  );
  const setWsSendMessage = Recoil.useSetRecoilState<Function | null>(
    wsState.sendMessage
  );
  const setWsLastMessage = Recoil.useSetRecoilState<string | null>(
    wsState.lastMessage
  );
  const wsConnection = React.useRef<WebSocket | null>(null);

  const connect = (url: string) => {
    const socket = new WebSocket(url);
    setWsReadyState(socket.readyState);
    wsConnection.current = socket;

    socket.addEventListener("open", () => {
      setWsReadyState(socket.readyState);
    });

    socket.addEventListener("message", (event) => {
      // console.log("<-", event.data);
      setWsLastMessage(event.data);
    });

    socket.addEventListener("close", () => {
      setWsReadyState(socket.readyState);
      setWsSendMessage(null);
      wsConnection.current = null;
    });
  };

  const disconnect = () => {
    if (wsConnection.current) {
      wsConnection.current.close();
      wsConnection.current = null;
      setWsLastMessage(null);
    }
  };

  console.log("wsConnection.current", wsConnection.current);

  return (
    <div
      css={`
        height: 100vh;
        color: ${colors.gray._200};
        background: ${colors.gray._900};
        display: flex;
        flex-direction: column;
      `}
    >
      <Dashboard
        columns={1}
        rows={12}
        layout={{
          url: { x: 1, y: 1, w: 1, h: 1 },
          msgs: { x: 1, y: 2, w: 1, h: 8 },
          input: { x: 1, y: 10, w: 1, h: 3 },
        }}
      >
        <Dashboard.Item id="url">
          <div
            css={`
              height: 100%;
              padding: 10px;
            `}
          >
            <URLInput onConnect={connect} onDisconnect={disconnect} />
          </div>
        </Dashboard.Item>
        <Dashboard.Item id="msgs">
          <div
            css={`
              height: 100%;
              padding: 10px;
              overflow-y: auto;
            `}
          >
            <MsgList />
          </div>
        </Dashboard.Item>
        <Dashboard.Item id="input">
          <div
            css={`
              height: 100%;
              padding: 10px;
              margin-bottom: 20px;
            `}
          >
            <MsgInput
              onSend={(msg: string) => {
                let msgToSend;
                try {
                  const parsed = JSON.parse(msg);
                  msgToSend = JSON.stringify(parsed);
                } catch (error) {
                  console.error(error);
                  msgToSend = msg;
                }
                console.log("->", msgToSend);
                wsConnection.current?.send(msgToSend);
              }}
            />
          </div>
        </Dashboard.Item>
      </Dashboard>
    </div>
  );
};
