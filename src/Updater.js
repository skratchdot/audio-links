import fs from 'fs';

export default class Updater {
  constructor() {
    const self = this;
    const urlArray = JSON.parse(fs.readFileSync(`${__dirname}/../data/urls.json`, 'utf-8'));
    self.urls = {};
    urlArray.forEach(function (item) {
      if (item.hasOwnProperty('url')) {
        item.tags = item.tags.map(function (tag) {
          return tag.toLowerCase();
        }).filter(function (tag) {
          return tag.length > 0;
        });
        self.urls[item.url] = item;
      }
    });
  }
  write() {
    const self = this;
    const urlArray = [];
    const tags = [];
    Object.keys(self.urls).sort().forEach(function (url) {
      const urlInfo = self.urls[url];
      urlInfo.tags.forEach(function (tag) {
        if (tags.indexOf(tag) === -1) {
          tags.push(tag);
        }
      });
      urlArray.push(self.urls[url]);
    });
    tags.sort();
    fs.writeFileSync(`${__dirname}/../data/tags.json`, JSON.stringify(tags, null, '  '), 'utf-8');
    fs.writeFileSync(`${__dirname}/../data/urls.json`, JSON.stringify(urlArray, null, '  '), 'utf-8');
  }
  addUrl(url) {
    if (!this.urls.hasOwnProperty(url)) {
      this.urls[url] = {
        url: url,
        tags: [],
        description: '',
        shortDescription: ''
      };
    }
  }
  addTag(url, tag) {
    this.addUrl(url);
    if (!this.urls[url].hasOwnProperty('tags')) {
      this.urls[url].tags = [];
    }
    tag = tag.toLowerCase();
    if (this.urls[url].tags.indexOf(tag) === -1 && tag.length > 0) {
      this.urls[url].tags.push(tag);
    }
  }
  addSource(url, source) {
    this.addUrl(url);
    if (!this.urls[url].hasOwnProperty('sources')) {
      this.urls[url].sources = [];
    }
    if (this.urls[url].sources.indexOf(source) === -1) {
      this.urls[url].sources.push(source);
    }
  }
  addProperty(url, prop, val) {
    this.addUrl(url);
    this.urls[url][prop] = val;
  }
}
