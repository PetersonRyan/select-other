(function( $ ){
    $.fn.selectOther = function(triggerValue){
        if (!triggerValue) triggerValue = "Other";
        this.addClass("select-other");
        var $this = this;


        $this.each(function(){
            //Give it a random id if one doesn't exist. An id is needed to reference it after the change
            var id = $(this).prop("id");
            if (!id || id === ""){
                $(this).prop("id", Math.round((Math.random() * 10000000000)));
                id = $(this).prop("id");
            }

            //Add the other option if it isn't there yet
            if ($(this).find("[value=" + triggerValue + "]").length === 0) $(this).append("<option value='" + triggerValue + "'>" + triggerValue + "</option>");
            $('body').on('change', '#' + id, function(){
                if ($(this).val() !== triggerValue) return;

                var current = $(this).changeElementType('input');
                var parent = current.parent();
                var closeButton = current.prop('id') + "-close";
                parent.append("<span class='close-select-other' id='" + closeButton + "'>x</span>");
                closeButton = $("#" + closeButton);

                //Relative position is required for placing the x button
                parent.css("position", "relative");

                //Compute position for the x button
                var topOffset = current.position().top + parseFloat(current.css("border-top")) + ((current.innerHeight() - closeButton.height()) / 2) + parseFloat(current.css("margin-top"));
                var leftOffset = current.position().left + parseFloat(current.css("margin-left")) + parseFloat(current.innerWidth()) - 15;
                closeButton.css("left", leftOffset + "px").css("top", topOffset + "px");

                //Set back to select and remove x button on click
                closeButton.click(function(){
                    current.changeElementType("select").val($("#" + id + " option:first").val());
                    this.remove();
                });


            });
        });

        return this;
    };


    /* Adapted from an answer on StackOverflow by user https://stackoverflow.com/users/497356/andrew-whitaker */
    $.fn.changeElementType = function(newType) {
        if (!this.length) return this;
        if (this[0].tagName.toLowerCase() === newType.toLowerCase()) return this;

        //Give it a random id if one doesn't exist. An id is needed to reference it after the change
        var id = this.prop("id");
        if (!id || id === ""){
            this.prop("id", Math.round((Math.random() * 10000000000)));
            id = this.prop("id");
        }

        var attrs = {};
        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });
        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });

        return $("#" + id);
    };

})( jQuery );