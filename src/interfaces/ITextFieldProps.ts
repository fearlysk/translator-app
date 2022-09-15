export interface ITextFieldProps {
    queryText: string,
    setQueryText(value: string): void,
    disabled: boolean,
    placeholder: string,
    darkMode: boolean,
    inputField: boolean,
    addedToFavsModalVisible: boolean,
    addTranslationToFavorites?(): void,
    removeTranslationFromFavorites?(): void,
    isTranslationInFavs: boolean,
    tooltipMessage: string
}
