// Legacy URLs: 410 for removed pages, 301 where there is a replacement.
const MOVED = {
  "/2025/12/17/organizing-my-library-with-semantic-search": "/projects/semantic-library/",
  "/about": "/",
};

const GONE = /^\/(\d{4}(\/|$)|(category|tag|author|feed|comments|page|wp-content|wp-json|wp-admin|wp-includes)(\/|$)|(wp-login|xmlrpc)\.php$)/;

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (MOVED[path]) {
    return Response.redirect(new URL(MOVED[path], url.origin).toString(), 301);
  }
  if (GONE.test(path) || url.searchParams.has("p") || url.searchParams.has("page_id")) {
    return new Response("410 Gone", {
      status: 410,
      headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }
  return context.next();
}
