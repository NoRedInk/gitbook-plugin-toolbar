require(['gitbook'], function(gitbook) {

    gitbook.events.bind('start', function(e, config) {
        var opts = config.toolbar;
        
        if (!opts || !opts.buttons) return;
        
        var buttons = opts.buttons.slice(0);
        buttons.reverse();
        
        buttons.forEach(function(button) {
            gitbook.toolbar.createButton({
                icon: button.icon || "fa fa-external-link",
                label: gitbook.renderInline("markdown", button.label || "Link"),
                position: 'right',
                onClick: function(e) {
                    e.preventDefault();
                    var url = gitbook.renderInline("markdown", button.url);
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
