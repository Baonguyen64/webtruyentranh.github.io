$(document).ready(function() {
    $('#btnAddImage').click(function() {
        var id = $('#id').val();
        var imageURL = $('#imageURL').val();

        if (id && imageURL) {
            $.get("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/" + id, function(data) {
                var hinhanh = data.hinhanh || [];
                hinhanh.push({ id: hinhanh.length + 1, url: imageURL });

                $.ajax({
                    url: 'https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/' + id,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({ hinhanh: hinhanh }),
                    success: function(result) {
                        $('#imageURL').val('');
                        reloadImages(id);
                    }
                });
            }).fail(function() {
                // Nếu truyện không tồn tại, tạo mới với ID và hình ảnh
                $.post("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen", {
                    id: id,
                    hinhanh: [{ id: 1, url: imageURL }],
                    tentruyen: "",
                    mota: "",
                    theloai: "",
                    tacgia: "",
                    inputImage: "",
                    content: ""
                }, function(result) {
                    $('#imageURL').val('');
                    reloadImages(id);
                });
            });
        } else {
            alert('Vui lòng nhập ID truyện và URL hình ảnh.');
        }
    });

    // Khi trang được tải lại, hiển thị hình ảnh của tất cả các truyện
    reloadAllImages();
});

function deleteImage(comicId, imageId) {
    $.get("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/" + comicId, function(data) {
        var hinhanh = data.hinhanh || [];
        hinhanh = hinhanh.filter(img => img.id != imageId);

        $.ajax({
            url: 'https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/' + comicId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ hinhanh: hinhanh }),
            success: function(result) {
                reloadImages(comicId);
            }
        });
    });
}

function editImage(comicId, imageId) {
    var newImageURL = prompt("Nhập URL hình ảnh mới:");
    if (newImageURL) {
        $.get("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/" + comicId, function(data) {
            var hinhanh = data.hinhanh || [];
            var imageIndex = hinhanh.findIndex(img => img.id == imageId);
            if (imageIndex > -1) {
                hinhanh[imageIndex].url = newImageURL;

                $.ajax({
                    url: 'https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/' + comicId,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({ hinhanh: hinhanh }),
                    success: function(result) {
                        reloadImages(comicId);
                    }
                });
            }
        });
    }
}

function reloadImages(id) {
    $('#comicImages').empty();
    $.get("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen/" + id, function(data) {
        var hinhanh = data.hinhanh || [];
        hinhanh.forEach(function(image) {
            $('#comicImages').append(`
                <li id="image-${image.id}">
                    <span>ID Truyện: ${id}</span>
                    <img src="${image.url}" width="100px" height="auto">
                    <button class="btn btn-danger btn-sm" onclick="deleteImage('${id}', '${image.id}')">Xoá</button>
                    <button class="btn btn-warning btn-sm" onclick="editImage('${id}', '${image.id}')">Sửa</button>
                </li>
            `);
        });
    });
}

function reloadAllImages() {
    $('#comicImages').empty();
    $.get("https://667398136ca902ae11b4afb7.mockapi.io/api/truyen", function(data) {
        data.forEach(function(comic) {
            var id = comic.id;
            var hinhanh = comic.hinhanh || [];
            hinhanh.forEach(function(image) {
                $('#comicImages').append(`
                    <li id="image-${image.id}">
                        <span>ID Truyện: ${id}</span>
                        <img src="${image.url}" width="100px" height="auto">
                        <button class="btn btn-danger btn-sm" onclick="deleteImage('${id}', '${image.id}')">Xoá</button>
                        <button class="btn btn-warning btn-sm" onclick="editImage('${id}', '${image.id}')">Sửa</button>
                    </li>
                `);
            });
        });
    });
}
