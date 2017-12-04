Oh no! Zombies!
---

This is a game made for [ludum dare 40](https://ldjam.com/events/ludum-dare/40).

## Play now!
https://bsansouci.github.io/ludum-dare-40/

- WASD to **move**
- Arrow keys to **shoot**
- **Switch guns** using hotkeys specified on their icons
- Guns will automatically **reload** when they are all out of bullets. You can also walk over ammo boxes to refill any guns of that type.
- **Kill zombies**, get achievements!

### Install
_warning_: this doesn't work with npm5 yet. Use npm4 or use yarn. To downgrade to npm4 you can `npm install -g npm@latest-4`
```
git clone https://github.com/bsansouci/reprocessing-example.git
yarn
```

### Build
```
npm run build
```

### Start
```
npm start
```

To build to JS run `npm run build:web` and then open `index.html`

To build to native run `npm run build:native` and run `npm run start:native`

The build system used is [bsb-native](https://github.com/bsansouci/bsb-native).
