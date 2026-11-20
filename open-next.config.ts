import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Pages are rendered per request, so no incremental (ISR) cache is configured.
export default defineCloudflareConfig({});
