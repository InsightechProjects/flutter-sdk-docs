---
sidebar_position: 1
slug: /
title: Introduction
---

# Insightech Flutter SDK

Session replay, heatmaps, click maps, scroll depth and form analytics for
Flutter apps, on the Insightech dashboard.

The SDK sends data in exactly the same format as the Insightech web
JavaScript and React Native SDKs, so **no backend changes are needed** — your
Flutter sessions land in the same reports as your web traffic.

## What you get

| Capability | What it shows you |
|---|---|
| **Session replay** | Watch a real user's journey through your app |
| **Click maps** | Where people tap on each screen |
| **Scroll depth** | How far down a screen people actually get |
| **Form analytics** | Which fields people focus, edit and abandon |
| **Custom events** | Your own business events, for funnels and conversions |
| **Error tracking** | Dart and Flutter errors, plus errors you report yourself |

## Integration is two lines

Unlike the React Native SDK, which needs a Babel plugin to rewrite imports at
build time, this SDK needs **no codegen, no build configuration and no
component swapping**. Flutter routes taps, scrolls, text input, navigation,
lifecycle and errors through global bindings, so wrapping your app is enough:

```dart
runApp(
  const Insightech(
    config: InsightechConfig(
      account: 'YOUR_PROFILE_ID:YOUR_SERVER_ID',
      appName: 'MyApp',
    ),
    child: MyApp(),
  ),
);
```

Plus one navigator observer for screen tracking. Your widgets stay exactly as
they are — including third-party widgets the SDK has never heard of.

## Privacy by default

Every text field value is masked on the device before transmission, and email
addresses are masked in **all** text content, not just inputs. Raw values
never leave the device. Masking rules can also be changed from the server, so
you can tighten them without shipping an app update.

## Next steps

- [Installation](/installation)
- [Quick start](/quick-start)
- [What gets tracked automatically](/automatic-tracking)
