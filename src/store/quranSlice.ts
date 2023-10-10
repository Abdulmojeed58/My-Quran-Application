import { IinitialState } from "@/interface/reduxInterface";
import { createSlice } from "@reduxjs/toolkit";


const initialState: IinitialState = {
    allChapterLists: [],
    loading: false
}

const quranSlice = createSlice({
    name: 'quran',
    initialState,
    reducers: {
        fetchQuranData(state, action) {
            state.allChapterLists = action.payload.chapters;      
        }
    }
})

export const quranActions = quranSlice.actions;

export default quranSlice.reducer;