## CE Input Plugin

Simple html plugin enhancing capability of contenteditable.

### Attributes

- `ce-input`: enable plugin for element, take array of string representing built-in or user-registered modifier functions
    - list of built-in modifiers
        - `numberFormatter` – formats numbers with commas, strips non-numeric chars.
        - `trimSpaces` – removes leading/trailing spaces.
        - `titleCase` – capitalizes first letter of each significant word.
        - `dateFormat` – auto-format date strings (`YYYY-MM-DD`).
        - `uppercase` – all text to uppercase.
        - `lowercase` – all text to lowercase.
        - `decimalLimiter(maxDecimals)` – limits the number of decimal places in numeric input to `maxDecimals`.
- `disable-ce-input`: explicitly disable plugin on element (optional, presence takes priority over ce-input)
- `ce-input-placeholder`: show placeholder when there is no text.

### Behaviour

- If ce-input is present and disable-ce-input is absent, plugin applies listed modifier functions on input events in order it is specified.
  - modifier are called with input string & input event
- Modifier functions can be built-in or registered by the user.
- Removing ce-input or adding disable-ce-input stops the plugin from applying modifiers.
- Automatically sets min-width equal to ce-input-placeholder length (only if min-width not exist or its less than width require to show placeholder)

### creating custom modifier

```typescript
import { ceInputPlugin } from "./ce-input-plugin";

const waveCase = (text: string, ev: InputEvent): string => {
  return text
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
};

ceInputPlugin.enablePlugin();
ceInputPlugin.registerModifier("waveCase", waveCase);
```