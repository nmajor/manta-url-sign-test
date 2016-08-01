### Usage:

The source file is ES6 syntax and is located here:
    src/index.js

To build the source file:
    gulp babel

The output of gulp goes in here:
    dist/index.js

You can have gulp watch for changes and build automatically with:
    gulp watch

You can run the built file with this:
    node dist/index.js

This project expects the following ENV variable to run correctly:

MANTA_APP_KEY=[private-key with the literal string '\n' in place of new line characters.]
MANTA_APP_KEY_ID=[some:manta:key:id]
MANTA_APP_USER=user/subuser
MANTA_APP_USER_ID=[some-user-id]
MANTA_APP_URL=https://us-east.manta.joyent.com
MANTA_APP_PUBLIC_PATH=/some/public/path

You can put these env variable in a file named `.env` in the root of this repo to load those env variables at runtime.
