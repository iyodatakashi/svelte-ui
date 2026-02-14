# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.14] - 2026-02-13

### Added

- **Global configuration API**: Added `setSvelteUiConfig()` function to configure library-wide settings (locale, browser locale fallback).
- **i18n locales**: Added support for French (`fr`), German (`de`), Spanish (`es`), and Chinese Simplified (`zh-cn`).
- **Button alignment**: Added `align` prop (`'left' | 'center' | 'right'`) to control button content alignment, especially useful with `fullWidth`.
- **Fab positioning**: Added `bottomOffset`, `sideOffset`, and `useSafeArea` props for flexible positioning and safe area support on mobile devices.

### Changed

- **Input/Textarea value types**: `value` prop now accepts `null | undefined` in addition to `string | number` (reverting 0.0.6 breaking change).
- **Skeleton components API**: Simplified API by flattening nested config objects into direct props for easier usage.
- **Popup mobile fullscreen**: Improved mobile fullscreen behavior with bottom sheet design. Removed `mobileBehavior` prop in favor of boolean `mobileFullscreen` prop.
- **Fab shadow prop**: Unified prop name from `hasShadow` to `shadow` for consistency.

### Fixed

- **Datepicker range input**: Improved text input parsing for range mode, correctly handling date formats and automatically normalizing reversed ranges (`start` > `end`).
- **PopupMenu keyboard navigation**: Fixed keyboard navigation not working after opening the menu.
- **Combobox keyboard focus**: Added visual outline on keyboard navigation for better accessibility.

## [0.0.13] - 2026-02-12

### Changed

- **Datepicker props**: Renamed and clarified behavior of `enableTextInput` (controls whether the input is editable) and `enableClickToOpen` (controls whether clicking the field opens the calendar).
- **Popup props**: Renamed `allowRepositioning` to `enableAutoReposition`.

### Fixed

- **Datepicker keyboard interactions**: Refined key handling so that text editing and calendar navigation behave as intended (caret movement vs. date selection).
- **Tab routing**: Fixed cases where the active tab was not correctly updated in response to URL changes.
- **SSR safety**: Added guards around access to browser-only globals such as `window` and `document` to prevent errors in SSR environments.
- **Popup scroll/resize behavior**: Improved the logic that closes popups on scroll and resize events.

## [0.0.12] - 2026-02-11

### Changed

- **Event handlers**: Tightened event handler props across form and interactive components to use explicit DOM event types (focus / keyboard / mouse / touch / pointer) for better type safety and completion.
- **Value callbacks**: Simplified the typing of value-based callbacks such as `onchange` / `oninput` so that handlers with or without parameters, and with narrower value types, are easier to write.
- **Option value**: Aligned the `value` types used by option-based components (`Radio`, `RadioGroup`, `CheckboxGroup`, `Select`, etc.) so they consistently accept the same set of option value variants.
- **Textarea minHeight**: Updated `Textarea` so `minHeight` accepts both `string` and `number` and behaves consistently for both inline and non-inline layouts.

### Fixed

- **Popup click-outside behavior**: Fixed an issue where using `PopupMenu` could interfere with normal SPA link navigation in the host application.
- **Datepicker / DatepickerCalendar callbacks**: Refined callback types such as `onOpen` / `onClose` to prevent unexpected runtime errors when handlers omit parameters.

## [0.0.11] - 2026-02-10

### Fixed

- Fixed package distribution to include `constants` directory for proper module resolution.

## [0.0.10] - 2026-02-10

### Changed

- Changed `ConfirmDialog` component API: `confirmLabel` → `submitLabel`, `onConfirm` → `onSubmit` for better clarity and consistency.
- Improved type safety for `onchange` and `oninput` callbacks across all form components (replaced `any` types with specific value types).
- Moved `Textarea` component's `minHeight` default value to CSS variables for better customization.

## [0.0.9] - 2026-02-08

### Added

- Added `linkify` prop to `Input` and `Textarea` components to convert URLs in the input value into clickable links.

### Fixed

- Fixed `DatepickerCalendar` component to correctly handle reversed range values where `start` is after `end`.

## [0.0.8] - 2026-01-22

### Changed

- Adjusted `Dialog` component behavior when `scrollable=false` so large content scrolls correctly within the window.
- Fixed layout issues in the `Dialog` component.

### Fixed

- Fixed an issue where `Combobox` options could remain visually selected after clearing the input value.
- Fixed an issue where `SegmentedControl` labels could cause text selection when clicked.

## [0.0.7] - 2026-01-16

### Added

- Added `SegmentedControl` component

### Changed

- Changed `Input` component: removed form tag wrapper, moved Enter key handling to `onkeydown` event

### Fixed

- Fixed `Button` component: prevented button height from expanding when icon is present

## [0.0.6] - 2026-01-12

### Added

- Added `spellcheck` prop to `Input` component

### Changed

- **Breaking**: Removed `undefined` from `Input` component's `value` prop type (now `string | number` only)
- **Breaking**: Removed `undefined` from `Textarea` component's `value` prop type (now `string` only)
- Unified `ImageUploader` and `FileUploader` `value` type to `FileList | null | undefined` (matches `onchange` callback type)
- Changed `ColorPicker` `value` prop to required (`value?: string` → `value: string`)
- Changed `Slider` `value` prop to required (`value?: number` → `value: number`)
- Changed `Switch` `value` prop to required (`value?: boolean` → `value: boolean`)

### Fixed

- Fixed `Input` and `Textarea` `clear()` method to set empty string instead of `undefined`
- Fixed `ImageUploader` and `FileUploader` `reset()` method to set `null` instead of `undefined`

### Technical Notes

- Input components (Input/Textarea) now only accept empty string for cleared state
- Selection components (Select/Combobox) accept `null | undefined` to represent unselected state
- File upload components (ImageUploader/FileUploader) also accept `null | undefined` for consistency with selection components

## [0.0.5] - Previous Release

(Previous changelog entries can be added here)
