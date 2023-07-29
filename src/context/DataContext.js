import { useState, useEffect, createContext, useContext } from "react";
import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [tranData, setTranData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [categoriesObj, setCategoriesObj] = useState({});
  const today = new Date();
  const [activeFilter, setActiveFilter] = useState(today.getMonth());
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  // =============================
  // Fetching Transaction Data
  // ============================
  useEffect(() => {
    // getting all transactions for one user within specific period
    const getData = async function () {
      try {
        const res = await fetch(
          `http://${process.env.REACT_APP_URL}/transaction?timeperiod=${activeFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        Array.isArray(data) ? setTranData(data) : console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getData();
    }
  }, [token, refresh, activeFilter]);

  // =============================
  // Fetching budgets Data
  // ============================

  useEffect(() => {
    const getBudget = async () => {
      try {
        const res = await fetch(
          // `http://localhost:8080/users/${decodedToken._id}`
          `http://${process.env.REACT_APP_URL}/budget?timeperiod=${activeFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        Array.isArray(data)
          ? setBudgetData(data)
          : console.log("budget Data", data);
      } catch (error) {
        console.log(error);
      }
    };
    if (decodedToken) getBudget();
  }, [token, refresh, activeFilter]);

  // ==================================
  // Refactoring Data into categories
  // ==================================
  useEffect(() => {
    if (tranData.length > 0) {
      const refactorData = function () {
        const debitTrans = tranData.filter((trans) => trans.tran_sign === "DR");
        const groupedObjects = debitTrans.reduce((result, obj) => {
          const { category_name, tran_amount } = obj;
          if (!result[category_name]) {
            result[category_name] = {
              name: category_name,
              spent: 0,
              limit: 0,
              transactions: 0,
            };
          }
          result[category_name].spent += Number(tran_amount);
          result[category_name].transactions += 1;
          return result;
        }, {});

        budgetData?.map((budget) => {
          if (groupedObjects[budget.category_name]) {
            groupedObjects[budget.category_name].limit = Number(
              budget.limit_amount
            );
          }
        });

        const filteredArray = Object.values(groupedObjects);

        setCategoriesObj(groupedObjects);
        setCategories(filteredArray.sort((a, b) => b.spent - a.spent));
      };

      if (token) {
        refactorData();
      }
    } else {
      setCategories([]);
      setCategoriesObj({});
    }
  }, [tranData, budgetData, activeFilter]);

  console.log(activeFilter, "active filter in Context");

  return (
    <DataContext.Provider
      value={{
        tranData,
        setTranData,
        budgetData,
        setBudgetData,
        categories,
        setCategories,
        categoriesObj,
        setCategoriesObj,
        decodedToken,
        refresh,
        setRefresh,
        setActiveFilter,
        activeFilter,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
