export default defineEventHandler((event) => {
  const query = getQuery(event);
  // const docId = query.docId;
  return { message: "ok", data: { message: "demo200-1", status: "ok" } };
});
