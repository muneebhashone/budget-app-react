import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import uuidv4 from "../lib/uuidGenerator";

const AppContext = createContext(null);

const initialState = { incomes: [], expenses: [] };

const init = () => {
  return JSON.parse(localStorage.getItem("budget")) || initialState;
};

function reducer(state, action) {
  switch (action.type) {
    case "addIncome":
      return {
        ...state,
        incomes: [...state.incomes, { ...action.payload, id: uuidv4() }],
      };
    case "addExpense":
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload, id: uuidv4() }],
      };
    case "deleteIncome":
      return {
        ...state,
        incomes: state.incomes.filter((item) => item.id !== action.payload),
      };
    case "deleteExpense":
      return {
        ...state,
        expenses: state.expenses.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const getTotalIncome = useMemo(() => {
    return state.incomes.reduce(
      (accumulator, currentItem) => (accumulator += Number(currentItem.value)),
      0
    );
  }, [state.incomes]);

  const getTotalExpense = useMemo(() => {
    return state.expenses.reduce(
      (accumulator, currentItem) => (accumulator += Number(currentItem.value)),
      0
    );
  }, [state.expenses]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider
      value={{ state, dispatch, getTotalIncome, getTotalExpense }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
