import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store';
import { IFetchQueries } from "../../../interfaces/IFetchQueries";
import { ITranslationsState } from '../../../interfaces/ITranslationsState';

const initialState: ITranslationsState = {
  queryValue: '',
  translation: '',
  detectedLanguage: '',
  resentTranslations: [],
  favoriteTranslations: [],
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

    return data;
}))


export const translationsSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {
   setQueryValue: (state, action) => {
      state.queryValue = action.payload;
    },
   clearTranslation: (state) => {
      state.translation = "";
      state.detectedLanguage = "";
   }, 
   addToFavorites: (state, action) => {
      state.favoriteTranslations.push(action.payload);
   }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isFetching = true;
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = '';
      state.translation = action.payload[0].translations[0].text;
      state.detectedLanguage = action.payload[0].detectedLanguage.language;
      switch (state.detectedLanguage) {
        case "en":
          state.detectedLanguage = "English";
          break;
        case "ru":
          state.detectedLanguage = "Russian";
          break;  
        case "it":
          state.detectedLanguage = "Italian";
          break;  
        case "de":
          state.detectedLanguage = "Deutsch";
          break;  
        case "es":
          state.detectedLanguage = "Espanol";
          break;
        default:
          state.detectedLanguage = "Unknown";
      }
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = action.error.message;
    })
  },
})

export const { setQueryValue, clearTranslation, addToFavorites } = translationsSlice.actions;
export const selectCount = (state: RootState) => state.translations.translation;

export default translationsSlice.reducer;
