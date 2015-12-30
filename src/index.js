import * as updaters from './Updaters';

Object.keys(updaters).forEach(function (lib) {
  const instance = new updaters[lib]();
  if (typeof instance.run === 'function') {
    instance.run(function () {
      instance.write();
    });
  }
});
