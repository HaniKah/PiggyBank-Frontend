import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ReactComponent as IconHome } from "./svgCategories/home.svg";
import { ReactComponent as IconPlanner } from "./svgCategories/planner.svg";
import { ReactComponent as IconTransactions } from "./svgCategories/transactions.svg";
import { ReactComponent as IconReports } from "./svgCategories/reports.svg";
import "./styles/mainmenu.css";

export default function Menu() {
  const navigate = useNavigate();

  const { styling } = useContext(ThemeContext);

  const handleChange = function (value) {
    if (value === "home") {
      navigate("/dashboard");
    }

    if (value === "planner") {
      navigate("/budget");
    }

    if (value === "transactions") {
      navigate("/transactions");
    }

    if (value === "reports") {
      navigate("/reports");
    }
  };

  return (
    <div className="mainMenu-container">
      <div className="menu-icon">
        <IconHome onClick={() => handleChange("home")} />
      </div>
      <div className="menu-icon">
        <IconPlanner onClick={() => handleChange("planner")} />
      </div>
      <div className="menu-icon">
        <IconTransactions onClick={() => handleChange("transactions")} />
      </div>
      <div className="menu-icon">
        <IconReports value="reports" onClick={() => handleChange("reports")} />
      </div>
    </div>
  );
}
