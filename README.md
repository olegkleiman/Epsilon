# Epsilon

This React app uses Firebase functions for w/r access to exposed branches from Firestore. This is just workaround for authentication rules posed by Firestore: in order to use the functions, the only simplest secret key is passed, thus this secret designates the app, not the user but this is enough for most common purposes.

## Build and Debug
In 2 terminal windows, run <code>yarn build</code> and <code>sudo firebase serve</code>.

## Deploy
<code>sudo firebase deploy</code>
