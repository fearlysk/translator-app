export interface ITextFieldProps {
    queryText: string,
    setQueryText(value: string): void,
    disabled: boolean,
    placeholder: string,
    darkMode: boolean,
    inputField: boolean,
    setCopiedPopUp(value: boolean): void,
    setAddedToFavPopUp(value: boolean): void,
    selectedLanguage: string
}
