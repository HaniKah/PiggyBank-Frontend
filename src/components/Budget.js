import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import LinearProgress from "@mui/material/LinearProgress";
import { DataContext } from "../context/DataContext"; //importing datacontext

import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterBar from "./FilterBar";

import "./styles/budget.css";

import DialogConfirm from "./DialogConfirm";

import { ReactComponent as IconAddNew } from "./svgCategories/add-new.svg";
import { ReactComponent as IconBills } from "./svgCategories/bills.svg";
import { ReactComponent as IconCommunication } from "./svgCategories/communication.svg";
import { ReactComponent as IconEatingOut } from "./svgCategories/eating-out.svg";
import { ReactComponent as IconEducation } from "./svgCategories/education.svg";
import { ReactComponent as IconEntertainment } from "./svgCategories/entertainment.svg";
import { ReactComponent as IconGroceries } from "./svgCategories/groceries.svg";
import { ReactComponent as IconInsurance } from "./svgCategories/insurance.svg";
import { ReactComponent as IconMedicine } from "./svgCategories/medicine.svg";
import { ReactComponent as IconOthers } from "./svgCategories/others.svg";
import { ReactComponent as IconPets } from "./svgCategories/pets.svg";
import { ReactComponent as IconRent } from "./svgCategories/rent.svg";
import { ReactComponent as IconRepairs } from "./svgCategories/repairs.svg";
import { ReactComponent as IconTransportation } from "./svgCategories/transportation.svg";
import { ReactComponent as IconWork } from "./svgCategories/work.svg";
import { ReactComponent as IconTrash } from "./svgCategories/trash.svg";
import { ReactComponent as IconManualEntry } from "./svgCategories/manualEntry.svg";

import { ThemeContext } from "../context/ThemeContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function Budget() {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedCat, setExpandedCat] = React.useState("");
  const {
    categories,
    setCategories,
    categoriesObj,
    budgetData,
    setBudgetData,
    tranData,
    setTranData,
    refresh,
    setRefresh,
  } = useContext(DataContext);

  const { styling } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [budgetDeleteName, setBudgetDeleteName] = useState("false");
  const [budgetDeleteId, setBudgetDeleteId] = useState(null);

  const navigate = useNavigate();
  const actions = [
    { icon: <IconManualEntry />, name: "Add Budget", route: "/addbudget" },
  ];

  const handleActionClick = (route) => {
    navigate(route);
    setOpen(false);
  };
  const paperStyles = {
    // Customize the background color here
    background: "linear-gradient(#c80048, #961c48)",
  };

  const categoryIcons = {
    bills: IconBills,
    communication: IconCommunication,
    eatingOut: IconEatingOut,
    education: IconEducation,
    entertainment: IconEntertainment,
    groceries: IconGroceries,
    insurance: IconInsurance,
    medicine: IconMedicine,
    others: IconOthers,
    pets: IconPets,
    rent: IconRent,
    repairs: IconRepairs,
    transport: IconTransportation,
    work: IconWork,
    food: IconEatingOut,
    others: IconOthers,
  };

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let euro = Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  });
  let pounds = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="General">
      <FilterBar />

      <div className="budget-container">
        {dialogOpen ? (
          <DialogConfirm
            setDialogOpen={setDialogOpen}
            budgetDeleteName={budgetDeleteName}
            budgetDeleteId={budgetDeleteId}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ) : null}

        {budgetData.length ? null : "You have not added a Budget Limit yet."}

        {budgetData?.map((element) => {
          let spentBudgetBar = 0;
          if (
            categoriesObj[element.category_name]?.spent <
            categoriesObj[element.category_name]?.limit
          ) {
            spentBudgetBar =
              (categoriesObj[element.category_name].spent * 100) /
              categoriesObj[element.category_name].limit;
          }
          if (
            categoriesObj[element.category_name]?.spent >
            categoriesObj[element.category_name]?.limit
          ) {
            spentBudgetBar = 100;
          }

          return (
            <Accordion
              style={{
                backgroundColor: styling.backgroundBoard,
                border: styling.borders,
                borderRadius: "15px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: styling.txtColor,
                    }}
                  />
                }
              >
                <div className="budget-wrapper-test">
                  <div className="budget-header">
                    {(() => {
                      const Icon =
                        categoryIcons[
                          element.category_name
                            ? element.category_name
                            : "others"
                        ];

                      return <Icon className="dash-icon-title" />;
                    })()}

                    <div className="budget-text">
                      <p
                        style={{ color: styling.txtColor }}
                        className="dash-budget-title"

                        // style={{ fontSize: "20px", paddingTop: "5px" }}
                      >
                        {element.category_name.replace(/^[\w]/, (c) =>
                          c.toUpperCase()
                        )}
                      </p>
                      <p
                        style={{ color: styling.txtColor }}
                        className="dash-budget-info"
                      >
                        {categoriesObj[element.category_name]
                          ? Number(element.limit_amount) -
                            categoriesObj[element.category_name].spent
                          : Number(element.limit_amount)}
                        € Remaining
                      </p>
                    </div>
                    <IconTrash
                      className="budget-iconTrash"
                      style={{ fill: styling.txtColor }}
                      onClick={() => {
                        setBudgetDeleteName(element.category_name);
                        setBudgetDeleteId(element._id);
                        setDialogOpen(true);
                      }}
                    />
                  </div>
                  <div className="linear-progress-container2">
                    <p
                      style={
                        (categoriesObj[element.category_name]?.spent * 100) /
                          categoriesObj[element.category_name]?.limit >
                        10
                          ? { color: "white" }
                          : { color: "black" }
                      }
                      className="progress-left"
                    >
                      {categoriesObj?.hasOwnProperty(element.category_name)
                        ? `${categoriesObj[element.category_name].spent} $`
                        : "0 $"}
                    </p>
                    <p
                      style={
                        (categoriesObj[element.category_name]?.spent * 100) /
                          categoriesObj[element.category_name]?.limit >
                        90
                          ? { color: "white" }
                          : { color: "black" }
                      }
                      className="progress-right"
                    >
                      {element.limit_amount} €
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={spentBudgetBar}
                    />
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {tranData
                  .filter(
                    (item) =>
                      item.tran_sign === "DR" &&
                      item.category_name === element.category_name
                  )
                  .sort((a, b) => new Date(b.tran_date) - new Date(a.tran_date))
                  .slice(0, 10)
                  .map((element) => {
                    const origDate = element.tran_date;
                    const newDate = new Date(origDate);
                    const newLocalDate = newDate
                      .toLocaleDateString("en-GB")
                      .replace(/[/]/g, ".");

                    const capitalizedDesc = element.tran_description.replace(
                      /./,
                      (c) => c.toUpperCase()
                    );
                    return (
                      <div className="budget-transaction-div" key={element._id}>
                        <p className="budget-transaction-info">
                          {USDollar.format(element.tran_amount)}
                        </p>
                        <p className="budget-transaction-info">
                          {capitalizedDesc}
                        </p>
                        <p className="budget-transaction-info">
                          {newLocalDate}
                        </p>
                      </div>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          );
        })}
        <div className="speedDial-wrapper">
          <SpeedDial
            className="speedDial"
            ariaLabel="SpeedDial tooltip example"
            icon={<AddIcon style={{ color: "#FFFF", fontSize: "30px" }} />}
            onClose={() => {
              setOpen(false);
            }}
            onOpen={() => {
              setOpen(true);
            }}
            open={open}
            FabProps={{
              style: paperStyles,
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={() => handleActionClick(action.route)}
              />
            ))}
          </SpeedDial>
        </div>
      </div>
    </div>
  );
}
