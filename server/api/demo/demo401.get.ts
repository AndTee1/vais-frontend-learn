export default defineEventHandler((event) => {
  const query = getQuery(event);
  // const docId = query.docId;
  throw createError({ statusCode: 401, statusMessage: "Bad request" });
});
