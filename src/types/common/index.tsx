export type OnInteractOutsideEvent =
  | CustomEvent<{ originalEvent: PointerEvent }>
  | CustomEvent<{ originalEvent: FocusEvent }>;
