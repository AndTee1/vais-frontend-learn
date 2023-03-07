export default defineEventHandler((event) => {
  const query = getQuery(event);
  // const docId = query.docId;
  return { message: "ok", data: "demo200-2" };
});
