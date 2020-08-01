import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/State";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  return <div>{`hello ${user.name}`}</div>;
}
