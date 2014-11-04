/**!
 * Custom jQuery plugin to add style to select widget
 * version: 1.2 (2014-11-04)
 * @author jvasseur
 */
;(function($, doc, win) {
    "use strict";
    
    var name = 'fake-select';
    
    function FakeSelect(element, options) {
        this.$el = $(element);
        
        // define defaults parameters
        this.defaults = {
            label: null,
            'class': 'faux-select'
        };
        var meta = this.$el.data(name + '-options');
        this.options = $.extend(this.defaults, options, meta);
        
        // destroy if called on an existing component
        if (this.$el.data(name) !== undefined &&
            this.$el.data(name) !== null) {
            this.$el.data(name).destroy();
        }
        
        this.$el.data(name, this);
        
        this.init();
    }
    
    FakeSelect.prototype.init = function() {
        var _this = this;
        
        // transform element
        this.transform();
        
        // add events
        this.$el
            .on('change.fakeselect', function(e) {
                _this.updateLabel();
            })
            .on('focus.fakeselect', function(e) {
                _this.$container.addClass('focus');
            })
            .on('blur.fakeselect', function(e) {
                _this.$container.removeClass('focus');
            });
    };
    
    FakeSelect.prototype.transform = function() {
        var _this = this;
        
        var $selected = this.$el.find(':selected'),
            label = '',
            is_default = true;

        // if custom label is not defined
        if (this.options.label) {
            label = this.options.label;
        } else {
            label = $selected.text();
            is_default = $selected.val() === '';
        }

        this.$label = $('<span class="' + this.options['class'] + '-label' + (is_default ? ' ' + this.options['class'] + '-label-default' : '' ) + '">' + label + '</span>');
        
        // transform <select> with other DOM elements
        this.$el
            // wrap with a span
            .wrap(function() {
                var classnames = _this.options['class'];
                if (_this.$el.attr('class'))
                    classnames += ' ' + _this.$el.attr('class');
                    
                return '<span class="' + classnames + '" />';
            })
            // prepend label into span before select
            .before(_this.$label)
            // append arrow icon after select
            .after('<i class="icon icon-arrow-down"></i>');

        this.$container = this.$el.parent();
    };
    
    FakeSelect.prototype.updateLabel = function() {
        var $selected = this.$el.find(':selected'),
            is_default = $selected.val() === '';

        this.$label
            .toggleClass(this.options['class'] + '-label-default', is_default)
            .text($selected.text());
    };
    
    FakeSelect.prototype.destroy = function() {
        // remove span wrapper
        this.$el.unwrap();
        // remove prepended label
        this.$label.remove();
        // remove appended arrow icon
        this.$el.next('i.icon').remove();
        // remove attached event
        this.$el.off('.fakeselect');
        
        // clear data
        this.$el.removeData(name);
        this.$el = null;
    };
    
    $.fn.fakeSelect = function(options) {
        return this.each(function() {
            new FakeSelect(this, options);
        });
    };
    
})(jQuery, document, window);