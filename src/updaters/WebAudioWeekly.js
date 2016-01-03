/*eslint no-console: 0 */
import Updater from '../Updater';
import cheerio from 'cheerio';
import request from 'request';

const url = 'http://blog.chrislowis.co.uk/waw.html';

export default class WebAudioWeekly extends Updater {
  run(cb) {
    const self = this;
    const links = [];
    const getLinks = function (done) {
      request(`${url}`, function (error, response, body) {
        const $ = cheerio.load(body);
        $('ul.listing li a').each(function () {
          const href = $(this).attr('href');
          links.push(`http://blog.chrislowis.co.uk${href}`);
        });
        done();
      });
    };
    const parseLinks = function () {
      const link = links.pop();
      if (typeof link === 'string') {
        request(`${link}`, function (error, response, body) {
          const $ = cheerio.load(body);
          const mainTag = $('h1').first().text().trim().toLowerCase().replace(/ +/gi, '-');
          $('h2').each(function () {
            const $elem = $(this);
            const title = $elem.text();
            const description = $elem.siblings('p').first().text();
            $elem.siblings('ul').find('li a').each(function () {
              const url = $(this).attr('href');
              self.addUrl(url);
              self.addTag(url, 'web-audio-weekly');
              self.addTag(url, 'waw');
              if (typeof mainTag === 'string' && mainTag.indexOf('web-audio-weekly-') === 0) {
                self.addTag(url, mainTag.replace('web-audio-weekly-', 'waw-'));
              }
              self.addSource(url, link);
              self.addProperty(url, 'title', title);
              self.addProperty(url, 'description', description);
            });
          });
          console.log(mainTag);
          parseLinks();
        });
      } else {
        cb();
      }
    };
    getLinks(function () {
      parseLinks();
    });
  }
}
