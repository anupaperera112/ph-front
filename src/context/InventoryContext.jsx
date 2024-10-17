// src/context/InventoryContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InventoryContext = createContext();

const inventoryReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "ADD_MEDICINE":
      newState = {
        ...state,
        medicines: [...state.medicines, action.payload],
      };
      break;
    case "UPDATE_MEDICINE":
      newState = {
        ...state,
        medicines: state.medicines.map((med) =>
          med.name === action.payload.name ? action.payload : med
        ),
      };
      break;
    case "DELETE_MEDICINE":
      newState = {
        ...state,
        medicines: state.medicines.filter((med) => med.name !== action.payload),
      };
      break;
    case "SET_MEDICINES":
        newState = {
          ...state,
          medicines: action.payload,
        };
        break;
    default:
      return state;
  }
  // Save to localStorage after each change
  localStorage.setItem("inventoryState", JSON.stringify(newState));
  return newState;
};

const initialState = {
  medicines: [],
};

export const InventoryProvider = ({ children }) => {
  const { id } = useParams();
  const pharmacy_id = parseInt(id, 10);
  const [state, dispatch] = useReducer( inventoryReducer, initialState );
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/userApp/setMedincine/${pharmacy_id }`);
        dispatch({ type: 'SET_MEDICINES', payload: response.data });
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);
  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);

// JSON.parse(localStorage.getItem("inventoryState")) || initialState
