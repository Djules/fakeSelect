/**
 * Custom jQuery plugin to add style to select widget
 * version: 1.0 (2013-09-12)
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
        var self = this;
        
        // transform element
        this.transform();
        
        // add change event
        this.$el.on('change', function(e) {
            self.updateLabel();
        });
    };
    
    FakeSelect.prototype.transform = function() {
        var self = this;
        
        // get selected value as label if custom label is not defined
        var label = this.options.label || this.$el.find(':selected').text();
        
        // transform <select> with other DOM elements
        this.$el
            // wrap with a span
            .wrap(function() {
                var classnames = self.options['class'];
                if (self.$el.attr('class'))
                    classnames += ' ' + self.$el.attr('class');
                    
                return '<span class="' + classnames + '" />';
            })
            // prepend label into span before select
            .before('<span class="' + this.options['class'] + '-label">' + label + '</span>')
            // append arrow icon after select
            .after('<i class="icon icon-arrow-down"></i>')
    };
    
    FakeSelect.prototype.updateLabel = function() {
        this.$el.prev().text(
            this.$el.find(':selected').text()
        );
    };
    
    FakeSelect.prototype.destroy = function() {
        // remove span wrapper
        this.$el.unwrap();
        // remove prepended label
        this.$el.prev('span').remove();
        // remove appended arrow icon
        this.$el.next('i.icon').remove();
        // remove attached event
        this.$el.off('change');
        
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