import React from "react";
import fn from "../lib/formatNumber";
import { useAppContext } from "../Context/AppContext";

function ListItem({ description, value, type, onDelete }) {
  const { getTotalIncome } = useAppContext();
  const percentage = Math.round((value / getTotalIncome) * 100);
  const symbol = type === "income" ? "+" : "-";
  return (
    <div className="item clearfix">
      <div className="item__description">{description}</div>
      <div className="right clearfix">
        <div className="item__value">{`${symbol} ${fn(value)}`}</div>
        {type === "expenses" && (
          <div className="item__percentage">{`${percentage}%`}</div>
        )}
        <div className="item__delete">
          <button onClick={onDelete} className="item__delete--btn">
            <i className="ion-ios-close-outline"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
