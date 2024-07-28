// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable F12 key
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J')) {
        e.preventDefault();
    }
});
//Disable  Ctrl U
window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'u') {
        alert('Chức năng này đã bị chặn!');
        location.reload(); // Tải lại trang để ngăn chặn xem mã nguồn
        event.preventDefault();
    }
});
//Disable  Ctrl Shift i
window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'i') {
        alert('Chức năng này đã bị chặn!');
        location.reload(); // Tải lại trang để ngăn chặn mở Developer Tools
        event.preventDefault();
    }
});

function cleanPhoneNumber() {
    // Lấy giá trị từ input
    var phoneNumber = document.getElementById('phoneNumberInput').value;

    // Loại bỏ tất cả các ký tự không phải là số
    var cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    // Xử lý các trường hợp đặc biệt
    if (cleanedPhoneNumber.length <= 8) {
        // Nếu số không bắt đầu bằng số 0, thêm số 0 vào đầu
        if (!cleanedPhoneNumber.startsWith("0")) {
            cleanedPhoneNumber = "0" + cleanedPhoneNumber;
        }
        // Thêm số 0 vào phía sau cho đến khi đủ 10 chữ số
        while (cleanedPhoneNumber.length < 10) {
            cleanedPhoneNumber += "0";
        }
    } else if (cleanedPhoneNumber.length == 9) {
        // Nếu số bắt đầu bằng số 0, thêm số 0 vào cuối
        if (cleanedPhoneNumber.startsWith("0")) {
            cleanedPhoneNumber += "0";
        } else {
            // Nếu số không bắt đầu bằng số 0, thêm số 0 vào đầu
            cleanedPhoneNumber = "0" + cleanedPhoneNumber;
        }
    }
    return cleanedPhoneNumber;
}

function calculateQue(part) {
    var div = Math.floor(parseInt(part) / 8);
    var mul = div * 8;
    return parseInt(part) - mul;
}

function calculateFinalQue(phoneNumber) {
    var part1 = parseInt(phoneNumber.substring(0, 5));
    var part2 = parseInt(phoneNumber.substring(5));
    var sum = part1 + part2;
    var div = Math.floor(sum / 6);
    var mul = div * 6;
    return sum - mul;
}

function tinhQue() {
    var phoneNumber = document.getElementById('phoneNumberInput').value;

    // Kiểm tra nếu phoneNumber rỗng thì không thực hiện tính toán
    if (phoneNumber === '') {
        showError('Vui lòng nhập số điện thoại để tính toán.');
        return;
    }
    var demsokytu = phoneNumber.replace(/[^0-9]/g, '');
    var regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/; 

    if (!regex.test(demsokytu)) {
        showError('Có vẻ đây không phải số điện thoại!');
    }
    var cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);

    var que1 = calculateQue(cleanedPhoneNumber.substring(0, 5));
    var que2 = calculateQue(cleanedPhoneNumber.substring(5));
    var que3 = calculateFinalQue(cleanedPhoneNumber);

    if(que1 === 0){
        que1 = 8;
    }
    if(que2 === 0){
        que2 = 8;
    }
    if(que3 === 0){
        que3 = 6;
    }

    // Gán giá trị đã làm sạch và que vào các input tương ứng

    // Gán giá trị đã làm sạch vào input có id là cleanedPhoneNumberInput
    document.getElementById('cleanedPhoneNumberInput').value = cleanedPhoneNumber;
    document.getElementById('que1Input').value = que1;
    document.getElementById('que2Input').value = que2;
    document.getElementById('que3Input').value = que3;

    // Cập nhật hình ảnh dựa trên kết quả quẻ 1 và quẻ 2
    const que1Image = document.getElementById('que1Image');
    que1Image.src = `/que${que1 === 0 ? 8 : que1}.png`;
    que1Image.classList.remove('hidden');

    const que2Image = document.getElementById('que2Image');
    que2Image.src = `/que${que2 === 0 ? 8 : que2}.png`;
    que2Image.classList.remove('hidden');
}

function cleanPhoneNumber(phoneNumber) {
    // Kiểm tra nếu phoneNumber không phải là chuỗi, chuyển đổi sang chuỗi
    if (typeof phoneNumber !== 'string') {
        phoneNumber = phoneNumber.toString();
    }    
    var cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    if (cleanedPhoneNumber.length <= 8) {
        if (!cleanedPhoneNumber.startsWith("0")) {
            cleanedPhoneNumber = "0" + cleanedPhoneNumber;
        }
        while (cleanedPhoneNumber.length < 10) {
            cleanedPhoneNumber += "0";
        }
    } else if (cleanedPhoneNumber.length == 9) {
        if (cleanedPhoneNumber.startsWith("0")) {
            cleanedPhoneNumber += "0";
        } else {
            cleanedPhoneNumber = "0" + cleanedPhoneNumber;
        }
    }

    return cleanedPhoneNumber;
}

function calculateQue(part) {
    var div = Math.floor(parseInt(part) / 8);
    var mul = div * 8;
    return parseInt(part) - mul;
}

function calculateFinalQue(phoneNumber) {
    var part1 = parseInt(phoneNumber.substring(0, 5));
    var part2 = parseInt(phoneNumber.substring(5));
    var sum = part1 + part2;
    var div = Math.floor(sum / 6);
    var mul = div * 6;
    return sum - mul;
}

var canReadFile = true; // Biến cờ để kiểm tra trạng thái có thể đọc file hay không

function readExcel() {
    var fileInput = document.getElementById('excelFileInput');
    var file = fileInput.files[0];
  
    if (!file) {
      // Nếu không có file được chọn, hiển thị thông báo lỗi
      var fileSelectError = document.getElementById('fileSelectError');
      fileSelectError.style.display = 'block';
      return; // Dừng lại và không thực hiện đọc file
    }

    if (!canReadFile) {
        console.log('Vui lòng đợi 7 giây trước khi đọc file tiếp.');
        return;
    }

    var fileSelectError = document.getElementById('fileSelectError');
    fileSelectError.style.display = 'none';
    // Nếu có file được chọn, tiến hành đọc file
    var reader = new FileReader();

    var countdown = 7; // Đếm ngược ban đầu là 7 giây

    // Thay đổi nội dung nút và disable nút
    var readExcelButton = document.getElementById('readExcelButton');
    readExcelButton.classList.add('disabled');
    var countdownDisplay = document.getElementById('countdownDisplay');
    countdownDisplay.textContent = countdown;

    var countdownInterval = setInterval(function() {
        countdown--;
        countdownDisplay.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = 'Đọc file'; // Hoàn thành đếm ngược, phục hồi nội dung ban đầu
            readExcelButton.classList.remove('disabled'); // Cho phép nhấp vào lại
        }
    }, 1000); // Cập nhật mỗi giây

    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        var excelData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        // Kiểm tra xem excelData có rỗng không
        if (excelData.length === 0) {
            showError("Tệp Excel không có dữ liệu.");
            return;
        }

        displayExcelData(excelData);

        // Sau khi đọc file, đặt biến cờ là false
        canReadFile = false;

        // Đặt lại biến cờ thành true sau 7 giây
        setTimeout(function() {
            canReadFile = true;
        }, 7000); // 7000 milliseconds = 7 seconds
    };

    reader.readAsArrayBuffer(file);
}

function displayExcelData(excelData) {
    var tbody = document.getElementById('excelDataBody');
    tbody.innerHTML = '';

    for (var i = 0; i < excelData.length; i++) {
        var row = document.createElement('tr');
        var regex = /[a-zA-Z]/;
        // Kiểm tra nếu excelData[i] không tồn tại hoặc là mảng rỗng
        if (!excelData[i] || excelData[i].length === 0) {
            showError(`Hàng ` + (i + 1) + ' trống');
            continue;
        }
        var phoneNumber = excelData[i][1];

        // Kiểm tra nếu phoneNumber là undefined, null hoặc chuỗi rỗng
        if (!phoneNumber) {
            phoneNumber = excelData[i][0];
        }
        // Kiểm tra nếu phoneNumber không phải là chuỗi, chuyển đổi sang chuỗi
        if (typeof phoneNumber !== 'string') {
            phoneNumber = phoneNumber.toString();
        }

        if (regex.test(phoneNumber)) {
            showError(`Số điện thoại không hợp lệ | Hàng: ` + (i + 1));
            continue;
        }

        var cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);
        if (cleanedPhoneNumber.length < 10) {
            // Nếu số điện thoại không hợp lệ, hiển thị thông báo lỗi và bỏ qua hàng này
            showError(`Số điện thoại không hợp lệ: ${cleanedPhoneNumber} Hàng: ` + (i + 1));
            continue;
        }

        var que1 = calculateQue(cleanedPhoneNumber.substring(0, 5));
        var que2 = calculateQue(cleanedPhoneNumber.substring(5));
        var que3 = calculateFinalQue(cleanedPhoneNumber);

        if(que1 === 0){
            que1 = 8;
        }
        if(que2 === 0){
            que2 = 8;
        }
        if(que3 === 0){
            que3 = 6;
        }
        
        var que = '' + que1 + que2 + que3;
        var phonePrice = excelData[i][2];
        if(phonePrice<1000){
            gia = 0 ;
        }else{
            var gia = formatNumber(phonePrice); // Giá có thể tính toán thêm nếu cần
        }

        var rowData = [
            phoneNumber,
            cleanedPhoneNumber,
            que1,
            que2,
            que3,
            que,
            gia
        ];

        rowData.forEach(function (cellData) {
            var td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });

        tbody.appendChild(row);

    }
}

function formatNumber(number) {
    // Kiểm tra xem number có phải là một số hay không
    if (!isNaN(number)) {
        //return Number(number).toLocaleString('en-US')
        return number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });;
    }
    return number; // Trả lại giá trị gốc nếu không phải là số
}

function showError(message) {
    var toastContainer = document.getElementById('toastContainer');

    // Tạo một toast mới
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    // Hiển thị thời gian hiện tại trong toast
    const currentTime = new Date().toLocaleTimeString();

    // Thêm nội dung cho toast
    toast.innerHTML = `
        <div class="toast-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <strong class="me-auto ms-2">Lỗi</strong>
            <small class="text-muted">${currentTime}</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
    `;

    // Thêm toast vào container
    toastContainer.appendChild(toast);

    // Hiển thị toast
    var bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}


function convertTableToSheet(table) {
    var worksheet = XLSX.utils.table_to_sheet(table);

    // Duyệt qua các hàng và chuyển đổi cột thứ 2 thành chuỗi
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    for (var R = range.s.r + 1; R <= range.e.r; ++R) {
        var cell_address = { c: 1, r: R }; // Cột thứ 2 (B)
        var cell_ref = XLSX.utils.encode_cell(cell_address);
        if (worksheet[cell_ref] && worksheet[cell_ref].t === 'n') {
            worksheet[cell_ref].t = 's'; // Chuyển đổi thành chuỗi
        }
    }
    return worksheet;
}
function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    var tableSelect = document.getElementById(tableID);

    // Tạo tệp Excel với dữ liệu đã chuyển đổi
    var worksheet = convertTableToSheet(tableSelect);
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Xuất tệp Excel
    var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    var data = new Blob([excelBuffer], { type: dataType });

    // Tạo liên kết để tải tệp
    downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(data);
    downloadLink.download = filename ? filename + '.xlsx' : 'excel_data.xlsx';

    // Kích hoạt tải tệp
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

document.getElementById('searchInput').addEventListener('input', function() {
    searchByQue();
});

function searchByQue() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var table = document.getElementById('dataTable');
    var rows = table.getElementsByTagName('tr');

    for (var i = 1; i < rows.length; i++) { // Bắt đầu từ i = 1 để bỏ qua hàng đầu tiên (tiêu đề)
        var cell = rows[i].getElementsByTagName('td')[5]; // Chỉ tìm kiếm trong cột Quẻ (cột thứ 6)

        if (cell) {
            var textValue = cell.textContent || cell.innerText;
            if (textValue.toLowerCase().includes(input)) {
                rows[i].style.display = ''; // Hiển thị hàng nếu có kết quả tìm thấy
            } else {
                rows[i].style.display = 'none'; // Ẩn hàng nếu không có kết quả tìm thấy
            }
        }
    }

    // Hiển thị lại tất cả các hàng nếu ô tìm kiếm rỗng
    if (input === '') {
        for (var i = 1; i < rows.length; i++) {
            rows[i].style.display = '';
        }
    }
}

