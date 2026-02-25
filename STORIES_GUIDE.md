## Storybook Stories Guidelines

This document defines common rules for writing Storybook stories in this repository.  
The goal is that **every component has consistent, discoverable, and maintainable stories**.

---

### 1. Story lineup per component

For each component, aim for a small, focused set of stories that cover the **main mental model** of the component:

- **Default usage** (how to use it in the most common case)
- **Variants / sizes** (only when they meaningfully change behavior or layout)
- **States (disabled, loading, etc.)**
- **Layout / behavior patterns** (fullWidth, inline, popup, etc.)
- **Key real-world examples** (only when they reflect realistic usage)

The **number of stories is not fixed**; it depends on component complexity:

- Simple components (e.g. `LoadingSpinner`, `ColorPicker`): a few stories (often 1–4) are enough.
- Medium components (e.g. `Checkbox`, `Radio`, `Select`, `Switch`): typically 6–10 stories.
- Complex components (e.g. `Button`, `Combobox`, `Dialog`, `Drawer`, `Tab`): up to ~10–15 stories is acceptable.

Recommended categories:

- **Default / Basic**
  - One story (`Default` or `Basic`) that shows the recommended, typical usage.
  - Keep args simple and readable; this story is the “face” of the component.

- **Variants**
  - Stories that change one visual axis at a time:
    - Example: `Filled`, `Outlined`, `Ghost`, `Glass`
    - Example: `Small`, `Large`
  - Avoid mixing multiple axes in a single story (e.g. `FilledLargeRounded`).

- **States**
  - Stories for user-visible states:
    - Example: `Disabled`, `Loading`, `ReadOnly`, `Indeterminate`
  - These exist to clearly document “we support this state” and how it looks.
  - For motion/accessibility flags like `reducedMotion`, prefer exposing them as controls (`argTypes`) or documenting them in MDX, and avoid dedicated `ReducedMotion` stories for each component.

- **Layout / Behavior**
  - Stories for layout-related or interaction-related props:
    - Example: `FullWidth`, `WithIcon`, `Popup`, `AlignLeft`
    - Example (inputs): `Inline`, `WithWidthLimits`
  - Use clear English names that describe the variation.

- **Integration / Real-world examples (optional)**
  - Only when it adds real value (e.g. form integration, realistic data).
  - Keep the number small and focused; stories should not become a demo app.

We intentionally **do not use dedicated `Playground` stories**.  
Instead, we let `Default` (and other stories) act as playgrounds via controls.

---

### 2. Args & argTypes (controls)

- **Expose via `argTypes`**:
  - Props that users are expected to tweak or understand.
  - Example: `variant`, `size`, `disabled`, `fullWidth`, `placeholder`, etc.

- **Hide from controls**:
  - Snippet/children and complex render-only values.
  - Event handlers (they should use `action`, not be edited as plain functions).
  - Visual fine-tuning props that don't need dedicated stories (e.g. different focus styles) should usually be controlled via controls, not via separate stories.

Example patterns:

- **Children / snippets**
  - Use fixed snippets or static children in `render`, and set `control: false` for `children`.
- **Events**
  - Use `action: 'clicked'` etc., or custom `render` that logs to console if needed.
  - Avoid dedicated stories whose only purpose is “event demo” (e.g. `WithEvents` that just `console.log`); prefer docs snippets or MDX examples instead.
- **Story args**
  - In each story, set **only the props that are essential to demonstrate that story's main idea**.
  - Avoid “noise props” that change values unrelated to the story's focus (e.g. tweaking `gap` or `minWidth` when the story is primarily about `direction`).
  - It is acceptable to set supporting props when they are required to make the main difference visually obvious (for example, using `variant="filled"` in a `Rounded` button story so the rounded shape is clearly visible).
  - Avoid stories whose only difference is **not visually apparent** at a glance:
    - File formats / `accept` patterns (`.jpg` vs `.png` vs `.svg` etc.) – control via `argTypes`, not separate stories.
    - Internal value types (e.g. `string` / `number` / `boolean` for `Radio` / `RadioGroup` values).
    - Purely data-level differences that do not change layout, icon, label, or visible state (e.g. option lists like prefectures vs. countries vs. “Option 1/2/3”).

---

### 3. `radio` vs `select` for controls

Use this guideline when choosing between `radio` and `select` for enum-like props:

- **Use `radio` when**:
  - The number of options is small (2–4 values).
  - Options are short labels (1–2 words).
  - You want the current choice and alternatives to be visible at a glance.
  - Examples:
    - `variant`: `filled` / `outlined` / `ghost` / `glass`
    - `size`: `small` / `medium` / `large`
    - `align`: `left` / `center` / `right`
    - `iconVariant`: `outlined` / `rounded` / `sharp`

- **Use `select` when**:
  - The number of options is larger (5+), or may grow.
  - Labels are longer or more descriptive text.
  - You want to keep the controls panel compact.
  - Examples:
    - Icon weights: `100 | 200 | 300 | 400 | 500 | 600 | 700`
    - Very large option sets (e.g. country lists) – though often those are passed as props, not controlled directly.

If in doubt:

- Start with **`radio` for 2–4 short options**.
- Switch to **`select`** if the controls panel becomes too tall or cluttered.

---

### 4. Language & naming

- **Story names**:
  - Use **English, PascalCase** names that describe the variation:
    - `Default`, `Filled`, `Outlined`, `WithIcon`, `FullWidth`, `FormIntegration`, etc.
- **Descriptions (`description` fields and docs)**:
  - Prefer English for consistency across the project.
  - Keep them short and focused on what the prop or story demonstrates.

---

### 5. Implementation details

- Prefer **typed `Meta` and `StoryObj`** for Svelte/SvelteKit stories:
  - Example: `const meta: Meta<ButtonArgs> = { ... }`
- Keep `args` minimal and readable; avoid dumping every possible prop into every story.
- Use `render` only when:
  - You need fixed children/snippets.
  - You need to wire console logging or more complex behavior for docs.

---

### 6. Applying these rules

When adding or updating stories:

1. Decide which categories you need for that component (Default, Variants, States, Layout, Integration).
2. For each prop, decide whether it should:
   - Be exposed via `argTypes` (and if so, `radio` vs `select` vs others).
   - Be hidden from controls (`control: false`) and set only in `args` / `render`.
3. Keep the total number of stories per component **reasonable (roughly 8–15)**, focusing on clarity rather than exhaustive enumeration.

These guidelines should be applied consistently to `Button`, `Checkbox`, `Combobox`, and other components as we refactor their stories.

