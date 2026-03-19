import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// ✅ FIXED API URL
const API_URL = "https://expense-traker-react-pk.onrender.com/api/v1/transactions";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get('https://expense-traker-react-pk.onrender.com/api/v1/transactions');

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload:
          err.response && err.response.data.error
            ? err.response.data.error
            : "Server Error",
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.post('https://expense-traker-react-pk.onrender.com/api/v1/transactions', data);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload:
          err.response && err.response.data.error
            ? err.response.data.error
            : "Server Error",
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/transactions`,
        transaction,
        config
      );

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });

    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload:
          err.response && err.response.data.error
            ? err.response.data.error
            : "Connection Failed",
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};