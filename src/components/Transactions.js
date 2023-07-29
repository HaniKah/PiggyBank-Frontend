import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import DialogDeleteTransaction from "./DialogDeleteTransaction";

import { ReactComponent as Trash } from "./svgCategories/trash-icon.svg";
import { ReactComponent as LinkAccount } from "./svgCategories/linkAccount.svg";
import { ReactComponent as ManualEntry } from "./svgCategories/manualEntry.svg";
import { ReactComponent as ScanReceipt } from "./svgCategories/scanHeader.svg";

import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import "./styles/transactions.css";
import FilterBar from "./FilterBar";

const actions = [
  { icon: <LinkAccount />, name: "Link", route: "/link" },
  { icon: <ManualEntry />, name: "Expense", route: "/addexpense" },
  { icon: <ManualEntry />, name: "Income", route: "/addincome" },
  { icon: <ScanReceipt />, name: "Scan", route: "/scan" },
];

export default function Transactions() {
  //state
  const [transaction, setTransaction] = useState("expenses");
  const [filter, setFilter] = useState("");
  const [category_name, setCategory] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tranDeleteName, setTranDeleteName] = useState("false");
  const [tranDeleteId, setTranDeleteId] = useState(null);
  //navigate
  const navigate = useNavigate();
  //context
  const { tranData, setTranData, refresh, setRefresh } =
    useContext(DataContext);
  const { token } = useContext(AuthContext);
  const { styling } = useContext(ThemeContext);
  console.log(tranData);

  //handlers
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = (route) => {
    navigate(route);
    handleClose();
  };

  //transactions functions
  // const handleChange = (event, newValue) => {
  //   setTransaction(newValue);
  // };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  // ===================================
  // delete transactions
  // ==================================

  const handleDeleteTransaction = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `${process.env.REACT_APP_URL}/transaction/${id}`,

        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Transaction successfully deleted
        const deletedTransaction = await response.json();
        console.log(deletedTransaction);
        // Perform any necessary actions after deletion
      } else {
        // Transaction not found or other error occurred
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred while deleting the transaction:", error);
    }
    setRefresh(!refresh);
  };

  const paperStyles = {
    // Customize the background color here
    background: "linear-gradient(#c80048, #961c48)",
    size: "large",
  };

  //Currency Format
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

  return (
    <div className="General">
      <FilterBar />
      <div className="tabs-div">
        <div
          onClick={() => setTransaction("expenses")}
          className={transaction === "expenses" ? "activeTab" : "tab"}
        >
          <h5 className="E">Expenses</h5>
        </div>
        <div
          onClick={() => setTransaction("income")}
          className={transaction === "income" ? "activeTab" : "tab"}
        >
          <h5 className="E">Income</h5>
        </div>
      </div>
      <div className="transactions-container">
        {dialogOpen ? (
          <DialogDeleteTransaction
            setDialogOpen={setDialogOpen}
            tranDeleteName={tranDeleteName}
            tranDeleteId={tranDeleteId}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ) : null}

        {/* Expenses */}
        {transaction === "expenses" && (
          <div>
            <h5 style={{ color: styling.txtColor }}>Spent</h5>

            {tranData
              .filter((element) => {
                const tran_date_timestamp = new Date(
                  element.tran_date
                ).getTime();
                return (
                  tran_date_timestamp <= endDate &&
                  tran_date_timestamp >= startDate
                );
              })
              .filter((element) => element.tran_sign === "DR")
              .sort((a, b) => new Date(b.tran_date) - new Date(a.tran_date))
              .map((element) => {
                const origDate = element.tran_date;
                const newDate = new Date(origDate);
                const newLocalDate = newDate
                  .toLocaleDateString("en-GB") //ADD different Country code here to format it
                  .replace(/[/]/g, ".");
                let capitalizedDesc = "Others";
                if (element.tran_description) {
                  capitalizedDesc = element.tran_description.replace(/./, (c) =>
                    c.toUpperCase()
                  );
                }

                return (
                  <div className="transactionsAll">
                    <div
                      className="transaction-div"
                      key={element._id}
                      style={{ backgroundColor: " var(--gray-0)" }}
                    >
                      <p className="transaction-item">
                        {euro.format(element.tran_amount)}
                      </p>
                      <p className="transaction-item">{capitalizedDesc}</p>
                      <p className="transaction-item">{newLocalDate}</p>

                      <Trash
                        onClick={() => {
                          setDialogOpen(true);
                          setTranDeleteName(element.tran_description);
                          setTranDeleteId(element._id);
                        }}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {/* Income */}
        {transaction === "income" && (
          <div>
            <h5 style={{ color: styling.txtColor }}>Earned</h5>

            {tranData
              .filter((element) => {
                const tran_date_timestamp = new Date(
                  element.tran_date
                ).getTime();
                return (
                  tran_date_timestamp <= endDate &&
                  tran_date_timestamp >= startDate
                );
              })
              .filter((element) => element.tran_sign === "CR")
              .sort((a, b) => new Date(b.tran_date) - new Date(a.tran_date))
              .map((element) => {
                const origDate = element.tran_date;
                const newDate = new Date(origDate);
                const newLocalDate = newDate
                  .toLocaleDateString("en-GB") //ADD different Country code here to format it
                  .replace(/[/]/g, ".");

                const capitalizedDesc = element.tran_description.replace(
                  /./,
                  (c) => c.toUpperCase()
                );
                return (
                  <div className="transactionsAll">
                    <div
                      className="transaction-div"
                      key={element._id}
                      style={{ backgroundColor: " var(--gray-0)" }}
                    >
                      <p className="transaction-item">
                        {euro.format(element.tran_amount)}
                      </p>
                      <p className="transaction-item">{capitalizedDesc}</p>
                      <p className="transaction-item">{newLocalDate}</p>

                      <Trash
                        onClick={() => handleDeleteTransaction(element._id)}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* <Backdrop open={open} /> */}
        <div className="speedDial-wrapper">
          <SpeedDial
            className="speedDial"
            ariaLabel="SpeedDial tooltip example"
            icon={<AddIcon sx={{ color: "#FFFF", fontSize: "30px" }} />}
            onClose={handleClose}
            onOpen={handleOpen}
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
