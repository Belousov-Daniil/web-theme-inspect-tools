
/**
 * Syntactic sugar for a literal type - "dark" | "light"
 */
export type Theme = "dark" | "light"

/**
 * #### Returns current client theme
 * 
 * *Version with string return type*
 * @returns Theme: string = "dark" | "light"
*/
export function inspectThemeStr(): Theme {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};


/**
 * #### Returns current client theme
 * 
 * *Version with boolean return type*
 * @returns boolean
 * @true current theme is dark
 * @false current theme is light
 */
export function inspectThemeBool(): boolean {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false;
};


/**
 * Controller to dynamic event callback changing and killing dispatcher
 * `kill()` MUST be called to stop listener entirely
 */
export interface ThemeChangesContoller {
    readonly kill: () => void,
    readonly onChange: (callback: (isDark: boolean) => void) => void
};
/**
 * #### Create event dispatcher object that listens for client theme changes
 * Returned interface:
 * 
 * @function `kill(): void` *kills dispatcher and stops (not pauses) listening for theme changes*
 * @function `onChange(callback: (isDark: boolean) => void): void` *setter for changing callback, executed on theme change, isDark - changed to (current) theme*
 */
export function CreateThemeChangesDispatcher(onChangeCallback: (isDark: boolean) => void = () => undefined): ThemeChangesContoller {
    
    const target = window.matchMedia('(prefers-color-scheme: dark)');
    const executor = (event: MediaQueryListEvent) => onChangeCallback(event.matches);
    target.addEventListener("change", executor)

    return {
        kill(): void {
            target.removeEventListener("change", executor)
        },
        onChange(callback: (isDark: boolean) => void) {
            onChangeCallback = callback
        },
    };
};