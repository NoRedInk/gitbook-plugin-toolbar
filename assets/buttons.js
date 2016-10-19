require(['gitbook'], function(gitbook) {

    gitbook.events.bind('start', function(e, config) {
        var opts = config.toolbar;

        if (!opts || !opts.buttons) return;

        var lang = gitbook.state.innerLanguage;
        var langPath = lang ? encodeURIComponent(lang) + '/' : '';
        var buttons = opts.buttons.slice(0);
        buttons.reverse();

        buttons.forEach(function(button) {
            var label = button.label || "Link";
            if (lang && typeof label === 'object') {
                label = label[lang];
            }
            gitbook.toolbar.createButton({
                icon: button.icon || "fa fa-external-link",
                label: label,
                position: 'right',
                onClick: function(e) {
                    e.preventDefault();
                    var mapping = {
                        "{{title}}": encodeURIComponent(document.title),
                        "{{langPath}}": langPath,
                        "{{url}}": encodeURIComponent(location.href),
                        "{{path}}": gitbook.page.getState("page").filepath
                    };
                    var re = RegExp(Object.keys(mapping).join("|"), "g");
                    var url = button.url.replace(re, function(matched) {
                        return mapping[matched];
                    });
                    if (button.target == "_self") {
                        window.location = url;
                    } else {
                        window.open(url, button.target || "_blank");
                    }
                }
            });
        });
    });
});
