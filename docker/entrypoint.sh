#!/bin/sh

# Map OpenShift-style VOICE_API_BACKEND env var to the Next.js rewrite target.
# In standalone mode, next.config rewrites read process.env at server startup.
if [ -n "$VOICE_API_BACKEND" ]; then
  export NEXT_PUBLIC_BACKEND_URL="$VOICE_API_BACKEND"
fi

exec node server.js
