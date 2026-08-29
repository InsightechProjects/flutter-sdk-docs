---
sidebar_position: 11
title: Configuration
---

# Configuration reference

```dart
InsightechConfig(
  // ── Required ──
  account: 'profileId:serverId',
  appName: 'MyApp',

  // ── Optional ──
  protocol: 'https:',            // default 'https:'
  trackingLevel: 'full',         // 'full' | 'lite' — bypasses sampling
  sampleRate: 1.0,               // fraction of visitors with replay, 0.0–1.0
  devMode: false,                // new visitor per launch + verbose logging

  // ── Network ──
  maxConcurrentRequests: 1,
  sendRequestSize: 200,          // KB threshold that triggers a send
  requestTimeout: 10000,         // ms
  maxRetries: 3,
  retryBaseDelay: 1000,          // ms, exponential backoff with jitter

  // ── Throttling ──
  scrollInterval: 150,           // ms between scroll samples
  resizeInterval: 150,
  mutationBatchInterval: 200,

  // ── Storage and limits ──
  visitorIdStorageKey: 'insightech_vid',
  maxQueueSize: 1000,
  maxTagEntries: 5000,
  maxSnapshotBytes: 500000,
  deferTracking: true,           // keep heavy work off the frame path
  captureHttpErrors: true,
)
```

## Session sampling

`sampleRate` controls **session-replay coverage, not whether events flow**.
Analytics events — taps, scrolls, inputs, custom events, errors — are always
sent for every visitor. The rate only decides which visitors additionally
capture replay data.

| `sampleRate` | Full tracking (replay) | Lite tracking (events only) |
|---|---|---|
| `1.0` (default) | 100% | 0% |
| `0.5` | 50% | 50% |
| `0.0` | 0% | 100% |

The decision is **deterministic per visitor** and uses the same 32-bit FNV-1a
calculation as the JavaScript and React Native SDKs, so a given visitor lands
in the same bucket on every platform.

Precedence: explicit `trackingLevel` > server override > local `sampleRate`.

Out-of-range values are clamped to `[0, 1]`.

## Deferred capture

With `deferTracking: true` (the default) the SDK keeps heavy work off the
frame-critical path:

- the widget-tree walk waits for the scheduler to go idle, and yields to the
  event loop every ~500 elements
- JSON encoding and gzip run on a **background isolate**
- icon glyphs are rasterized off the critical path

Set it to `false` for fully synchronous capture in tests.

:::warning
The synchronous path does not rasterize icons. If you are writing your own
harness against the serializer, use the async path — it is what the SDK
actually ships.
:::

## Snapshot size guard

A very deep or wide screen can serialize into megabytes. When a snapshot
would exceed `maxSnapshotBytes`, the SDK **drops that snapshot whole** rather
than sending an oversized or partial payload. Every other event keeps
flowing; only the replay snapshot for that one screen is omitted.

Raise it if replays of complex screens are missing.

## Performance tuning

If you need to reduce overhead:

```dart
InsightechConfig(
  scrollInterval: 300,        // fewer scroll samples
  mutationBatchInterval: 500, // longer mutation batching window
  sendRequestSize: 500,       // larger batches, fewer requests
  maxQueueSize: 500,          // smaller queue ceiling
)
```
