---
sidebar_position: 12
title: How it works
---

# How it works

```
Your App
  │
  ├── Insightech (wraps your app)
  │     │
  │     ├── global pointer route ────────► taps
  │     ├── root ScrollNotification ─────► scroll depth
  │     ├── FocusManager + controller ───► input, focus, blur
  │     ├── NavigatorObserver ───────────► screen views
  │     ├── AppLifecycleListener ────────► foreground / background
  │     ├── FlutterError + PlatformDispatcher ─► crashes
  │     ├── HttpOverrides ───────────────► API errors
  │     │
  │     ├── Element-tree walk ───────────► synthetic DOM snapshot
  │     └── on-device masking
  │
  └── events batched → gzipped on a background isolate → Insightech
```

## The synthetic DOM

Flutter draws its own pixels, so there is no DOM to record. The SDK builds
one by walking Flutter's **Element tree** and emitting a node for every
element that is visually or semantically significant — anything that paints,
holds text, takes input, scrolls, or carries an identifier.

Layout-only wrappers (`Padding`, `Align`, `MediaQuery`, …) are transparent,
which keeps a typical screen at tens of nodes rather than hundreds.

| Flutter | HTML |
|---|---|
| painted boxes (`Container`, `DecoratedBox`, `Material`, `Card`) | `<div>` |
| `Text` / `RichText` | `<span>` + text node |
| `Image` | `<img>` |
| `Icon` and any icon-font glyph | `<img>` with the glyph rasterized inline |
| `TextField` / `EditableText` | `<input>` / `<textarea>` |
| `Scrollable`, `ListView`, `GridView` | `<div>` with `overflow` |
| `GestureDetector`, `InkWell`, every Material button | `<button>` |
| `Switch`, `Checkbox`, `Radio` | `<input>` |
| `CustomPaint`, platform views | placeholder `<div>` |

## Icons

The replay viewer has no access to your app's icon font, so emitting a
glyph's codepoint would render tofu. Instead the SDK rasterizes each glyph on
the device into a small PNG and embeds it, so the replay shows exactly what
the user saw.

Detection keys on the Unicode Private Use Area codepoint rather than the font
name, so this works for Material, Cupertino, FontAwesome and in-house icon
fonts alike — and ordinary text is never mistaken for an icon.

Each unique combination of glyph, size and colour is rendered once and
cached, so an icon used fifty times costs one bitmap in the payload (roughly
1.5 KB for a standard 24px icon).

## Why absolute positioning

This is the one place the Flutter SDK deliberately diverges from React
Native. RN reads a `style` prop that is already CSS-shaped, because React
Native *is* flexbox. Flutter has no style prop — visual truth lives on
RenderObjects — and its layout algorithms (Flex, Stack, Sliver, Wrap,
`CustomMultiChildLayout`) have no CSS equivalent.

So the SDK emits **absolutely-positioned boxes measured from the render
tree**: every node carries the exact `left/top/width/height` Flutter
computed. That is deterministic and pixel-accurate for the fixed viewport a
mobile replay plays back in.

## Scrolling

Descendants of a scroll container are positioned in **content space** rather
than viewport space, and each container carries a spacer sized to its full
scroll extent. The replay player then reproduces scrolling from the scroll
events themselves, exactly as it does on the web.

## Occlusion culling

Flutter keeps the routes below the current one mounted, so a snapshot taken
on a pushed screen would otherwise carry the whole screen beneath it — wasted
payload, and a hit map in which a tap could resolve to something invisible.
Anything a later full-viewport opaque fill covers is dropped. A translucent
scrim is not opaque, so what is behind it survives.

## Node identity

Node indices are keyed on an `Expando` over Flutter `Element`s. Elements
survive rebuilds (Widgets do not), so an index assigned to an element
persists across every `setState` that does not structurally change the tree.
