export interface ITranslationsState {
   queryValue: string | undefined,
   translation: string,
   detectedLanguage: string,
   resentTranslations: string[],
   favoriteTranslations: {text: string, translation: string}[],
   error: string | undefined,
   isFetching: boolean
}
