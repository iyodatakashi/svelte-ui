/**
 * Popup Manager
 * Manages global state for Popup components to ensure only one popup is open at a time.
 */

type PopupCloseFunction = () => void;

class PopupManager {
	private openPopups = new Set<PopupCloseFunction>();

	/**
	 * Register a popup's close function
	 */
	register(closeFunction: PopupCloseFunction): void {
		this.openPopups.add(closeFunction);
	}

	/**
	 * Unregister a popup's close function
	 */
	unregister(closeFunction: PopupCloseFunction): void {
		this.openPopups.delete(closeFunction);
	}

	/**
	 * Close all other popups except the specified one
	 */
	closeOthers(except: PopupCloseFunction): void {
		const others = Array.from(this.openPopups).filter((closeHandler) => closeHandler !== except);
		others.forEach((closeHandler) => closeHandler());
	}

	/**
	 * Get the number of currently open popups
	 */
	getOpenCount(): number {
		return this.openPopups.size;
	}
}

// Global instance
export const popupManager = new PopupManager();
