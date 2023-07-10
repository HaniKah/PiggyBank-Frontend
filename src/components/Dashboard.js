import { useContext, useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./styles/dashboard.css";

import {
  BorderStyle,
  ConstructionOutlined,
  FunctionsOutlined,
} from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import { MenuItem, InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import { Container, Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import Charts from "./Chart";
import Grid from "@mui/material/Grid";

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
import IconHome from "./svg/IconHome";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const [isLoading, setIsLoading] = useState(false);
  const {
    categories,
    setCategories,
    categoriesObj,
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
    // effect: "cards",
    // cardsEffect: {
    //   // ...
    // },

    direction: "horizontal",
    loop: true,

    // pagination: {
    //   el: ".swiper-pagination",
    // },

    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });

  // ===========================
  // useStates
  // ===========================

  // const [initialSpend, initialSpend] = useState();
  // const [budgetBar, setBudgetBar] = useState();
  // const [budgetSum, setBudgetSum] = useState();
  // const [spentBar, setSpentBar] = useState();
  // const [savings, setSavings] = useState();
  // const [debitTrans, setDebitTrans] = useState([]);
  // const [creditTrans, setCreditTrans] = useState([]);
  // const [incomeSum, setIncomeSum] = useState();
  const [filter, setFilter] = useState("month");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [spentBar, setSpentBar] = useState(0);
  const [budgetBar, setBudgetBar] = useState(0);

  // const [expensesSumBudgets, setExpensesSumBudgets] = useState(0);

  // =============================================================================================
  // =============================================================================================
  // =========================================================================
  // filtering Data
  // ========================================================================

  useEffect(() => {
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    setEndDate(today);
    const last5Years = new Date(
      now.getFullYear() - 5,
      now.getMonth(),
      now.getDate()
    ).getTime();
    setStartDate(last5Years);
  }, []);

  useEffect(() => {
    const now = new Date();
    if (filter === "week") {
      const lastWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      ).getTime();
      setStartDate(lastWeek);
    }
    if (filter === "month") {
      const lastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      ).getTime();
      setStartDate(lastMonth);
    }
    if (filter === "3months") {
      const last3Months = new Date(
        now.getFullYear(),
        now.getMonth() - 3,
        now.getDate()
      ).getTime();
      setStartDate(last3Months);
    }
    if (filter === "6months") {
      const last6Months = new Date(
        now.getFullYear(),
        now.getMonth() - 6,
        now.getDate()
      ).getTime();
      setStartDate(last6Months);
    }
    if (filter === "year") {
      const lastYear = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      ).getTime();
      setStartDate(lastYear);
    }
    if (filter === "all") {
      const last5Years = new Date(
        now.getFullYear() - 5,
        now.getMonth(),
        now.getDate()
      ).getTime();
      setStartDate(last5Years);
    }
  }, [filter]);

  useEffect(() => {
    console.log("started useEffect(); started to filter tranData", tranData);

    const filtered = tranData?.filter((data) => {
      const timestampDate = new Date(data.tran_date).getTime();
      return timestampDate < endDate && timestampDate > startDate;
    });
    // const filtered = tranData;

    setFilteredData(filtered);
    console.log("ended useEffect(); filtered is", filtered);
  }, [tranData, endDate, startDate]);

  const creditTrans = filteredData?.filter((trans) => trans.tran_sign === "CR");
  console.log("creditTrans is", creditTrans);

  // setCreditTrans(creditTrans);
  const debitTrans = filteredData?.filter((trans) => trans.tran_sign === "DR");
  console.log("debitTrans is", debitTrans);

  // setDebitTrans(debitTrans);
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
  // const savings = incomeSum - budgetSum - expensesSum;
  const savings = incomeSum - budgetSum - expensesSum;

  //graphic bars
  useEffect(() => {
    if (expensesSum !== 0) {
      setSpentBar((expensesSum * 100) / incomeSum);
    }
  }, [expensesSum]);

  useEffect(() => {
    if (expensesSumBudgets !== 0) {
      setBudgetBar((expensesSumBudgets * 100) / budgetSum);
    }
  }, [expensesSumBudgets]);

  // const spentBar = (expensesSum * 100) / incomeSum;
  // const spentBar = (expensesSum * 100) / incomeSum;
  // const budgetBar = (expensesSumBudgets * 100) / budgetSum;

  // =========================================================================
  // filtering Data
  // ========================================================================

  // console.log("tranData", tranData);
  // console.log("categoriesObj", categoriesObj);
  // console.log("savings", savings);
  // console.log("budgetData", budgetData);
  // console.log("incomeSum:", incomeSum);
  // console.log("expensesSum:", expensesSum);
  // console.log("spentbar:", spentBar);
  // console.log("sumBudgets", expensesSumBudgets);
  // console.log("endDate", endDate);
  // console.log("filtered Data", filteredData);
  console.log("start Date", startDate);
  console.log("end Date", endDate);

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
    <Container
      sx={{
        paddingTop: "100px",
        maxWidth: "sm",
        minHeight: "100vh",
      }}
      style={{
        background: styling.backgroundColor,
        paddingBottom: styling.paddingBottom,
      }}
    >
      <Grid container className="dash-container">
        {/* ===============================================
                            filter
        ============================================= */}
        <Grid item xs={12}>
          <Box component="div" className="transaction-filter">
            <FormControl fullWidth>
              <InputLabel
                // style={{ color: styling.txtColor }}
                sx={{ fontSize: " 20px" }}
                id="demo-simple-select-label"
              >
                Filter
              </InputLabel>
              <Select
                style={{
                  backgroundColor: styling.backgroundBoard,
                  borderRadius: "15px",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  textAlign: "left",
                  "& fieldset": {
                    borderRadius: "15px",
                  },
                  fontSize: "15px",
                }}
              >
                <MenuItem value={"all"} sx={{ fontSize: "14px" }}>
                  All
                </MenuItem>
                <MenuItem value={"week"} sx={{ fontSize: "14px" }}>
                  Last Week
                </MenuItem>
                <MenuItem value={"month"} sx={{ fontSize: "14px" }}>
                  Last Month
                </MenuItem>
                <MenuItem value={"3months"} sx={{ fontSize: "14px" }}>
                  Last 3 Months
                </MenuItem>
                <MenuItem value={"6months"} sx={{ fontSize: "14px" }}>
                  Last 6 Months
                </MenuItem>
                <MenuItem value={"year"} sx={{ fontSize: "14px" }}>
                  Last Year
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
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
          <Box className="linear-progress-container1">
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
          </Box>
          <p style={{ color: styling.txtColor }} className="spent-title">
            Budget
          </p>
          <Box className="linear-progress-container2">
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
          </Box>
        </Link>

        {/* ===================================
                 chart
====================================== */}
        <Charts />
        {/* ===================================
                  budgets
====================================== */}
        <Grid
          item
          xs={12}
          sx={{
            // paddingTop: "1rem",
            // paddingBottom: "1rem",
            textAlign: "center",
          }}
          style={{ cursor: "grab" }}
        >
          <Box className="swiper">
            <Box className="swiper-wrapper">
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
                  <Box
                    style={{
                      background: styling.backgroundBoard,
                      border: styling.borders,
                    }}
                    className="swiper-slide"
                  >
                    <Box className="dash-budget">
                      {(() => {
                        const Icon =
                          categoryIcons[
                            each.category_name ? each.category_name : "others"
                          ];

                        return <Icon className="dash-icon-title" />;
                      })()}
                      <Box className="dash-budget-wrapper">
                        <p
                          style={{ color: styling.txtColor }}
                          className="dash-budget-title"

                          // style={{ fontSize: "20px", paddingTop: "5px" }}
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
                      </Box>
                    </Box>

                    <Box className="linear-progress-container2">
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
                        // value={(() => {
                        //   if (categoriesObj[each.category_name]) {
                        //     const percentage =
                        //       (categoriesObj[each.category_name].spent *
                        //         100 *
                        //         100) /
                        //       categoriesObj[each.category_name.limit];
                        //     return percentage > 100 ? 100 : percentage;
                        //   }
                        // })()}

                        // no spents ( zero spent)
                        // more than limit
                        // normal amount
                        value={spentBudgetBar}

                        // value={50}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box
              class="swiper-pagination"
              sx={{
                padding: "15px",
              }}
            ></Box>

            <Box
              style={{ backgroundColor: styling.pagination }}
              class="swiper-scrollbar"
            ></Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
