import { useState, useEffect, createContext, useContext } from "react";
import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [tranData, setTranData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [timePeriod, setTimePeriod] = useState("");

  const [categoriesObj, setCategoriesObj] = useState({});

  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  /*   console.log("token", token);
  console.log("decodedToken:", decodedToken);
  console.log("_id:", decodedToken?._id);
  console.log("refresh data?", refresh); */

  // =============================
  // Fetching Data
  // ============================

  useEffect(() => {
    // getting all transactions for one user within specific period
    const getData = async function () {
      try {
        const res = await fetch(
          `http://${process.env.REACT_APP_URL}/transaction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        Array.isArray(data) ? setTranData(data) : console.log(data);
        // setLoading(false)
      } catch (error) {
        /* console.log(error); */
        // setLoading(false);
      }
    };

    if (token) {
      getData();
    }
  }, [token, refresh]);

  useEffect(() => {
    // getting all budgets for one user
    const getBudget = async () => {
      try {
        const res = await fetch(
          // `http://localhost:8080/users/${decodedToken._id}`
          `http://${process.env.REACT_APP_URL}/budget`,
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
        // setBudgetData(data);
        // setLoading(false)
      } catch (error) {
        /*         console.log(error);
         */
        // setLoading(false);
      }
    };
    if (decodedToken) getBudget();
  }, [decodedToken, refresh]);

  // ==================================
  // Refactoring Data into categories
  // ==================================
  useEffect(() => {
    if (tranData.length > 0) {
      const refactorData = function () {
        const debitTrans = tranData.filter((trans) => trans.tran_sign === "DR");
        /*         console.log("refactoring data / trandebit", debitTrans);
         */ const groupedObjects = debitTrans.reduce((result, obj) => {
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
    }
  }, [tranData, budgetData]);

  /*   console.log("transaction data:", tranData);
  console.log("Budget data:", budgetData); */
  //   console.log("decoded token id:", decodedToken);

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
        decodedToken,
        refresh,
        setRefresh,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
