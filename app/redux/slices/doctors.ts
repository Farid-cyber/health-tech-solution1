import { db } from "@/app/firebase/firebase.con";
import { Doctor } from "@/app/type";
// import { Doctor } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// const BASE_API_URL = "http://localhost:8000/doctors";

// import { type Doctor } from "../types";

export type State = {
  doctors: Doctor[];
  isLoading: boolean;
  error: null | string;
  isEditingId: null | Doctor;
};
const initialState: State = {
  doctors: [],
  isLoading: true,
  error: null,
  isEditingId: null,
};

const useReducer1 = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setEditingDoc: (state, action) => {
      state.isEditingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload);
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.isEditingId = null;
        const index = state.doctors.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      });
  },
});

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    const snapshot = await getDocs(collection(db, "doctors"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Doctor[];
    return data;
  }
);

export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (catObject: Doctor) => {
    try {
      await addDoc(collection(db, "doctors"), catObject);
      // Optionally re-fetch doctors or return newly added one
      return catObject;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (id: string) => {
    try {
      await deleteDoc(doc(db, "doctors", id));
      return id;
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  }
);

export const updateDoctor = createAsyncThunk(
  "doctors/updateDoctor",
  async ({ id, userObj }: { id: string; userObj: Omit<Doctor, "id"> }) => {
    try {
      const docRef = doc(db, "doctors", id);
      await updateDoc(docRef, userObj);
      return { id, ...userObj };
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
);

export default useReducer1.reducer;

export const { setEditingDoc } = useReducer1.actions;
