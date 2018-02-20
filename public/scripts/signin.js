/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    var // plugin name
        pluginName = "UserPlugin",
        // key using in $.data()
        dataKey = "plugin_" + pluginName;

    var Plugin = function (element, options) {
        this.element = element;

        this.options = {
            // default options
            container: "",
            homeContainer: ""
        };

        this.options.homeContainer = $("#homeContainer");
        this.options.container = element;
        this.init(options);
    };

    function _login(options) {

        var userInfo = { email: $("#inputEmail").val(), password: $("#inputPassword").val() };

        options.container.HelperPlugin().ShowHideEjWaitingPopup(true);

        try {

            var body = {
                grant_type: 'password',
                username: userInfo.email,
                password: userInfo.password
            };

            $.ajax({
                type: 'POST',
                data: body,
                cache: false,
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                url: JSON_APP_CONFIG.issuer + JSON_APP_CONFIG.endpoint.authorization,
                complete: function (result) {
                },
                success: function (data) {
                    options.container.HelperPlugin().ShowHideEjWaitingPopup(false);
                    options.container.HelperPlugin().SetUserProfile(options, data);
                    options.container.HelperPlugin().redirect_studio();
                },
                error: function (error) {
                    options.container.HelperPlugin().ShowHideEjWaitingPopup(false);
                    options.container.HelperPlugin().showPNotifyAlert(options, {
                        title: "Having Trouble Signing On?",
                        text: 'You have entered an incorrect email or Password. Please enter your information again.', type: "error"
                    });
                }
            });

        }
        catch (error) {
            options.container.HelperPlugin().redirect_signout();
        }

    };

    function _registerEvents(options) {

        try {
            $("#loginForm").submit(function (event) {
                event.preventDefault();
                _login(options);
            });
        }
        catch (error) {
            options.container.HelperPlugin().redirect_signout();
        }

    };

    Plugin.prototype = {
        // initialize options
        init: function (options) {
            $.extend(this.options, options);
            _registerEvents(this.options);
            this.options.container.HelperPlugin().InitEjWaitingPopup(this.options.homeContainer);
        },
    };

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * return plugin instance.
     */
    $.fn[pluginName] = function (options) {

        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if (plugin instanceof Plugin) {
            // if have options arguments, call plugin.init() again
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Plugin(this, options);
            this.data(dataKey, plugin);
        }

        return plugin;
    };

}(jQuery, window, document));