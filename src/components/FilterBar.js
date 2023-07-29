import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../context/DataContext";
import { ThemeContext } from "../context/ThemeContext";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function FilterBar() {
  const { activeFilter, setActiveFilter } = useContext(DataContext);
  const { styling } = useContext(ThemeContext);
  const today = new Date();

  return (
    <div
      className="direct-filter"
      style={{
        border: styling.borders,
        background: styling.backgroundBoard,
      }}
    >
      <p
        style={{ color: styling.txtColor }}
        className={
          activeFilter == today.getFullYear() ? "activemonth" : "month"
        }
        onMouseUp={() => setActiveFilter(today.getFullYear())}
      >
        {today.getFullYear()}
      </p>
      {months.map((month, i) => (
        <p
          key={i}
          className={activeFilter == i ? "activemonth" : "month"}
          onMouseUp={() => setActiveFilter(i)}
          style={{ color: styling.txtColor }}
        >
          {month}
        </p>
      ))}
    </div>
  );
}
