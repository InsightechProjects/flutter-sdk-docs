---
sidebar_position: 13
title: Troubleshooting
---

# Troubleshooting

## No data in the dashboard

1. Set `devMode: true` and watch the logs for `Insightech:Transport`. A
   successful send logs `Response 200`.
2. Check the account string is `profileId:serverId`.
3. Check the dashboard's date filter — it defaults to "Yesterday".

## "No screen tracked after 10s"

Nothing is sent until a screen URL is registered, because the backend cannot
correlate events to a page without one.

Add `InsightechNavigatorObserver()` to your `navigatorObservers`, or call
`Insightech.instance.trackScreen(name)` when each screen appears.

## Replay looks empty or misaligned

Check the logs for a dropped snapshot — a screen over `maxSnapshotBytes` is
skipped whole. Raise the limit if replays of complex screens are missing.

## Some elements are not tracked

Only elements that paint, hold text, take input, scroll, or carry an
identifier become nodes. A purely structural widget contributes nothing on
its own — wrap it in `InsightechTag` if you need it addressable.

## A tap reports the wrong element

Taps resolve to the deepest captured node containing the point, which is the
same rule a browser uses. A tap on a button's label reports the label, with
the button in its selector path — that is expected, and matches the web SDK.

Give the button an identifier so its selector stays stable.

## Icons are missing from replay

Icons are rasterized on the device. If a glyph cannot be rendered, it falls
back to a neutral placeholder rather than failing the capture. This is rare;
it usually means the engine could not rasterize within the timeout.

## Custom events do not appear in reports

A custom event has to be configured in the Insightech dashboard before it
appears in the custom-event reports. It is still recorded and visible in the
session timeline before then.

## Device shows as "Other"

Flutter sessions currently report os and browser as "Other". The SDK sends
`User-Agent: insightech-flutter/<version> (<os> <os version>)` and
deliberately does not impersonate a browser, since that would misreport app
traffic as web traffic. Everything else — replay, click maps, scroll depth,
forms, custom events — is unaffected.

## High memory or battery use

See [performance tuning](/configuration#performance-tuning).
