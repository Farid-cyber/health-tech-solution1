import { db } from "@/app/firebase/firebase.con";
import { OxirgiXabar } from "@/app/type";
// import { Ox, OxirgXabarirgXabar } from "@/app/type";
// import { Hos, Hospitalpital } from "@/app/type";
// import { OxirgXabar } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// const BASE_API_URL = "http://localhost:8000/oxirgixabarlar";

// import { type OxirgXabar } from "../types";

export type State = {
  oxirgixabarlar: OxirgiXabar[];
  isLoading: boolean;
  error: null | string;
  isEditingId: null | OxirgiXabar;
};
const initialState: State = {
  oxirgixabarlar: [],
  isLoading: true,
  error: null,
  isEditingId: null,
};

const useReducer4 = createSlice({
  name: "oxirgixabarlar",
  initialState,
  reducers: {
    setEditingXab: (state, action) => {
      state.isEditingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOxirgiXabarlar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOxirgiXabarlar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.oxirgixabarlar = action.payload;
      })
      .addCase(fetchOxirgiXabarlar.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed";
      })
      .addCase(addNewXabar.fulfilled, (state, action) => {
        state.oxirgixabarlar.push(action.payload);
      })
      .addCase(deleteNewXabar.fulfilled, (state, action) => {
        state.oxirgixabarlar = state.oxirgixabarlar.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(updateNewXabar.fulfilled, (state, action) => {
        state.isEditingId = null;
        const index = state.oxirgixabarlar.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.oxirgixabarlar[index] = action.payload;
        }
      });
  },
});

export const fetchOxirgiXabarlar = createAsyncThunk(
  "oxirgixabarlar/fetchOxirgiXabarlar",
  async () => {
    const snapshot = await getDocs(collection(db, "latest-news"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as OxirgiXabar[];
    return data;
  }
);

export const addNewXabar = createAsyncThunk(
  "oxirgixabarlar/addNewXabar",
  async (catObject: OxirgiXabar) => {
    try {
      await addDoc(collection(db, "latest-news"), catObject);
      // Optionally re-fetch oxirgixabarlar or return newly added one
      return catObject;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export const deleteNewXabar = createAsyncThunk(
  "oxirgixabarlar/deleteNewXabar",
  async (id: string) => {
    try {
      await deleteDoc(doc(db, "latest-news", id));
      return id;
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  }
);

export const updateNewXabar = createAsyncThunk(
  "oxirgixabarlar/updateNewXabar",
  async ({ id, userObj }: { id: string; userObj: Omit<OxirgiXabar, "id"> }) => {
    try {
      const docRef = doc(db, "latest-news", id);
      await updateDoc(docRef, userObj);
      return { id, ...userObj };
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
);

export default useReducer4.reducer;

export const { setEditingXab } = useReducer4.actions;
