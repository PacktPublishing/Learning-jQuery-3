$(() => {
  const builtItem = item =>
    `
      <li>
        <h3><a href="{item.html_url}">{item.name}</a></h3>
        <div>★ {item.stargazers_count}</div>
        <div>{item.description}</div>
      </li>
    `;

  $('#ajax-form')
    .on('submit', (e) => {
      e.preventDefault();

      $.ajax({
        url: 'https://api.github.com/search/repositories',
        dataType: 'jsonp',
        data: {
          q: $('#title').val()
        },
        success(data) {
          console.log(data);
        }
      });
    });
});
