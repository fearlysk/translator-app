import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store';
import { IFetchQueries } from "../../../interfaces/IFetchQueries";

interface TranslationsState {
  translation: string,
  resentTranslations: Array<string>,
  error: string | undefined,
  isFetching: boolean
}

const initialState: TranslationsState = {
  translation: 'some translation will be here',
  resentTranslations: [],
  error: '',
  isFetching: false
}

export const fetchData = (createAsyncThunk("data/fetchData", async (queries: IFetchQueries) => {
    const options = {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'bad6df4514msh6bdff502a90d767p194158jsna78e55ddb90b',
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      body: `[{"Text":"${queries.text}"}]`
   };
     
    const data = await fetch(`https://microsoft-translator-text.p.rapidapi.com/translate?to=${queries.lang}&api-version=3.0&profanityAction=NoAction&textType=plain`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    console.log(data);
    console.log(queries.text);
    return data;
}))


export const translationsSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isFetching = true;
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = '';
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = action.error.message;
    })
  },
})

export const {} = translationsSlice.actions;
export const selectCount = (state: RootState) => state.translations.translation;

export default translationsSlice.reducer;
