# Client theme inspect tools
> Package contains helpers for theme associated events handling in web based apps

## Docs
#### Create event dispatcher object that listens for client theme changes
```ts
function CreateThemeChangesDispatcher(onChangeCallback: (isDark: boolean) => void = () => undefined): ThemeChangesContoller
```

#### Inspect current theme
```ts
// Bool result representation
function inspectThemeBool(): boolean

// String result representation
function inspectThemeStr(): Theme
```

#### Types

**Theme representation value type**
(synt.sugar for string literal)

```ts
type Theme = "dark" | "light"
```

**Dispatcher interface**
 * @function `kill(): void` *kills dispatcher and stops (not pauses) listening for theme changes*
 * @function `onChange(callback: (isDark: boolean) => void): void` *setter for changing callback, executed on theme change, isDark - changed to (current) theme*
```ts
interface ThemeChangesContoller {
    readonly kill: () => void,
    readonly onChange: (callback: (isDark: boolean) => void) => void
}
```