# CookeByte Project-Brief Receipt Hosting Notes

## Current capability

The **Bring Us the Brief** panel now sends its form through the CookeByte server, stores the submitted brief in the project database, and returns a branded in-site receipt. The receipt ID is generated on the server in the form `CB-YYYYMMDD-XXXXXX`. This deployment deliberately performs **no automated email delivery** until an email provider is configured.

## Supported publishing path

The project has been upgraded from a static Vite site to a full-stack application with an Express and tRPC server. Publish the saved project through the CookeByte project interface so its server, database, and managed storage route are available. The managed launch sound is served from the project storage route rather than from the repository.

## Existing Vercel deployment

The existing Vercel site is a static Vite deployment. Its current `vercel.json` rewrites all requests to `index.html`, so it cannot serve the new `/api/trpc` receipt endpoint. **Do not push this full-stack receipt update to the branch that triggers the current Vercel deployment** until the Vercel project has been migrated to an Express-compatible configuration and its environment variables and database connection are separately configured.

## Future email activation

To add the requested email receipts later, configure a provider such as Resend with a verified sender domain and provide the server with the provider key and sender identity. The internal recipient remains `cookebyte@gmail.com`; the visitor confirmation will use the email stored with the brief. No WhatsApp delivery is included in this implementation.
