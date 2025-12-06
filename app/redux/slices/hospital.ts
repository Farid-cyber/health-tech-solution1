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

// import { type Hospital } from "../types";

export type State = {
  hospitals: Hospital[];
  isLoading: boolean;
  error: null | string;
  isEditingId: null | Hospital;
};
const initialState: State = {
  hospitals: [],
  isLoading: true,
  error: null,
  isEditingId: null,
};

const useReducer2 = createSlice({
  name: "hospitals",
  initialState,
  reducers: {
    setEditingHos: (state, action) => {
      state.isEditingId = action.payload;
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
      });
  },
});

export const fetchHospitals = createAsyncThunk(
  "hospitals/fetchHospitals",
  async () => {
    const snapshot = await getDocs(collection(db, "hospitals"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Hospital[];
    return data;
  }
);

export const addHospital = createAsyncThunk(
  "hospitals/addHospital",
  async (catObject: Hospital) => {
    try {
      await addDoc(collection(db, "hospitals"), catObject);
      // Optionally re-fetch hospitals or return newly added one
      return catObject;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export const deleteHospital = createAsyncThunk(
  "hospitals/deleteHospital",
  async (id: string) => {
    try {
      await deleteDoc(doc(db, "hospitals", id));
      return id;
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  }
);

export const updateHospital = createAsyncThunk(
  "hospitals/updateHospital",
  async ({ id, userObj }: { id: string; userObj: Omit<Hospital, "id"> }) => {
    try {
      const docRef = doc(db, "hospitals", id);
      await updateDoc(docRef, userObj);
      return { id, ...userObj };
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
);

export default useReducer2.reducer;

export const { setEditingHos } = useReducer2.actions;
