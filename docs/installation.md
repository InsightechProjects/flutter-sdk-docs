---
sidebar_position: 2
title: Installation
---

# Installation

## Requirements

- Flutter >= 3.10, Dart >= 3.0
- iOS and Android

Flutter **web** is not a target — the Insightech JavaScript SDK covers the
web. Desktop is untested.

## Add the dependency

```yaml
dependencies:
  insightech_flutter: ^1.0.0
```

```bash
flutter pub get
```

## What it pulls in

The only plugin dependency is `shared_preferences`, used for the visitor ID
and the offline event queue. Everything else is pure Dart, so there is
**nothing to register in Xcode or Gradle** and no platform channel to set up.

## Verified platforms

The SDK is verified on iOS simulators covering a small phone, a large phone
and a tablet, at both `@2x` and `@3x` densities:

| Device | Viewport | Density |
|---|---|---|
| iPhone 16e | 390×844 | @3x |
| iPhone 17 Pro | 402×874 | @3x |
| iPhone 17 Pro Max | 440×956 | @3x |
| iPad Pro 13-inch | 1032×1376 | @2x |

Each runs a full journey against a live profile plus an on-device widget-tree
capture.

## Next

[Quick start](/quick-start).
