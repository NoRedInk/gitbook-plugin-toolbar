function onPage(page) {
  var book = this;
  var opts = book.config.get('toolbar', {});
  console.log(opts);
  if (!opts || !opts.buttons) return page;

  page.content += '<div style="display:none" id="plugin-toolbar-data">'
  var buttons = opts.buttons.slice(0);
  page.content += JSON.stringify(
    buttons.map(function(button) {
      return {
        icon: button.icon || "fa fa-external-link",
        label: book.renderInline("markdown", button.label || "Link"),
        position: 'right',
        target: button.target,
        url: gitbook.renderInline("markdown", button.url)
      };
    }));
  page.content += '</div>';
  return page;
}

module.exports = {
  hooks: {
    'page': onPage
  },
  book: {
    assets: './assets',
    js: [
      'buttons.js'
    ]
  }
};
