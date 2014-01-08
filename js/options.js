var Templates = {};

var Controller = {

    init: function () {
        this.page = $('#page-wrap').find('#content');
        this.hidden = $('#hidden');

        /*
         $('.input-track').change(function(){
         console.log('change');
         Controller.onChangeEntry.call(Controller);
         });
         */

        $('.add-category').on("click", function (e) {
            console.log("clicked");
            Controller.addCategory.call(Controller);
        });

        $('.save').on("click", function (e) {
            console.log("clicked");
            Controller.save.call(Controller);
        });

        $('.input-remove-category').on('click', function (e) {
            if (confirm('Are you sure want to delete this category ?')) {
                var $e = $(e.target);
                $e.closest('.category').remove();
            }
        });

        $('.input-remove-entry').on('click', function (e) {
            var $e = $(e.target);
            $e.closest('.category-entry').remove();
        });

        $('.input-add-entry').on('click', function (e) {
            Controller.addEntry.call(Controller, $(e.target).closest('.category'));
        });

        $('.reset-default-link').on('click', function (e) {
            if(confirm("Are you sure want to restore default settings?")) {
                _SAVE_TO_LOCAL_STORAGE(_DEFAULT_CQ);
                window.location.reload();
            }
        });
    },

    validate: function () {
        return true;
    },

    save: function () {
        if (Controller.validate.call(Controller)) {
            var newCQ = {};
            var $page = this.page;
            $page.find('.category').each(function (i, e) {
                var $e = $(e);
                var categoryTitle = $e.find('.input-category-title').val();
                newCQ[categoryTitle] = {};
                $e.find('.category-entry').each(function (i, e) {
                    var $e = $(e);
                    var category = newCQ[categoryTitle];
                    var entry = {};
                    entry["title"] = $e.find('.input-entry-title').val();
                    entry["url"] = $e.find('.input-entry-url').val();
                    entry["url_path"] = $e.find('.input-entry-url_path').val();
                    entry["param"] = $e.find('.input-entry-param').val();
                    entry["icon"] = $e.find('.input-entry-icon').val();
                    category[entry["title"]] = entry;
                });
            });
            console.log(newCQ);
            _SAVE_TO_LOCAL_STORAGE(newCQ);

            //$('.save').effect("highlight", {}, 3000);
            $('.save').addClass('saved');
            setTimeout(function () {
                $('.save').removeClass('saved');
            }, 5000);
        }
    },

    addEntry: function ($category) {
        var entryHtml = Templates.entryTemplate({"icon": "icons/siteadmin.png"});
        $category.append(entryHtml);
        var addedEntry = $category.last();
        addedEntry.find('.input-remove-entry').on('click', function (e) {
            var $e = $(e.target);
            $e.closest('.category-entry').remove();
        });
        addedEntry.find('.icon-chooser').on('click', function(event) {
            Popbox.open(this, event);
        });
        addedEntry.find('.popup-icon').on('click', function(event) {
            Popbox.choose(this, event);
            Popbox.close();
        });
    },

    changed: false,

    addCategory: function () {
        var categoryHtml = Templates.categoryTemplate({"category_title": "New Category"});
        this.hidden.html(categoryHtml);
        var categoryInner = $('#hidden').find('.category');
//        categoryInner.append(Templates.entryTemplate({"icon": "icons/siteadmin.png"}));
        Controller.addEntry.call(Controller, categoryInner);
        this.page.append(this.hidden.children());
        this.hidden.empty();
        var $category = this.page.find('.category:last');
        $category.find('.input-remove-category').on('click', function (e) {
            var $e = $(e.target);
            $e.closest('.category').remove();
        });
        $category.find('.input-add-entry').on('click', function (e) {
            Controller.addEntry.call(Controller, $(e.target).closest('.category'));
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    var categorySource = $("#category-template").html();
    Templates.categoryTemplate = Handlebars.compile(categorySource);

    var entrySource = $("#entry-template").html();
    Templates.entryTemplate = Handlebars.compile(entrySource);

    var hidden = $('#hidden');
    var page = $('#page-wrap').find('#content');

    for (var categoryKey in _CQ) {
        var category = _CQ[categoryKey];
        var categoryHtml = Templates.categoryTemplate({category_title: categoryKey});

        hidden.html(categoryHtml);

        var categoryInner = $('#hidden').find('.category');

        for (var entryKey in category) {
            var entry = category[entryKey];
            entry.icon = entry.icon || "icons/siteadmin.png";
            categoryInner.append(Templates.entryTemplate(entry));
        }

        page.append(hidden.children());
        hidden.empty();
    }

    Controller.init();

    $('.icon-chooser').on('click', function(event) {
        Popbox.open(this, event);
    });

    $('.popup-icon').on('click', function(event) {
        Popbox.choose(this, event);
        Popbox.close();
    });
});

