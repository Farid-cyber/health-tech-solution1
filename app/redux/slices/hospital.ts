import { db } from "@/app/firebase/firebase.con";
import { Hospital } from "@/app/type";
// import { Hos, Hospitalpital } from "@/app/type";
// import { Hospital } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// const BASE_API_URL = "http://localhost:8000/hospitals";
const API_BASE_URL = "https://69342e574090fe3bf01f3100.mockapi.io";
// import { type Hospital } from "../types";

export type State = {
  hospitals: Hospital[];
  isLoading: boolean;
  error: null | string;
  isEditingId: null | Hospital;
  hospitalname: string;
  cityName: string;
};
const initialState: State = {
  hospitals: [],
  isLoading: true,
  error: null,
  isEditingId: null,
  hospitalname: "",
  cityName: "",
};

const useReducer2 = createSlice({
  name: "hospitals",
  initialState,
  reducers: {
    setEditingHos: (state, action) => {
      state.isEditingId = action.payload;
    },
    setProtitle: (state, action) => {
      state.hospitalname = action.payload;
    },
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHospitals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hospitals = action.payload;
      })
      .addCase(fetchHospitals.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addHospital.fulfilled, (state, action) => {
        state.hospitals.push(action.payload);
      })
      .addCase(deleteHospital.fulfilled, (state, action) => {
        state.hospitals = state.hospitals.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(updateHospital.fulfilled, (state, action) => {
        state.isEditingId = null;
        const index = state.hospitals.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.hospitals[index] = action.payload;
        }
      })
      .addCase(fetchHospitalsByTitle.fulfilled, (state, action) => {
        state.hospitals = action.payload;
      })
      .addCase(fetchHospitalsByCity.fulfilled, (state, action) => {
        state.hospitals = action.payload;
      });
  },
});

export const fetchHospitals = createAsyncThunk(
  "hospitals/fetchHospitals",
  async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals`);
      if (!response.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      const data = await response.json();
      return data as Hospital[];
    } catch (e) {
      console.error("Error fetching hospitals: ", e);
      throw e;
    }
  }
);

export const fetchHospitalsByTitle = createAsyncThunk(
  "products/fetchHospitalsByTitle",
  async (hospitalname: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals`);

      if (!response.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      const allProducts = await response.json();
      if (hospitalname === "") return allProducts;

      const filtered = allProducts.filter((p: Hospital) =>
        p.name.toUpperCase().includes(hospitalname.toUpperCase())
      );

      return filtered;
    } catch (e) {
      console.error("Error fetching products by title:", e);
      throw e;
    }
  }
);

export const fetchHospitalsByCity = createAsyncThunk(
  "products/fetchHospitalsByCity",
  async (cityName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals`);

      if (!response.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      const allProducts = await response.json();
      if (cityName === "") return allProducts;

      const filtered = allProducts.filter((p: Hospital) =>
        p.shahar.toUpperCase().includes(cityName.toUpperCase())
      );

      return filtered;
    } catch (e) {
      console.error("Error fetching products by title:", e);
      throw e;
    }
  }
);

export const addHospital = createAsyncThunk(
  "hospitals/addHospital",
  async (hospital: Hospital) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospital),
      });

      if (!response.ok) {
        throw new Error("Failed to add hospital");
      }

      const data = await response.json();
      return data as Hospital;
    } catch (e) {
      console.error("Error adding hospital: ", e);
      throw e;
    }
  }
);

export const deleteHospital = createAsyncThunk(
  "hospitals/deleteHospital",
  async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete hospital");
      }

      return id;
    } catch (e) {
      console.error("Error deleting hospital: ", e);
      throw e;
    }
  }
);

export const updateHospital = createAsyncThunk(
  "hospitals/updateHospital",
  async ({ id, userObj }: { id: string; userObj: Omit<Hospital, "id"> }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      if (!response.ok) {
        throw new Error("Failed to update hospital");
      }

      const data = await response.json();
      return data as Hospital;
    } catch (e) {
      console.error("Error updating hospital: ", e);
      throw e;
    }
  }
);

export default useReducer2.reducer;

export const { setEditingHos, setProtitle, setCityName } = useReducer2.actions;
