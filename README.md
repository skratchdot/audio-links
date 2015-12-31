# audio-links


## Description

A collection of audio links compiled from different sources.


## Links

- [Demo Site](http://projects.skratchdot.com/audio-links/)
- [Source Code](https://github.com/skratchdot/audio-links/)

## Data compiled from the following sources:

- [Awesome Webaudio](https://github.com/notthetup/awesome-webaudio)
- [Web Audio Weekly](http://blog.chrislowis.co.uk/waw.html)
- [Web Audio Resources](https://github.com/alemangui/web-audio-resources)
- [Audio Crawl](http://audiocrawl.co/)


## For Developers


### Getting Started

1. Install the codebase:
```bash
git clone https://github.com/skratchdot/audio-links.git
cd audio-links
npm install
```
2. Build website and transpile code: `gulp`
3. Run all updaters: `node ./lib/index.js`.

### Adding a scraper

Create a new class in the `./src/updaters/` folder that
extends `./src/Updater.js`.  Make sure your class has a `run(cb)` method.
See `./src/Updater.js` for methods that update the url data.  Your scraper
should add urls with descriptions and tags.


## License
Copyright (c) 2015 [skratchdot](http://skratchdot.com/)  
Licensed under the [MIT license](LICENSE-MIT).
