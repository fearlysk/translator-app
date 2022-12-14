export interface ITranslationsState {
   queryValue: string | undefined,
   translation: string,
   detectedLanguage: string
   recentTranslations: {from: string, text: string, to: string, translation: string}[],
   favoriteTranslations: {from: string, text: string, to: string, translation: string}[],
   languages: string[] | any;
   error: string | undefined,
   isFetching: boolean
}
