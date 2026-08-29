---
sidebar_position: 10
title: API error tracking
---

# API error tracking

When the server config includes `apiErrorEndpoints`, the SDK installs an
`HttpOverrides` interceptor and reports failures on matching URLs as type 97.

## What it covers

`package:http`'s default `IOClient` and `dio`'s default `IOHttpClientAdapter`
both build on `dart:io`'s `HttpClient`, so one hook covers the two clients
almost every Flutter app actually uses — including calls made by packages you
did not write.

**Not covered:** an app that injects a custom `dio` adapter, or a custom
`HttpClient` implementation. Those need their own interceptor.

## Configuration

Endpoints are configured **server-side**, so the set of monitored URLs can
change without an app release. Each endpoint also carries a flag controlling
whether the request body is captured, so payload capture is opt-in per
endpoint rather than blanket.

Until the server supplies endpoints, the interceptor is not installed at all.

## Safety

- The SDK's own ingest traffic is always excluded, so tracking can never
  observe or recurse into itself.
- Any `HttpOverrides` your app already installed is **delegated to**, not
  replaced.
- Captured request bodies are truncated.

To opt out entirely:

```dart
InsightechConfig(
  account: '…',
  appName: 'MyApp',
  captureHttpErrors: false,
)
```
