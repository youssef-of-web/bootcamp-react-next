import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "./AuthContext.tsx";
import { Spin } from "antd";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useAuth();
  console.log(data);
  const isConnected = data;

  if (isLoading) {
    return <Spin spinning={isLoading} fullscreen={true} />;
  }

  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
