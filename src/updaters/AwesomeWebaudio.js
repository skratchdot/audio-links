import Updater from '../Updater';
import request from 'request';

const url = 'https://raw.githubusercontent.com/notthetup/awesome-webaudio/master/readme.md';

export default class AwesomeWebaudio extends Updater {
  run(cb) {
    const self = this;
    request(url, function (error, response, body) {
      const lines = body.split('\n');
      let tag = '';
      lines.forEach(function (line) {
        if (line.indexOf('#') >= 0) {
          tag = line.split(' ').slice(1)[0];
        }
        if (line.indexOf('-') === 0) {
          const re = /\[(.+)\]\((.+)\) - (.+)/gi;
          const matches = re.exec(line);
          if (matches && matches.length >= 4) {
            const title = matches[1];
            const url = matches[2];
            const description = matches[3];
            self.addUrl(url);
            self.addTag(url, 'awesome-webaudio');
            self.addTag(url, tag);
            self.addProperty(url, 'title', title);
            self.addProperty(url, 'description', description);
          }
        }
      });
      cb();
    });
  }
}
