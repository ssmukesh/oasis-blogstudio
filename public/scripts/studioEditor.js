function Import(e) {
    e.preventDefault();

    $.get("/api_call/getAllBlogs", function (data) {
        console.log(data);
        var $tbody = $("#tblTbImport");
        $tbody.html("");

        progressbar(true);

        if (data.status.type === "success") {

            GL_blogHTMLData = data.status.blogData.blogs;

            var trContent = "";
            $.each(data.status.blogData.blogs, function (index, value) {
                trContent = "<tr><td>" + $.format.date(value.createdAt, "dd/MM/yyyy h:m") + "</td><td><button type='button' class='btnImport btn btn-outline-primary btn-sm' data-uniqid=" + value._id + ">Import</button></td></tr>";
                $tbody.append(trContent);
            });

            $(".btnImport").unbind("click").bind("click", function (e) {
                $this = $(this);

                var uniqueId = $this.data("uniqid");
                console.log(uniqueId);

                var result = $.grep(GL_blogHTMLData, function (e) { return e._id == uniqueId; });
                $('div#editor').froalaEditor('html.set', result[0].bloghtml);
                console.log(result);

                $('#ModalEditorWindow').modal('hide');

            });
            progressbar(false);
            $('#ModalEditorWindow').modal('show');
        }

    });

}

function ModalImport(e) {
    e.preventDefault();
    $('#ModalEditorWindow').modal('hide');
    var importedContent = $("#ModalEditor").froalaEditor('html.get');
    $('div#editor').froalaEditor('html.set', importedContent);
}

function Preview(e) {
    e.preventDefault();
    console.log("Preview");
    window.GL_editorContent = $('div#editor').froalaEditor('html.get');
    window.open("/preview");
};

function progressbar(isOpen) {

    var $modal = $('.js-loading-bar'),
        $bar = $modal.find('.progress-bar');

    if (isOpen) {
        $modal.modal('show');
    }
    else {
        $modal.modal('hide');
    }

}

function Publish(e) {
    e.preventDefault();
    console.log("Publish");
    var user_profile = $container.HelperPlugin().GetUserProfile();
    //$container.HelperPlugin().ShowHideEjWaitingPopup(true);
    GL_editorContent = $('div#editor').froalaEditor('html.get');

    var blog =
        {
            MetaTitle: "",
            MetaKeywords: "",
            MetaDescription: "",
            BlogContent: GL_editorContent,
            BlogUrl: "",
            BlogTitle: "",
            BlogKeyword: "",
            BlogThumnailUrl: "",
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
            //$container.HelperPlugin().ShowHideEjWaitingPopup(false);
            $container.HelperPlugin().showPNotifyAlert(null, {
                title: "Information",
                text: 'Blog contents are published.', type: "info"
            });
        },
        error: function (error) {
            //$container.HelperPlugin().ShowHideEjWaitingPopup(false);
            $container.HelperPlugin().showPNotifyAlert(null, {
                title: "Alert",
                text: 'Please contact the server administrator, you@example.com and inform them of the time the error occurred, and anything you might have done that may have caused the error.', type: "error"
            });
        }
    });
}

function Publish_Mongo(e) {
    e.preventDefault();
    console.log("Publish");


    progressbar(true);

    GL_editorContent = $('div#editor').froalaEditor('html.get');

    var blogData =
        {
            bloghtml: GL_editorContent,
            userid: "mukesh"
        };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(blogData),
        contentType: 'application/json',
        url: '/api_call/publishBlog',
        success: function (data) {
            progressbar(false);
            $.notify("published successfully!", "success");
            console.log(data);
        },
        error: function () {
            progressbar(false);
            $.notify("something went wrong!", "error");
            console.log('error');
        }
    });
};

$(document).ready(function () {

    $('div#editor').froalaEditor();

    $container = $("#studioContainer");
    $container.HelperPlugin({});
    $container.PNotifyPlugin({});

    $("#btnImport").unbind("click").bind("click", function (e) { Import(e); });
    $("#btnPreview").unbind("click").bind("click", function (e) { Preview(e); });
    $("#btnPublish").unbind("click").bind("click", function (e) { Publish(e); });
    $("#btnModalImport").unbind("click").bind("click", function (e) { ModalImport(e); });

    $('.js-loading-bar').modal({
        backdrop: 'static',
        show: false
    });

});

var GL_blogHTMLData = "";