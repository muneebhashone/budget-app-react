import React from "react";
import ListItem from "./ListItem";
import { useAppContext } from "../Context/AppContext";

function ListOverview({ type, list }) {
  const { dispatch } = useAppContext();

  const handleItemDelete = (id, type) => {
    let action;
    if (type === "income") {
      action = "deleteIncome";
    } else {
      action = "deleteExpense";
    }

    dispatch({ type: action, payload: id });
  };

  return (
    <div className={type}>
      <h2 className={`${type}__title`}>{type}</h2>

      <div className={`${type}__list`}>
        {list.map((listItem) => {
          return (
            <ListItem
              key={listItem.id}
              description={listItem.description}
              value={listItem.value}
              type={type}
              percentage={listItem?.percentage}
              onDelete={() => handleItemDelete(listItem.id, type)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ListOverview;
