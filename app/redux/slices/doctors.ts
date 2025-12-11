import { secondaryAuth } from "@/app/firebase.auth/firebaseauth.con";
import { db } from "@/app/firebase/firebase.con";
import { Doctor } from "@/app/type";
// import { Doctor } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  doctorName: string;
  jobName: string;
};
const initialState: State = {
  doctors: [],
  isLoading: true,
  error: null,
  isEditingId: null,
  doctorName: "",
  jobName: "",
};

const useReducer1 = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setEditingDoc: (state, action) => {
      state.isEditingId = action.payload;
    },
    setdoctorName: (state, action) => {
      state.doctorName = action.payload;
    },
    setjobName: (state, action) => {
      state.jobName = action.payload;
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
      .addCase(fetchDoctorsByName.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsByJobName.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload);
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter((c) => c.id !== action.payload);
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

export const fetchDoctorsByName = createAsyncThunk(
  "doctors/fetchDoctorsByName",
  async (doctorName: string) => {
    const snapshot = await getDocs(collection(db, "doctors"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Doctor[];
    if (doctorName === "") {
      return data;
    }

    const filtered = data.filter((c: Doctor) =>
      c.fullname.toUpperCase().includes(doctorName.toUpperCase())
    );
    return filtered;
  }
);

export const fetchDoctorsByJobName = createAsyncThunk(
  "doctors/fetchDoctorsByJobName",
  async (jobName: string) => {
    const snapshot = await getDocs(collection(db, "doctors"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Doctor[];
    if (jobName === "") {
      return data;
    }

    const filtered = data.filter((c: Doctor) =>
      c.job.toUpperCase().includes(jobName.toUpperCase())
    );
    return filtered;
  }
);

export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (catObject: Doctor) => {
    try {
      await createUserWithEmailAndPassword(
        secondaryAuth,
        catObject.email,
        catObject.password
      );
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

export const { setEditingDoc, setdoctorName, setjobName } = useReducer1.actions;
