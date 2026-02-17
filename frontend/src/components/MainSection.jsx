


import React from "react";
import Card from "./Card";

const MainSection = ({ todos, getAll }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {todos &&
        todos.map((item) => (
          <Card
            key={item._id}
            title={item.title}
            description={item.description}
            id={item._id}
            getAll={getAll}
          />
        ))}
    </div>
  );
};

export default MainSection;
