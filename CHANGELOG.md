# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
