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
        pluginName = "ViewEditorPlugin",
        // key using in $.data()
        dataKey = "plugin_" + pluginName;



    var Plugin = function (element, options) {
        this.element = element;

        this.options = {
            homeContainer: "",
            container: "",
            editorTab: "",
            tabdrafts: "",
            tabeditor: "",
            gridDraft: "",
            wysiwygeditor: "",
            draftBlogEntity: "",
            draftBlogEJModel: [],
            draftBlogMapping: "",
            blogAccordion: ""
        };

        this.options.homeContainer = $("#homeContainer");
        this.options.container = element;
        this.options.editorTab = element.find("#editorTab");
        this.options.tabdrafts = element.find("#tabdrafts");
        this.options.tabeditor = element.find("#tabeditor");
        this.options.gridDraft = element.find("#gridDraft");
        this.options.blogAccordion = element.find("#blogAccordion");
        this.options.wysiwygeditor = element.find("#wysiwygeditor");

        this.init(options);
    };

    function _ejAccordion(options) {
        options.blogAccordion.ejAccordion({ enableMultipleOpen: true });
    }

    function _configureMasterTab(options) {
        options.editorTab.ejTab({ headerPosition: "top" });
    }
    function _configureWYSIWYGeditor(options) {
        options.wysiwygeditor.froalaEditor();
    }

    function _API_GetblogDrafts(options, isSoftRefresh) {

        var user_profile = options.container.HelperPlugin().GetUserProfile();

        var blog = {
            FkUserId: user_profile.PKGuid
        };

        options.container.HelperPlugin().ShowHideEjWaitingPopup(true);

        $.ajax({
            url: JSON_APP_CONFIG.issuer + JSON_APP_CONFIG.endpoint.GetAllDraftBlog,
            type: 'POST',
            cache: false,
            data: blog,
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + user_profile.grant_access_token);
            },
            success: function (data) {
                options.container.HelperPlugin().ShowHideEjWaitingPopup(false);
                options.draftBlogEntity = data;
                _map_draftBlogEntity_draftBlogEJModel(options);
                options.editorTab.ejTab({ selectedItemIndex: 0 });
                if (isSoftRefresh) {
                    //var model = options.gridDraft.ejGrid("model");
                    //model.dataSource = options.draftBlogEJModel;
                    //var gridObj = options.gridDraft.data("ejGrid");
                    //gridObj.refreshContent(); // Refreshes the grid contents only
                    //gridObj.refreshContent(true);
                    //options.gridDraft.ejGrid("refreshContent");
                    //gridObj.sendRefreshRequest();
                    _loadDraftBlogGrid(options);
                }
                else {
                    _loadDraftBlogGrid(options);
                }
            },
            error: function (error) {
                options.container.HelperPlugin().ShowHideEjWaitingPopup(false);
                options.container.HelperPlugin().showPNotifyAlert(null, {
                    title: "Alert",
                    text: 'Please contact the server administrator, you@example.com and inform them of the time the error occurred, and anything you might have done that may have caused the error.', type: "error"
                });
            }
        });
    }

    function _map_draftBlogEntity_draftBlogEJModel(options) {
        var draftBlogModel = {};
        options.draftBlogEJModel = [];

        _.forEach(options.draftBlogEntity, function (value, key) {

            draftBlogModel = {
                PkId: "",
                MetaTitle: "",
                MetaKeywords: "",
                MetaDescription: "",
                BlogContent: "",
                BlogUrl: "",
                BlogTitle: "",
                BlogKeyword: "",
                BlogThumnailUrl: "",
                Active: "",
                Modified: "",
                PkGuid: "",
                FkUserId: ""
            };

            if (!_.isUndefined(value.PkId)) { draftBlogModel.PkId = value.PkId; }
            if (!_.isUndefined(value.MetaTitle)) { draftBlogModel.MetaTitle = value.MetaTitle; }
            if (!_.isUndefined(value.MetaKeywords)) { draftBlogModel.MetaKeywords = value.MetaKeywords; }
            if (!_.isUndefined(value.MetaDescription)) { draftBlogModel.MetaDescription = value.MetaDescription; }
            if (!_.isUndefined(value.BlogContent)) { draftBlogModel.BlogContent = value.BlogContent; }
            if (!_.isUndefined(value.BlogUrl)) { draftBlogModel.BlogUrl = value.BlogUrl; }
            if (!_.isUndefined(value.BlogTitle)) { draftBlogModel.BlogTitle = value.BlogTitle; }
            if (!_.isUndefined(value.BlogKeyword)) { draftBlogModel.BlogKeyword = value.BlogKeyword; }
            if (!_.isUndefined(value.BlogThumnailUrl)) { draftBlogModel.BlogThumnailUrl = value.BlogThumnailUrl; }
            if (!_.isUndefined(value.Active)) { draftBlogModel.Active = value.Active; }
            if (!_.isUndefined(value.Modified)) { draftBlogModel.Modified = $.formatDateTime('dd/mm/y g:ii a', new Date(value.Modified)); }
            if (!_.isUndefined(value.PkGuid)) { draftBlogModel.PkGuid = value.PkGuid; }
            if (!_.isUndefined(value.FkUserId)) { draftBlogModel.FkUserId = value.FkUserId; }

            options.draftBlogEJModel.push(draftBlogModel);

        });
    }

    function _loadDraftBlogGrid(options) {
        options.gridDraft.ejGrid({
            dataSource: options.draftBlogEJModel,
            allowPaging: true,
            isResponsive: true,
            allowSorting: true,
            allowMultiSorting: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.PdfExport] },
            gridLines: ej.Grid.GridLines.Horizontal,
            filterSettings: { showFilterBarStatus: true, statusBarWidth: 500 },
            allowResizing: true,
            allowScrolling: true,
            scrollSettings: { width: '100%', height: '100%' },
            pageSettings: { pageSize: 10 },
            enableHeaderHover: true,
            filterSettings: { filterType: "menu" },
            allowTextWrap: true,
            columns: [
                { field: "PkId", headerText: "PkId", isPrimaryKey: true, textAlign: ej.TextAlign.Right, width: 10, visible: false },
                { field: "MetaTitle", headerText: "Meta Title", textAlign: ej.TextAlign.Right },
                { field: "MetaKeywords", headerText: "Meta Keywords", textAlign: ej.TextAlign.Left },
                { field: "MetaDescription", headerText: "Meta Description", textAlign: ej.TextAlign.Right },
                { field: "BlogUrl", headerText: "Blog Url", textAlign: ej.TextAlign.Right },
                { field: "BlogTitle", headerText: "Blog Title", textAlign: ej.TextAlign.Right },
                { field: "BlogKeyword", headerText: "Blog Keyword", textAlign: ej.TextAlign.Right },
                { field: "BlogThumnailUrl", headerText: "Blog ThumnailUrl", textAlign: ej.TextAlign.Right },
            ],
            toolbarClick: function (e) {
                this.exportGrid = this["export"];
                if (e.itemName == "Excel Export") {
                    //this.exportGrid(window.baseurl + 'api/grid/ExcelExport')
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
                else if (e.itemName == "Word Export") {
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
                else if (e.itemName == "PDF Export") {
                    options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome export option is coming very soon.", type: "info" });
                    e.cancel = true;
                }
            },
            queryCellInfo: function (args) {
                //Add attributes to cells in queryCellInfo 
                $(args.cell).attr({
                    "data-toggle": "tooltip",
                    "data-container": "body",
                    "title": args.data[args.column.field]
                });
            },
            dataBound: function (args) {
                //Render tooltip in dataBound event.
                $("[data-toggle=tooltip]").tooltip();
            }
        });
    }

    function _saveDraftBlog(options) {

        var user_profile = options.container.HelperPlugin().GetUserProfile();
        options.container.HelperPlugin().ShowHideEjWaitingPopup(true);
        var GL_editorContent = $("#wysiwygeditor").froalaEditor('html.get');

        var blog =
            {
                MetaTitle: $("#txtMetaTitle").val(),
                MetaKeywords: $("#txtMetaKeyword").val(),
                MetaDescription: $("#txtMetaDescription").val(),
                BlogContent: GL_editorContent,
                BlogUrl: $("#txtBlogURL").val(),
                BlogTitle: $("#txtBlogTitle").val(),
                BlogKeyword: $("#txtBlogKeyword").val(),
                BlogThumnailUrl: $("#txtBlogThumbURL").val(),
                FkUserId: user_profile.PKGuid
            };

        $.ajax({
            url: JSON_APP_CONFIG.issuer + JSON_APP_CONFIG.endpoint.UpsertBlog,
            type: 'POST',
            cache: false,
            data: blog,
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + user_profile.grant_access_token);
            },
            success: function (data) {
                options.container.HelperPlugin().ShowHideEjWaitingPopup(false);
                options.container.HelperPlugin().showPNotifyAlert(null, {
                    title: "Information",
                    text: 'Blog contents are published.', type: "info"
                });
                _API_GetblogDrafts(options, true);
            },
            error: function (error) {
                options.container.HelperPlugin().ShowHideEjWaitingPopup(false);
                options.container.HelperPlugin().showPNotifyAlert(null, {
                    title: "Alert",
                    text: 'Please contact the server administrator, you@example.com and inform them of the time the error occurred, and anything you might have done that may have caused the error.', type: "error"
                });
            }
        });
    }

    function _registerEvents(options) {

        try {
            $("#btnblogSave").unbind("click").bind("click", function (event) {
                event.preventDefault();
                _saveDraftBlog(options);
            });
            $("#btnblogDiscard").unbind("click").bind("click", function (event) {
                event.preventDefault();
                options.container.HelperPlugin().showPNotifyAlert(options, { title: "Coming soon...", text: "An awesome discard option is coming very soon.", type: "info" });
            });
        }
        catch (error) {
            options.container.HelperPlugin().showPNotifyAlert(null, {
                title: "Alert",
                text: 'Please contact the server administrator, you@example.com and inform them of the time the error occurred, and anything you might have done that may have caused the error.', type: "error"
            });
        }

    };

    Plugin.prototype = {
        // initialize options
        init: function (options) {
            $.extend(this.options, options);
            this.options.container.HelperPlugin().InitEjWaitingPopup(this.options.homeContainer);
            _configureMasterTab(this.options);
            _ejAccordion(this.options);
            _registerEvents(this.options);
            _configureWYSIWYGeditor(this.options);
            _API_GetblogDrafts(this.options, false);
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