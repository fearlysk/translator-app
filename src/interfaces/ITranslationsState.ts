export interface ITranslationsState {
   queryValue: string | undefined,
   translation: string,
   detectedLanguage: string,
   resentTranslations: string[],
   error: string | undefined,
   isFetching: boolean
}
