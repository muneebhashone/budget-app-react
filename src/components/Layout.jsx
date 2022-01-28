import React from "react";
import getCurrentMonthWithYear from "../lib/getCurrentMonthWithYear";
import { useAppContext } from "../Context/AppContext";
import fn from "../lib/formatNumber";

function Layout({ children }) {
  const { getTotalIncome, getTotalExpense } = useAppContext();

  const getPercentage =
    Math.round((getTotalExpense / getTotalIncome) * 100) || 0;

  return (
    <>
      <div className="top">
        <div className="budget">
          <div className="budget__title">
            Available Budget in{" "}
            <span className="budget__title--month">
              {getCurrentMonthWithYear()}
            </span>
          </div>

          <div className="budget__value">{`+ ${fn(
            getTotalIncome - getTotalExpense
          )}`}</div>

          <div className="budget__income clearfix">
            <div className="budget__income--text">Income</div>
            <div className="right">
              <div className="budget__income--value">{`+ ${fn(
                getTotalIncome
              )}`}</div>
              <div className="budget__income--percentage">&nbsp;</div>
            </div>
          </div>

          <div className="budget__expenses clearfix">
            <div className="budget__expenses--text">Expenses</div>
            <div className="right clearfix">
              <div className="budget__expenses--value">{`- ${fn(
                getTotalExpense
              )}`}</div>
              <div className="budget__expenses--percentage">
                {getPercentage}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">{children}</div>
    </>
  );
}

export default Layout;
