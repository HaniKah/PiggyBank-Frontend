import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Container from "@mui/material/Container";
import "./styles/budget.css";
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

export default function BudgetCard({ element }) {
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
    <Container>
      <Card
        sx={{ minWidth: 275, mt: 1, borderRadius: "15px" }}
        className="budget_card"
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <CardHeader
              sx={{ p: 0 }}
              avatar={
                <Avatar
                  sx={{
                    width: "3.2rem",
                    height: "3.2rem",
                    backgroundColor: "transparent",
                    boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
                    // boxShadow: "5px 5px 5px #888888",
                  }}
                  aria-label="recipe"
                >
                  {(() => {
                    const Icon =
                      categoryIcons[
                        element.category_name ? element.category_name : "others"
                      ];

                    return <Icon />;
                  })()}
                </Avatar>
              }
              // title={element.category_name.replace(/^[\w]/, (c) =>
              //   c.toUpperCase()
              // )}
              // subheader={`Budget ${element.limit_amount}/Month`}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: "700" }}>
                {element.category_name.replace(/^[\w]/, (c) => c.toUpperCase())}
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: "300" }}
                color="text.secondary"
                gutterBottom
              >
                Budget {element.limit_amount}€/Month
              </Typography>
            </Box>
          </Box>
          <Box>Progress Bar</Box>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </Container>
  );
}
