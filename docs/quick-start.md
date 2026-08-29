---
sidebar_position: 3
title: Quick start
---

# Quick start

Two steps: wrap your app, and add one navigator observer.

```dart
import 'package:flutter/material.dart';
import 'package:insightech_flutter/insightech_flutter.dart';

void main() {
  runApp(
    const Insightech(
      config: InsightechConfig(
        account: 'YOUR_PROFILE_ID:YOUR_SERVER_ID',
        appName: 'MyApp',
      ),
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp(
        navigatorObservers: [InsightechNavigatorObserver()],
        home: const HomeScreen(),
      );
}
```

That's the whole integration. Tracking starts immediately.

:::tip Where to find your account string
Log in to the Insightech dashboard. Your profile ID and server ID are in the
tracking-code snippet, formatted as `profileId:serverId` — for example
`b2437b9101:us-1-api`.
:::

## With go_router

`go_router` takes the same observer:

```dart
GoRouter(
  observers: [InsightechNavigatorObserver()],
  routes: [...],
)
```

`auto_route` and plain `Navigator` work the same way.

## Why the observer matters

Nothing is sent until a screen URL is registered, because the backend cannot
correlate events to a page without one. If you see this warning in the logs:

```
No screen tracked after 10s. Add InsightechNavigatorObserver() to your
MaterialApp/GoRouter navigatorObservers…
```

…the observer is missing. You can also call
`Insightech.instance.trackScreen(name)` manually when each screen appears.

## Development mode

```dart
InsightechConfig(
  account: 'YOUR_PROFILE_ID:YOUR_SERVER_ID',
  appName: 'MyApp',
  devMode: kDebugMode,
)
```

`devMode` mints a new visitor ID on every app start — so each run is its own
session, which makes a change easy to find in the dashboard — and enables
verbose logging.

## Next

[What gets tracked automatically](/automatic-tracking).
