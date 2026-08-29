---
sidebar_position: 9
title: Form tracking
---

# Form tracking

Field focus, blur, keystrokes and committed values are captured
automatically for every text field — see
[Automatic tracking](/automatic-tracking). Values are masked on the device
before they are sent.

## Submissions

A submission is explicit, because only your code knows when a form is
actually submitted:

```dart
Insightech.instance.trackFormSubmit(const FormInfo(
  nodeIndex: 0,
  cssPath: '#checkout-form',
  name: 'checkout',
  method: 'POST',
  fields: [
    InsightechFormField(
      nodeIndex: 0, cssPath: '#email', name: 'email', value: '',
    ),
    InsightechFormField(
      nodeIndex: 0, cssPath: '#full-name', name: 'name', value: '',
    ),
  ],
));

// Force-send before navigating away.
await Insightech.instance.flush();
```

Field values go through the same masking pipeline as live input, so passing a
real value is safe — but passing an empty string is safer still if you do not
need the value at all.

:::note Why the `Insightech` prefix
`InsightechFormField` carries the prefix because Flutter's own `FormField`
widget would otherwise collide in any app importing both libraries.
:::

## What form analytics shows

- which fields users focus, and in what order
- which fields they edit and then abandon
- how long each field takes
- where a form is dropped

Field names come from the label or hint the user sees, so give your fields a
`labelText` and the reports read naturally.
