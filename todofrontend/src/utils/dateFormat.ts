export default function dateFormat(date: string) {
  return new Date(date).toLocaleString("en-Us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
