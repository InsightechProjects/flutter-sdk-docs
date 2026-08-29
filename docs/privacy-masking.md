---
sidebar_position: 6
title: Privacy and masking
---

# Privacy and data masking

All personal data is **masked on the device before transmission**. Raw values
never leave the device.

## Input values

Every text field's value is masked by default: digits become `0`, every other
character becomes `*`.

| User types | Sent as |
|---|---|
| `John Doe` | `********` |
| `4242424242424242` | `0000000000000000` |
| `123 Main St` | `000********` |
| `john@example.com` | `****************` |

Length and shape are preserved so a replay still shows the user typing, but
the content is gone.

## Email addresses

Email addresses are detected and masked in **all** text content, not just
inputs, before the widget tree is sent. `Contact us at hello@insightech.com`
becomes `Contact us at *****@**************`.

## Masking a subtree

```dart
InsightechMask(child: Text(user.fullName))   // replays as "**** *****"
```

Everything inside is masked, however deeply nested.

## Excluding a subtree entirely

```dart
InsightechIgnore(child: SensitiveScreen())
```

Nothing inside is serialized — no structure, no text, no geometry. Also
useful for expensive subtrees you would rather not pay to capture, such as a
large chart.

Taps on descendants still resolve to the nearest captured ancestor, so
interactions are not lost.

## Server-controlled rules

The server returns two lists on the SDK's first request, so masking rules can
change **without an app release**:

- **`fieldAllowList`** — fields to leave unmasked, e.g. `["#search-input"]`
- **`contentBlockList`** — elements to fully mask, e.g. `["#personal-details"]`

Both match against the identifiers described in
[Element identification](/element-identification), so tag anything you want
to control this way:

```dart
InsightechTag(id: 'personal-details', child: Text(user.address))
```

## What this means in a replay

With `contentBlockList: ["#personal-details"]`:

| Element | Replay shows |
|---|---|
| `#order-id` → `ORD-12345` | `ORD-12345` |
| `#personal-details` → `Jane Smith` | `**** *****` |
