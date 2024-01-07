# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

- German Internationalization
- Chinese Mandarin Internationalization
- Japanese Internationalization
- Portugese Internationalization
- Russian Internationalization

## [2.1.1] - 2024-01-07

### Changed

- Changed all instances of deprecated `substr()` to `substring()`.
- Changed some `let`s to `const`s.

## [2.1.0] - 2024-01-07

### Added

- Now supports Italian dates and times.

## [2.0.2] - 2024-01-07

### Changed

- Fixing version number and updating CHANGELOG.md.

## [2.0.1] - 2024-01-07

### Changed

- Updated dependencies.

## [2.0.0] - 2023-08-18

### Changed

- Now supports `import`s instead of `require`s.
- Removed `settings.ignore` option. This new version will now automagically ignore any words that aren’t part of the date patterns.

## [1.3.0] - 2018-03-21

### Fixed

- Added `settings.ignore` option to ignore certain words from being parsed.

## [1.2.0] - 2018-03-21

### Added

- Now supports French dates and times.

## [1.1.0] - 2018-03-20

### Added

- Now supports Spanish dates and times.

## [1.0.0] - 2018-03-12

### Added

- Initial commit.