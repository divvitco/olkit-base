import { useContext } from "react"
import PopupContext, { PopupClickDetails } from "../components/Popup/PopupContext"

/**
 * Get the map event details that are used to drive the popup when called inside the Popup
 * @function
 * @since 0.0.0
 * @returns {PopupClickDetails} An object with the map event details
 */
export const usePopupContext = (): PopupClickDetails | null => useContext(PopupContext)