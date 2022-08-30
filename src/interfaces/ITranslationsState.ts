export interface ITranslationsState {
   queryValue: string | undefined,
   translation: string,
   detectedLanguage: string,
   resentTranslations: string[],
   favoriteTranslations: {from: string, text: string, to: string, translation: string}[],
   error: string | undefined,
   isFetching: boolean
}
