---
sidebar_position: 14
title: API reference
---

# API reference

## `Insightech`

The root widget. Wrap your app in it.

```dart
const Insightech({
  required InsightechConfig config,
  required Widget child,
  InsightechStorage? storage,   // override the key/value store (tests)
  HttpSender? sender,           // override the network layer (tests)
})
```

### `Insightech.instance`

The SDK instance. Also available as `Insightech.of(context)`, which is
identical but reads more naturally at a call site.

## `InsightechSdk`

| Method | Purpose |
|---|---|
| `trackScreen(String name, [Map<String, Object?>? params])` | Record a screen view manually |
| `trackCustomEvent(Map<String, Object?> data)` | Record a business event (type 99) |
| `trackError({required String message, String type, Map<String, Object?>? context})` | Record an error the user saw |
| `trackFormSubmit(FormInfo info)` | Record a form submission (type 20) |
| `flush()` | Force-send everything queued; returns a `Future` |
| `destroy()` | Detach every capture hook and stop the SDK |

### Diagnostics

| Getter | Returns |
|---|---|
| `isInitialized` | Whether `init` has completed |
| `visitorId` | The current visitor ID |
| `pageviewId` | The current pageview ID |
| `trackingLevel` | `'full'` or `'lite'` |
| `currentScreen` | The most recently tracked screen name |

## `InsightechNavigatorObserver`

```dart
InsightechNavigatorObserver({
  String Function(Route<dynamic> route)? nameExtractor,
})
```

Add to `navigatorObservers` (or `go_router`'s `observers`). Pass
`nameExtractor` to override how a route becomes a screen name; by default the
route's settings name is used.

Popup routes — dialogs, bottom sheets, snackbars — are deliberately not
reported as screens, since they are overlays rather than destinations.

## Privacy widgets

| Widget | Effect |
|---|---|
| `InsightechTag({required String id, required Widget child})` | Gives the subtree's first captured node a stable identifier |
| `InsightechMask({required Widget child})` | Masks every string in the subtree |
| `InsightechIgnore({required Widget child})` | Excludes the subtree from capture entirely |

## `InsightechConfig`

See [Configuration](/configuration) for every field and its default.

## Form types

```dart
FormInfo({
  required int nodeIndex,
  required String cssPath,
  required String name,
  String method = 'POST',
  List<InsightechFormField> fields = const [],
})

InsightechFormField({
  required int nodeIndex,
  required String cssPath,
  required String name,
  required String value,
})
```

## Masking helpers

Exported for cases where you want to apply the SDK's rules yourself:

```dart
String maskEmailAddress(String text);   // masks emails in any text
String maskFieldValue(String value);    // digits → 0, everything else → *
String maskContentBlock(String text);   // every non-whitespace → *
```
