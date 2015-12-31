/*eslint no-console: 0 */
import Updater from '../Updater';
import request from 'request';

const url = 'http://audiocrawl.co/api/demos?page=';

export default class AwesomeWebaudio extends Updater {
  run(cb) {
    const self = this;
    let page = 1;
    const getUrl = function () {
      request(`${url}${page}`, function (error, response, body) {
        console.log(`Crawling ${url}${page}.`);
        if (!error && response.statusCode == 200) {
          const info = JSON.parse(body);
          if (Array.isArray(info.demos)) {
            for (let i = 0; i < info.demos.length; i++) {
              const data = info.demos[i];
              self.addUrl(data.url);
              self.addTag(data.url, 'audiocrawl.co');
              if (Array.isArray(data.tags)) {
                for (let j = 0; j < data.tags.length; j++) {
                  self.addTag(data.url, data.tags[j].title);
                }
              }
              self.addSource(data.url, 'http://audiocrawl.co/');
              self.addProperty(data.url, 'title', data.title);
              self.addProperty(data.url, 'image', data.image);
            }
            // move on to next page
            page++;
            getUrl();
          } else {
            cb();
          }
        } else {
          cb();
        }
      });
    };
    getUrl();
  }
}
