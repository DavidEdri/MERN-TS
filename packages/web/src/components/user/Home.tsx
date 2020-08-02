import React from "react";
import { useGuaranteedUserSelector } from "../../redux";

export default function Home() {
  const user = useGuaranteedUserSelector();

  return <div>{`hello ${user.name}`}</div>;
}
