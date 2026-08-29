---
sidebar_position: 7
title: Custom events
---

# Custom event tracking

Custom events are how your own business events reach the dashboard, where
they feed conversions, funnels and segmentation.

```dart
Insightech.instance.trackCustomEvent({
  'event': 'add_to_cart',
  'product_id': product.id,
  'product_name': product.name,
  'category': product.category,
  'price': product.price,
  'quantity': quantity,
  'currency': 'USD',
});
```

The `event` key names the event; everything else is arbitrary data you can
segment on. Events arrive as type 99 and appear in the session timeline.

## A purchase

```dart
Insightech.instance.trackCustomEvent({
  'event': 'purchase',
  'order_id': order.id,
  'revenue': order.total,
  'currency': 'USD',
  'items': order.items.length,
});

// Make sure it is on the wire before the screen changes.
await Insightech.instance.flush();
```

:::tip Flush before you leave
`flush()` force-sends everything queued. Await it before navigating to an
external app, or before anything that might end the session, so nothing is
lost.
:::

## Configuring them in the dashboard

A custom event only appears in the custom-event reports once it has been
configured in the Insightech dashboard. Until then it is still recorded and
visible in the session timeline — so send it first, configure it after.

## Manual screen tracking

If you are not using a navigator observer, track screens yourself:

```dart
@override
void initState() {
  super.initState();
  Insightech.instance.trackScreen('ProductDetail', {'productId': widget.id});
}
```
