import React from "react";
import { ConfigProvider } from "antd";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#eb2f96",
          colorInfo: "#eb2f96",
        },
        components: {
          Input: {
            controlHeight: 40,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
