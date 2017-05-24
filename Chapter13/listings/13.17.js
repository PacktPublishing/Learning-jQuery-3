$.ajaxSetup({
  accepts: {
    yaml: 'application/x-yaml, text/yaml'
  },
  contents: {
    yaml: /yaml/
  },
  converters: {
    'text yaml': (textValue) => YAML.eval(textValue)
  }
});

$.ajaxPrefilter(({ url }) =>
  /\.yml$/.test(url) ? 'yaml' : null
);

$.ajaxTransport('img', ({ url }) => {
  var $img, img, prop;

  return {
    send(headers, complete) {
      const callback = (success) => {
        if (success) {
          complete(200, 'OK', { img });
        } else {
          $img.remove();
          complete(404, 'Not Found');
        }
      }

      $img = $('<img>', {
        src: url
      });

      img = $img[0];
      prop = typeof img.naturalWidth === 'undefined' ?
        'width' : 'naturalWidth';

      if (img.complete) {
        callback(!!img[prop]);
      } else {
        $img.on('load error', ({ type }) => {
          callback(type == 'load');
        });
      }
    },

    abort() {
      if ($img) {
        $img.remove();
      }
    }
  };
});

Promise.all([
  $.getScript('yaml.js')
    .then(() =>
      $.ajax({
        url: 'categories.yml'
      })),
  $.ready
]).then(function([data]) {
  const output = Object.keys(data).reduce((result, key) =>
    result.concat(
      `<li><strong>${key}</strong></li>`,
      data[key].map(i => `<li> <a href="#">${i}</a></li>`)
    ),
    []
  ).join('');

  $('#categories')
    .removeClass('hide')
    .html(`<ul>${output}</ul>`);
});

$(() => {
  const buildItem = item =>
    `
      <li>
        <h3><a href="${item.html_url}">${item.name}</a></h3>
        <div>★ ${item.stargazers_count}</div>
        <div>${item.description}</div>
      </li>
    `;

  const cache = new Map();

  $('#ajax-form')
    .on('submit', (e) => {
      e.preventDefault();

      const search = [
        $('#title').val(),
        new Map([
          ['JavaScript', 'language:"JavaScript"'],
          ['HTML', 'language:"HTML"'],
          ['CSS', 'language:"CSS"'],
          ['5000+', 'stars:">=5000"'],
          ['10000+', 'stars:">=10000"'],
          ['20000+', 'stars:">=20000"'],
          ['', '']
        ]).get($.trim(
          $('#categories')
            .find('li.active')
            .text()
        ))
      ].join('');

      if (search == '' && category == '') {
        return;
      }

      $('#response')
        .addClass('loading')
        .empty();

      cache.set(search, cache.has(search) ?
        cache.get(search) :
        $.ajax({
          url: 'https://api.github.com/search/repositories',
          dataType: 'jsonp',
          data: { q: search },
          timeout: 10000,
        })
      ).get(search).then((json) => {
        var output = json.data.items.map(buildItem);
        output = output.length ?
          output.join('') : 'no results found';

        $('#response').html(`<ol>${output}</ol>`);
      }).catch(() => {
        $('#response').html('Oops. Something went wrong...');
      }).always(() => {
        $('#response').removeClass('loading');
      });
    });

  const searchDelay = 300;
  var searchTimeout;

  $('#title')
    .on('keyup', (e) => {
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        $(e.target.form).triggerHandler('submit');
      }, searchDelay);
    });

  $(document)
    .on('click', '#categories a', (e) => {
      e.preventDefault();

      $(e.target)
        .parent()
        .toggleClass('active')
        .siblings('.active')
        .removeClass('active');
      $('#ajax-form')
        .triggerHandler('submit');
    });
});
