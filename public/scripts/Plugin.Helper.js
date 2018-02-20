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
        pluginName = "HelperPlugin",
        // key using in $.data()
        dataKey = "plugin_" + pluginName;

    var Plugin = function (element, options) {
        this.element = element;

        this.options = {
            container: "",
            notifySettings: "",
            loadingModal: "",
            ejWaitingPopup_container: "",
            userProfile: {
                PKGuid: "",
                grant_access_token: ""
            }
        };

        this.options.container = element;

        this.init(options);
    };

    function _configureModalLoading(options) {
        var modalLoading = `<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard=false role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">                    
                    <div class="modal-body">
                        <div class="progress">
                          <div class="progress-bar progress-bar-striped bg-warning progress-bar-animated active" role="progressbar"
                          aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%; height: 40px">
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        $(document.body).append(modalLoading);
        options.loadingModal = $("#pleaseWaitDialog");
    }

    function _showHideModalLoading(options, isShow) {
        if (isShow) {
            options.loadingModal.modal("show");
        }
        else {
            options.loadingModal.modal("hide");
        }
    }

    function _init_ejWaitingPopup(options) {
        options.ejWaitingPopup_container.ejWaitingPopup({
            showOnInit: false,
            showImage: true,
            text: "Please wait..."
        });
    }

    function _show_hide_ejWaitingPopup(options, isShow) {
        if (isShow) {
            // var erData = options.ejWaitingPopup_container.data("ejWaitingPopup").show();
            // erData.show();
            options.ejWaitingPopup_container.data("ejWaitingPopup").show();
        }
        else {
            options.ejWaitingPopup_container.data("ejWaitingPopup").hide();
        }
    }

    function _setUserProfile(options, data) {
        localStorage.setItem('user_grant', data.access_token);
        localStorage.setItem('user_PKID', data.PKGuid);
    }

    function _getUserProfile(options) {
        options.userProfile.PKGuid = localStorage.getItem('user_PKID');
        options.userProfile.grant_access_token = localStorage.getItem('user_grant');

        return options.userProfile;
    }



    Plugin.prototype = {
        // initialize options
        init: function (options) {
            $.extend(this.options, options);
            _configureModalLoading(this.options);
        },
        redirect_signout: function (options) {
            window.location = "/signout";
        },
        redirect_dashboard: function (options) {
            window.location = "/admin/dashboard";
        },
        redirect_masterdetails_cusines: function (options) {
            window.location = "/lookup/cuisines";
        },
        redirect_studio: function (options) {
            window.location = "/studio/editor";
        },
        redirect_login: function (options) {
            window.location = "/";
        },
        showPNotifyAlert: function (options, notifySettings) {
            this.options.notifySettings = notifySettings;
            this.options.container.PNotifyPlugin().showStack_bar_top(this.options.notifySettings);
        },
        Loading: function (options, isShow) {
            _showHideModalLoading(this.options, isShow);
        },
        InitEjWaitingPopup: function (ejWaitingPopup_container) {
            this.options.ejWaitingPopup_container = ejWaitingPopup_container;
            _init_ejWaitingPopup(this.options, ejWaitingPopup_container);
        },
        ShowHideEjWaitingPopup: function (isShow) {
            _show_hide_ejWaitingPopup(this.options, isShow);
        },
        SetUserProfile: function (options, data) {
            _setUserProfile(this.options, data);
        },
        GetUserProfile: function (options) {
            return _getUserProfile(this.options);
        }
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