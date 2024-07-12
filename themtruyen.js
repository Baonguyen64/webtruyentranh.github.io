$(document).ready(function() {
    $('#btnUpdate').hide();
    reloadComments();

    $('#btnSend').click(function() {
        var id = $('#id').val();
        var tentruyen = $('#tentruyen').val();
        var inputImage = $('#inputImage').val();
        var tacgia = $('#tacgia').val();
        var theloai = $('#theloai').val(); // Thêm dòng này để lấy giá trị của thể loại
        var content = $('#content').val();

        $.post("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen", {
            id: id,
            tentruyen: tentruyen,
            inputImage: inputImage,
            tacgia: tacgia,
            theloai: theloai,
            content: content
        }, function(result) {
            // Sau khi thêm thành công, reload lại danh sách truyện
            reloadComments();
            // Xóa giá trị trong các input sau khi thêm thành công
            $('#id').val('');
            $('#tentruyen').val('');
            $('#inputImage').val('');
            $('#tacgia').val('');
            $('#theloai').val('');
            $('#content').val('');
        });
    });

    $('#btnUpdate').click(function() {
        var id = $('#id').val();
        var tentruyen = $('#tentruyen').val();
        var inputImage = $('#inputImage').val();
        var tacgia = $('#tacgia').val();
        var theloai = $('#theloai').val();
        var content = $('#content').val();

        $.ajax({
            url: 'https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/' + id,
            type: 'PUT',
            data: {
                id: id,
                tentruyen: tentruyen,
                inputImage: inputImage,
                tacgia: tacgia,
                theloai: theloai,
                content: content
            },
            success: function(result) {
                // Sau khi cập nhật thành công, reload lại danh sách truyện
                reloadComments();
                // Ẩn nút cập nhật sau khi cập nhật thành công
                $('#btnUpdate').hide();
                // Xóa giá trị trong các input sau khi cập nhật thành công
                $('#id').val('');
                $('#tentruyen').val('');
                $('#inputImage').val('');
                $('#tacgia').val('');
                $('#theloai').val('');
                $('#content').val('');
            }
        });
    });
});

function deleteComment(id) {
    if (confirm("Bạn chắc chắn muốn xoá?")) {
        $.ajax({
            url: 'https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/' + id,
            type: 'DELETE',
            success: function(result) {
                // Sau khi xoá thành công, reload lại danh sách truyện
                reloadComments();
            }
        });
    }
}

function editComment(id) {
    $.get("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/" + id, function(data, status) {
        $('#id').val(data.id);
        $('#tentruyen').val(data.tentruyen);
        $('#inputImage').val(data.inputImage);
        $('#tacgia').val(data.tacgia);
        $('#theloai').val(data.theloai);
        $('#content').val(data.content);
        $('#btnUpdate').show(); // Hiển thị nút cập nhật khi bắt đầu chỉnh sửa
    });
}
function reloadComments() {
    $('#comments').empty();
    $.get("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen", function(data, status) {
        for (var i = 0; i < data.length; i++) {
            $('#comments').append("<li id='comment-" + data[i].id + "'>" + data[i].id + "." + data[i].tentruyen + " - <img src='" + data[i].inputImage + "' width='50px' height='auto'> - " + data[i].tacgia + " - " + data[i].theloai + " - " + data[i].content + " [<a href='#' onclick='deleteComment(" + data[i].id + ")'>Xoá</a>]" + " [<a href='#' onclick='editComment(" + data[i].id + ")'>Sửa</a>]" + "</li>");
        }
    });
}
