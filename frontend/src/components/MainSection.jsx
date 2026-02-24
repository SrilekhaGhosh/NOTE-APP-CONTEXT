


import React from "react";
import Card from "./Card";

const MainSection = ({ todos }) => {
  const list = Array.isArray(todos) ? todos : []

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((item) => (
        <Card
          key={item._id}
          title={item.title}
          description={item.description}
          id={item._id}
        />
      ))}
    </div>
  );
};

export default MainSection;
