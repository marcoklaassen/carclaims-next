export function stylesSelect(value: string) {
  if (!value) {
    return (
      <span style={{ color: "rgba(0, 0, 0, 0.87)", opacity: 0.5 }}>
        Bitte auswählen
      </span>
    );
  }
  return value;
}
