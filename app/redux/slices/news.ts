import { db } from "@/app/firebase/firebase.con";
import { Xabar } from "@/app/type";
// import { Hos, Hospitalpital } from "@/app/type";
// import { Xabar } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// const BASE_API_URL = "http://localhost:8000/xabarlar";

// import { type Xabar } from "../types";

export type State = {
  xabarlar: Xabar[];
  isLoading: boolean;
  error: null | string;
  isEditingId: null | Xabar;
};
const initialState: State = {
  xabarlar: [],
  isLoading: true,
  error: null,
  isEditingId: null,
};

const useReducer3 = createSlice({
  name: "xabarlar",
  initialState,
  reducers: {
    setEditingXab: (state, action) => {
      state.isEditingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchXabarlar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchXabarlar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.xabarlar = action.payload;
      })
      .addCase(fetchXabarlar.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addNew.fulfilled, (state, action) => {
        state.xabarlar.push(action.payload);
      })
      .addCase(deleteNew.fulfilled, (state, action) => {
        state.xabarlar = state.xabarlar.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(updateNew.fulfilled, (state, action) => {
        state.isEditingId = null;
        const index = state.xabarlar.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.xabarlar[index] = action.payload;
        }
      });
  },
});

export const fetchXabarlar = createAsyncThunk(
  "xabarlar/fetchXabarlar",
  async () => {
    const snapshot = await getDocs(collection(db, "news"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Xabar[];
    return data;
  }
);

export const addNew = createAsyncThunk(
  "xabarlar/addNew",
  async (catObject: Xabar) => {
    try {
      await addDoc(collection(db, "news"), catObject);
      // Optionally re-fetch xabarlar or return newly added one
      return catObject;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export const deleteNew = createAsyncThunk(
  "xabarlar/deleteNew",
  async (id: string) => {
    try {
      await deleteDoc(doc(db, "news", id));
      return id;
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  }
);

export const updateNew = createAsyncThunk(
  "xabarlar/updateNew",
  async ({ id, userObj }: { id: string; userObj: Omit<Xabar, "id"> }) => {
    try {
      const docRef = doc(db, "news", id);
      await updateDoc(docRef, userObj);
      return { id, ...userObj };
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
);

export default useReducer3.reducer;

export const { setEditingXab } = useReducer3.actions;
