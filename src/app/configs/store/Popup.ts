import { createContext, useContext } from "react";

export const PopupContext = createContext({
    popup: true,
    togglePopup: (popup?: boolean) => { },
    // ====
    imagePopup: true,
    toggleImagePopup: (imagePopup?: boolean) => { }
})

export const PopupProvider = PopupContext.Provider

export default function usePopup() {
    return useContext(PopupContext)
}