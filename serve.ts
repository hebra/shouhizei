import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.192.0/http/file_server.ts";

const PORT = 8000;

console.log(`Server running at http://localhost:${PORT}/`);

serve((req) => {
  return serveDir(req, {
    fsRoot: "web",
    showDirListing: true,
  });
}, { port: PORT });
