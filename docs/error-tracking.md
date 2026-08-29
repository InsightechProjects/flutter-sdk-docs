---
sidebar_position: 8
title: Error tracking
---

# Error tracking

## Automatic

Unhandled Dart and Flutter errors are captured with no setup, through two
hooks that between them cover both halves of the runtime:

- `FlutterError.onError` — synchronous errors inside the framework (build,
  layout, paint, gesture callbacks)
- `PlatformDispatcher.onError` — errors escaping the root zone, which is
  where unawaited async failures surface

Both **chain to whatever handler was already installed**, so Sentry,
Crashlytics and the default console reporter keep working exactly as before.

Errors are recorded with the message, type, a truncated stack trace, and
whether they were fatal.

## Manual

To report an error the user actually saw — a validation failure, a declined
payment, any error state worth segmenting on:

```dart
Insightech.instance.trackError(
  message: 'Payment failed: card declined',
  type: 'api',
  context: {'endpoint': '/api/payment', 'status': 402},
);
```

```dart
Insightech.instance.trackError(
  message: 'Please fill in all required fields',
  type: 'validation',
  context: {'screen': 'Checkout', 'empty_fields': ['email', 'phone']},
);
```

`type` defaults to `validation`. Everything in `context` is merged into the
event, so you can segment on it.

## Where errors appear

Errors are emitted as type 99 with `event: "js_error"` — the same shape the
React Native SDK uses, so dashboards and segments built for one SDK work
unchanged for the other. They appear in the session timeline rather than the
JavaScript-error report.
