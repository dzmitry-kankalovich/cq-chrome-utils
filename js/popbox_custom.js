/**
 * based on http://gristmill.github.io/jquery-popbox
 * */

var Popbox = {
    open: function (self, event) {
        Popbox.close();
        event.preventDefault();
        var pop = $(self);
        var box = pop.closest('.category-entry').find('.box');

        box.find('.arrow').css({'left': pop.width()/2-1});
        box.find('.arrow-border').css({'left': pop.width()/2-1});

        var top = pop.height() + 10;
        var left = -(box.width()/2 - pop.width()/2) - 4;

        box.css({'display': 'block', 'top': top, 'left': left});
        box.addClass('popup_opened');
        return false;
    },

    choose: function (self, event) {
        var val = $(self).data('val');
        var icon = $(self).closest('.category-entry').find('.icon-chooser');
        icon.val(val);
        icon.css({'background-image' : 'url(' + val + ')'});
    },

    close: function () {
        var openedBox = $('.popup_opened');
        openedBox.fadeOut("fast");
        openedBox.removeClass('.popup_opened');
    }
};

(function () {
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.box, .icon-chooser').length) {
            Popbox.close();
        }
    });
})();