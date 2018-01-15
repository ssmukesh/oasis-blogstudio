function Import(e) {
    e.preventDefault();

    $.get("/api_call/blogHTMLWithImageVideo", function (data) {
        if (data.bloghtml) {
            $('#ModalEditor').froalaEditor('html.set', data.bloghtml);
        }
        $('#ModalEditorWindow').modal('show');
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

function Publish(e) {
    e.preventDefault();
    console.log("Publish");

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
            console.log(data);
        },
        error: function () {
            console.log('error');
        }
    });
};

$(document).ready(function () {

    $('div#editor').froalaEditor();
    $("#ModalEditor").froalaEditor();

    $("#btnImport").unbind("click").bind("click", function (e) { Import(e); });
    $("#btnPreview").unbind("click").bind("click", function (e) { Preview(e); });
    $("#btnPublish").unbind("click").bind("click", function (e) { Publish(e); });
    $("#btnModalImport").unbind("click").bind("click", function (e) { ModalImport(e); });

});