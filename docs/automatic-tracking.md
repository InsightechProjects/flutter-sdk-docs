---
sidebar_position: 4
title: Automatic tracking
---

# What gets tracked automatically

Once your app is wrapped, all of this is captured with no further code.

| What | How | Needs |
|---|---|---|
| Screen views | `NavigatorObserver` | the observer |
| Taps | Flutter's global pointer router | nothing |
| Scrolling | root `ScrollNotification` listener | nothing |
| Text input, focus, blur | `FocusManager` + the field's controller | nothing |
| Widget-tree snapshots | Element-tree walk | nothing |
| Tree mutations | snapshot diff after interactions | nothing |
| App background / foreground | `AppLifecycleListener` | nothing |
| Viewport / rotation changes | `didChangeMetrics` | nothing |
| Rage taps | repeated taps on one element | server config |
| Dart and Flutter errors | `FlutterError.onError` + `PlatformDispatcher.onError` | nothing |
| API errors | `HttpOverrides` | server config |

## No build-time instrumentation

The React Native SDK rewrites `react-native` imports with a Babel plugin,
because `onPress`, `onScroll` and `onChangeText` are props on individual
components with no global hook. That means build configuration, clearing the
Metro cache, and a class of bug where a component rendered outside the
provider silently stops tracking.

Flutter exposes a global hook for every one of those signals, so this SDK
instruments nothing at build time. A consequence worth knowing: **third-party
widgets are captured too**, without the SDK knowing anything about them.

## Event types

| Type | Name | Trigger |
|---|---|---|
| 1 | Pageview | first screen |
| 2 | DOM tree | widget-tree snapshot |
| 3 | App ready | SDK initialised |
| 4 | App unload | app backgrounded |
| 7 | Click | tap |
| 8 | Input | keystroke (masked) |
| 9 | Input change | field committed (masked) |
| 12 | Scroll | scroll position sample |
| 13 | Tab hidden | app backgrounded |
| 14 | Tab visible | app foregrounded |
| 15 | Resize | rotation / metrics change |
| 16 | DOM mutation | tree diff |
| 17 | Field focus | field focused |
| 18 | Field blur | field blurred |
| 19 | URL change | screen navigation |
| 20 | Form submit | `trackFormSubmit()` |
| 97 | API error | monitored endpoint failed |
| 98 | Rage tap | rapid repeated taps |
| 99 | Custom / error | `trackCustomEvent()` / `trackError()` |

These IDs are shared with the JavaScript and React Native SDKs, which is why
Flutter sessions appear in the same reports as web sessions.

## Screen URLs

Screens are represented as URLs so the backend and dashboard handle them with
no changes:

```
https://app.insightech.com/flutter/{appName}/{route}?param=value
```

Route arguments become query parameters, so
`Navigator.pushNamed(context, '/product', arguments: {'productId': 'SKU-002'})`
becomes `…/flutter/MyApp/product?productId=SKU-002`.

## Offline resilience

Events are persisted when the app goes to the background and restored on the
next launch, so a process kill does not lose them. Failed batches retry with
exponential backoff and jitter.
