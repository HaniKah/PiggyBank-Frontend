import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { ThemeContext } from "../context/ThemeContext";
import { Container } from "@mui/material";
import "./styles/reports.css";
import FilterBar from "./FilterBar";

//importing SVG -------------------
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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { div } from "plaid-threads";
export default function Reports() {
  const { categories, tranData } = useContext(DataContext);
  const { styling } = useContext(ThemeContext);
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
  return (
    <div className="General">
      <FilterBar />

      <div className="dash-topSpending">
        {categories?.map((category) => {
          const IconComponent = categoryIcons[category.name]
            ? categoryIcons[category.name]
            : categoryIcons["others"];
          return (
            <Accordion
              sx={{
                width: "100%",
                borderRadius: "15px",
              }}
              style={{
                backgroundColor: styling.backgroundBoard,
                border: styling.borders,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: styling.txtColor }} />}
              >
                <div className="spending-container">
                  <IconComponent />
                  <div className="spending-div">
                    <p
                      className="rep-title"
                      style={{ color: styling.txtColor }}
                    >
                      {category.name.replace(/^[\w]/, (c) => c.toUpperCase())}
                    </p>
                    <p style={{ color: styling.txtColor }} className="rep-tran">
                      {category.transactions}{" "}
                      {category.transactions > 1
                        ? "Transactions"
                        : "Transaction"}
                    </p>
                  </div>
                  <span
                    className="rep-total-spent"
                    style={{ color: styling.txtColor }}
                  >
                    {category.spent.toFixed(2)} €
                  </span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {tranData
                  .filter((data) => data.category_name === category.name)
                  .map((data) => (
                    <div key={data.id} className="rep-trans-accordion">
                      <p className="rep-trans-accordion-amount">
                        {data.tran_amount} €
                      </p>
                      <p>{data.tran_description}</p>
                      <p>
                        {new Date(data.tran_date)
                          .toLocaleDateString("en-GB")
                          .replace(/[/]/g, ".")}
                      </p>
                    </div>
                  ))}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
