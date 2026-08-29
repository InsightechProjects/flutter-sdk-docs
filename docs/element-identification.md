---
sidebar_position: 5
title: Element identification
---

# Element identification

Stable identifiers turn positional selectors like `div:nth-child(2)` into
readable ones like `#add-to-cart`. That is what makes click maps and heatmaps
survive a layout change — and it is what the server's masking rules match
against.

The SDK resolves an identifier in this order, first match wins:

## 1. `InsightechTag` — explicit

```dart
InsightechTag(
  id: 'add-to-cart',
  child: ElevatedButton(onPressed: _add, child: const Text('Add')),
)
```

## 2. `Semantics(identifier:)`

Flutter's own stable-id mechanism. If you already set it for accessibility or
testing, the SDK picks it up.

```dart
Semantics(identifier: 'add-to-cart', child: myButton)
```

## 3. `ValueKey<String>`

What most teams already put on widgets for integration tests — so you often
get good selectors for free, with nothing to add:

```dart
ElevatedButton(
  key: const ValueKey<String>('add-to-cart'),
  onPressed: _add,
  child: const Text('Add'),
)
```

## Without an identifier

Elements fall back to a positional selector such as
`body > div:nth-child(2) > span:nth-child(1)`. That works, but it breaks when
the layout changes — so identify anything you plan to report on.

## Text fields are a special case

An identifier on a `TextField` is deliberately **held back for the
`<input>`** inside it, rather than landing on the first wrapper.

A text field builds a tap detector and a decoration container before it
reaches its `EditableText`, so without that rule the id would attach to a
wrapper — and form analytics, which matches on the field itself, would not
find it.

```dart
TextField(
  key: const ValueKey<String>('email'),   // lands on the input
  decoration: const InputDecoration(labelText: 'Email'),
)
```

## Field names

Form analytics also reports a human-readable field name, taken from the label
or hint the user actually sees — so `decoration: InputDecoration(labelText:
'Email')` reports as `Email`.
