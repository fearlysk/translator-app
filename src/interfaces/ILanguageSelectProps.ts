export interface ILanguageSelectProps {
    selectedLanguage: string,
    setSelectedLanguage(value: string): void,
    darkMode: boolean,
    detectLangOption: boolean
}
