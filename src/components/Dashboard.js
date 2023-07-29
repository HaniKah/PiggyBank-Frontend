import { useContext, useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./styles/dashboard.css";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import Charts from "./Chart";

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
import { ReactComponent as IconCalendar } from "./svgCategories/calendar.svg";

import FilterBar from "./FilterBar";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const [isLoading, setIsLoading] = useState(false);
  const {
    categories,
    setCategories,
    categoriesObj,
    setCategoriesObj,
    budgetData,
    setBudgetData,
    tranData,
    setTranData,
  } = useContext(DataContext);

  const { styling } = useContext(ThemeContext);

  //===========================
  //Library Initialization
  //===========================

  // init Swiper:
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,

    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });

  // ===========================
  // useStates
  // ===========================

  const [spentBar, setSpentBar] = useState(0);
  const [budgetBar, setBudgetBar] = useState(0);

  /*   ============================================
  filtering incomes and expenses
  ============================================ */

  const creditTrans = tranData?.filter((trans) => trans.tran_sign === "CR");

  const debitTrans = tranData?.filter((trans) => trans.tran_sign === "DR");

  const incomeSum = creditTrans
    .reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.tran_amount),
      0
    )
    .toFixed(2);

  const expensesSum = debitTrans
    .reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.tran_amount),
      0
    )
    .toFixed(2);

  let expensesSumBudgets = 0;
  categories.map((category) => {
    if (category.limit > 0) {
      // expensesSumBudgets = expensesSumBudgets + category.spent;
      expensesSumBudgets = Number(expensesSumBudgets + category.spent).toFixed(
        2
      );
    }
  });
  //==============================================================
  //calculate budgets
  //===============================================================

  const budgetSum = budgetData
    ?.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.limit_amount),
      0
    )
    .toFixed(2);

  //expected to save
  const savings = incomeSum - budgetSum - expensesSum;

  //graphic bars
  useEffect(() => {
    if (expensesSum > 0) {
      setSpentBar((expensesSum * 100) / incomeSum);
    } else {
      setSpentBar(0);
    }
  }, [expensesSum]);

  useEffect(() => {
    if (expensesSumBudgets > 0) {
      setBudgetBar((expensesSumBudgets * 100) / budgetSum);
    } else {
      setBudgetBar(0);
    }
  }, [expensesSumBudgets]);

  /*   ======================================
  matching icon with the right category
  ============================================== */

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
    <>
      <div className="General">
        <FilterBar />
        <div className="dash-container">
          {/* ===============================================
                            filter
        ============================================= */}

          {/* =========================================
                          balance
====================================== */}
          <Link
            to="/transactions"
            className="dash-progress"
            style={{
              border: styling.borders,
              backgroundColor: styling.backgroundBoard,
            }}
          >
            <p style={{ color: styling.txtColor }} className="current-balance">
              Current Balance
            </p>
            <h2 style={{ color: styling.txtColor }} className="dash-balance">
              {" "}
              {(incomeSum - expensesSum).toFixed(2)} €
            </h2>

            <p style={{ color: styling.txtColor }} className="dash-expected">
              Expected savings: {savings.toFixed(2)} €
            </p>
            <p style={{ color: styling.txtColor }} className="spent-title">
              Spent
            </p>
            <div className="linear-progress-container1">
              <Typography
                style={spentBar > 10 ? { color: "white" } : { color: "black" }}
                className="progress-left"
                variant="h5"
                // style={{ fontSize: "18px", paddingTop: "5px" }}
              >
                {expensesSum} €
              </Typography>

              <Typography
                style={spentBar > 90 ? { color: "white" } : { color: "black" }}
                className="progress-right"
                variant="h5"
                // style={{ fontSize: "20px", color: "blue", paddingTop: "5px" }}
              >
                {incomeSum} €
              </Typography>
              <LinearProgress
                variant="determinate"
                value={spentBar == 0 ? 0 : spentBar > 100 ? 100 : spentBar}

                // style={{
                //   padding: "18px 100px",
                // }}
              />
            </div>
            <p style={{ color: styling.txtColor }} className="spent-title">
              Budget
            </p>
            <div className="linear-progress-container2">
              <Typography
                style={budgetBar > 10 ? { color: "white" } : { color: "black" }}
                className="progress-left"
                variant="h5"
                // style={{ fontSize: "18px", paddingTop: "5px", color: "red" }}
              >
                {expensesSumBudgets} €
              </Typography>
              <Typography
                style={budgetBar > 90 ? { color: "white" } : { color: "black" }}
                className="progress-right"
                variant="h5"
                // style={{ fontSize: "20px", paddingTop: "5px", color: "blue" }}
              >
                {budgetSum} €
              </Typography>
              <LinearProgress
                variant="determinate"
                value={budgetBar === 0 ? 0 : budgetBar > 100 ? 100 : budgetBar}
                // style={{
                //   padding: "18px 100px",
                // }}
              />
            </div>
          </Link>

          {/* ===================================
                 chart
====================================== */}
          <Charts categories={categories} />
          {/* ===================================
                  budgets
====================================== */}

          <div style={{ cursor: "grab" }} className="swiper">
            <div className="swiper-wrapper">
              {budgetData?.map((each) => {
                let spentBudgetBar = 0;
                if (
                  categoriesObj[each.category_name]?.spent <
                  categoriesObj[each.category_name]?.limit
                ) {
                  spentBudgetBar =
                    (categoriesObj[each.category_name].spent * 100) /
                    categoriesObj[each.category_name].limit;
                }
                if (
                  categoriesObj[each.category_name]?.spent >
                  categoriesObj[each.category_name]?.limit
                ) {
                  spentBudgetBar = 100;
                }
                return (
                  <div
                    style={{
                      background: styling.backgroundBoard,
                      border: styling.borders,
                    }}
                    className="swiper-slide"
                  >
                    <div className="dash-budget">
                      {(() => {
                        const Icon =
                          categoryIcons[
                            each.category_name ? each.category_name : "others"
                          ];

                        return <Icon className="dash-icon-title" />;
                      })()}
                      <div className="dash-budget-wrapper">
                        <p
                          style={{ color: styling.txtColor }}
                          className="dash-budget-title"
                        >
                          {each.category_name.replace(/^[\w]/, (c) =>
                            c.toUpperCase()
                          )}
                        </p>
                        <p
                          style={{ color: styling.txtColor }}
                          className="dash-budget-info"
                        >
                          {categoriesObj[each.category_name]
                            ? Number(each.limit_amount) -
                              categoriesObj[each.category_name].spent
                            : Number(each.limit_amount)}
                          € Remaining
                        </p>
                      </div>
                    </div>

                    <div className="linear-progress-container2">
                      <Typography
                        style={
                          (categoriesObj[each.category_name]?.spent * 100) /
                            categoriesObj[each.category_name]?.limit >
                          10
                            ? { color: "white" }
                            : { color: "black" }
                        }
                        className="progress-left"
                        variant="h5"
                      >
                        {categoriesObj?.hasOwnProperty(each.category_name)
                          ? `${categoriesObj[each.category_name].spent} $`
                          : "0 $"}
                      </Typography>
                      <Typography
                        style={
                          (categoriesObj[each.category_name]?.spent * 100) /
                            categoriesObj[each.category_name]?.limit >
                          90
                            ? { color: "white" }
                            : { color: "black" }
                        }
                        className="progress-right"
                        variant="h5"
                      >
                        {each.limit_amount} €
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={spentBudgetBar}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              class="swiper-pagination"
              sx={{
                padding: "15px",
              }}
            ></div>

            <div
              style={{ backgroundColor: styling.pagination }}
              class="swiper-scrollbar"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
