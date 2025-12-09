import React from "react";
import { useNavigate } from "react-router-dom";

export function SubCategory({ sub }) {
  const navigate = useNavigate();

  const goSub = (e) => {
    e.stopPropagation();
    navigate(`/category/${encodeURIComponent(sub.name)}`, {
      state: { type: "sub", id: sub.id },
    });
  };

  return <li onClick={goSub}>{sub.name}</li>;
}
