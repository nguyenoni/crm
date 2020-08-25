<td >
    <a data-val="${item.id_customer}" data-toggle="modal" data-target="#modal-edit-order">${item.status ? '' :
        '<i  class="fas fa-plus-circle create-new-bill-order left" title="Tạo vận đơn"></i></a>'}</td>

<td><a value="${item.id_customer}"<i class="fas fa-cog edit-order " title="Chỉnh sửa đơn hàng"></i></a>
<a value="${item.id_customer}"<i class="far fa-trash-alt delete-order " title="Xóa đơn hàng"></i> </a></td>