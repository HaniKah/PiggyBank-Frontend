import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import ManualEntry from "./svg/IconManuallyEnter";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { DataContext } from "../context/DataContext"; //importing datacontext
import Button from "@mui/material/Button";
import BudgetCard from "./BudgetCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
    { icon: <ManualEntry />, name: "Add Budget", route: "/addbudget" },
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
    <Container
      sx={{
        paddingTop: "100px",
      }}
      style={{
        background: styling.backgroundColor,
        paddingBottom: styling.paddingBottom,
      }}
    >
      {dialogOpen ? (
        <DialogConfirm
          setDialogOpen={setDialogOpen}
          budgetDeleteName={budgetDeleteName}
          budgetDeleteId={budgetDeleteId}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : null}
      <Box
        sx={{
          height: 600,
          transform: "translateZ(0px)",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            <Box>
              <Card
                sx={{
                  minWidth: 275,
                  mt: 1,
                  borderRadius: "15px",
                  display: "column",
                }}
                className="budget_card"
                style={{
                  backgroundColor: styling.backgroundBoard,
                  border: styling.borders,
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: 0,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {(() => {
                      const Icon =
                        categoryIcons[
                          element.category_name
                            ? element.category_name
                            : "others"
                        ];

                      return <Icon style={{ marginRight: "0.5rem" }} />;
                    })()}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        width: "80%",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 16, fontWeight: "700" }}
                        style={{ color: styling.txtColor }}
                      >
                        {element.category_name.replace(/^[\w]/, (c) =>
                          c.toUpperCase()
                        )}
                      </Typography>
                      <Typography
                        style={{ color: styling.txtColor }}
                        sx={{ fontSize: 14, fontWeight: "300" }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {/* Budget {element.limit_amount}€/Month */}
                        {console.log(categoriesObj)}
                        {categoriesObj[element.category_name]
                          ? Number(element.limit_amount) -
                            categoriesObj[element.category_name].spent
                          : Number(element.limit_amount)}{" "}
                        € remaining
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        width: "20%",
                      }}
                    >
                      <Button
                        style={{ color: styling.txtColor }}
                        sx={{ p: 1 }}
                        onClick={() => {
                          setBudgetDeleteName(element.category_name);
                          setBudgetDeleteId(element._id);
                          setDialogOpen(true);
                        }}
                      >
                        <IconTrash
                          style={{
                            width: "20px",
                            height: "20px",
                            fill: styling.txtColor,
                          }}
                        />
                      </Button>
                    </Box>
                  </Box>
                  <div className="linear-progress-container2">
                    <h6
                      className="progress-left"
                      style={
                        (categoriesObj[element.category_name]?.spent * 100) /
                          categoriesObj[element.category_name]?.limit >
                        10
                          ? { fontSize: "14px", color: "white" }
                          : { fontSize: "14px", color: "black" }
                      }
                    >
                      {categoriesObj?.hasOwnProperty(element.category_name)
                        ? `${categoriesObj[element.category_name].spent} €`
                        : "0 €"}
                    </h6>
                    <span
                      className="progress-right"
                      style={
                        (categoriesObj[element.category_name]?.spent * 100) /
                          categoriesObj[element.category_name]?.limit >
                        90
                          ? { fontSize: "14px", color: "white" }
                          : { fontSize: "14px", color: "black" }
                      }
                    >
                      {element.limit_amount} €
                    </span>
                    <LinearProgress
                      variant="determinate"
                      // value={categoriesObj[element.category_name] ? 90 : 20}
                      value={spentBudgetBar}
                    />
                  </div>
                  <Accordion
                    expanded={expanded === element.category_name}
                    onChange={handleChange(element.category_name)}
                    sx={{ boxShadow: "none" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    ></AccordionSummary>
                    <AccordionDetails>
                      {tranData
                        .filter(
                          (item) =>
                            item.tran_sign === "DR" &&
                            item.category_name === element.category_name
                        )
                        .sort(
                          (a, b) =>
                            new Date(b.tran_date) - new Date(a.tran_date)
                        )
                        .slice(0, 10)
                        .map((element) => {
                          const origDate = element.tran_date;
                          const newDate = new Date(origDate);
                          const newLocalDate = newDate
                            .toLocaleDateString("en-GB")
                            .replace(/[/]/g, ".");

                          const capitalizedDesc =
                            element.tran_description.replace(/./, (c) =>
                              c.toUpperCase()
                            );
                          return (
                            <Box
                              component="div"
                              className="transaction-div"
                              key={element._id}
                              sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="p"
                                component="p"
                                className="transaction-item"
                                sx={{ fontWeight: "bold" }}
                              >
                                {USDollar.format(element.tran_amount)}
                              </Typography>
                              <Typography
                                variant="p"
                                component="p"
                                className="transaction-item"
                              >
                                {capitalizedDesc}
                              </Typography>
                              <Typography
                                variant="p"
                                component="p"
                                className="transaction-item"
                              >
                                {newLocalDate}
                              </Typography>
                            </Box>
                          );
                        })}
                    </AccordionDetails>
                  </Accordion>
                  {/* <CardActions disableSpacing sx={{ p: 0 }}>
          <ExpandMore
            expand={
              expandedCat === element.category_name ? true : false
            }
            onClick={() => setExpandedCat(element.category_name)}
            aria-expanded={
              expandedCat === element.category_name ? true : false
            }
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse
          in={expandedCat === element.category_name ? true : false}
          timeout="auto"
          unmountOnExit
        >
          <CardContent sx={{ p: 0 }}>
            {tranData
              .filter(
                (item) =>
                  item.tran_sign === "DR" &&
                  item.category_name === element.category_name
              )
              .sort(
                (a, b) => new Date(b.tran_date) - new Date(a.tran_date)
              )
              .slice(0, 10)
              .map((element) => {
                const origDate = element.tran_date;
                const newDate = new Date(origDate);
                const newLocalDate = newDate
                  .toLocaleDateString("en-GB")
                  .replace(/[/]/g, ".");

                const capitalizedDesc =
                  element.tran_description.replace(/./, (c) =>
                    c.toUpperCase()
                  );
                return (
                  <Box
                    component="div"
                    className="transaction-div"
                    key={element._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="p"
                      component="p"
                      className="transaction-item"
                      sx={{ fontWeight: "bold" }}
                    >
                      {USDollar.format(element.tran_amount)}
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      className="transaction-item"
                    >
                      {capitalizedDesc}
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      className="transaction-item"
                    >
                      {newLocalDate}
                    </Typography>
                  </Box>
                );
              })}
          </CardContent>
        </Collapse> */}
                </CardContent>
              </Card>
            </Box>
          );
        })}
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          style={{
            zIndex: 5,
            transform: "translateX(+40%)",
          }}
          sx={{
            position: "sticky",
            bottom: 70,
            "& .MuiFab-root": {
              width: "64px", // Increase the width
              height: "64px", // Increase the height
            },
          }}
          // icon={<SpeedDialIcon sx={{ color: "#FFFF"}} />}
          icon={<AddIcon sx={{ color: "#FFFF", fontSize: "30px" }} />}
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
      </Box>
    </Container>
  );
}
