document.getElementById('authForm').addEventListener('submit', (e) => {
    const UserNameOrEmail = document.getElementById('UserNameOrEmail').value
    const password = document.getElementById('password').value
    const checkbox4 = document.getElementById('checkbox4');
    const checkbox5 = document.getElementById('checkbox5');

    document.getElementById('NotificationUserNameOrEmail').innerHTML = "";
    document.getElementById('Notificationpassword').innerHTML = "";
    document.getElementById('NotificationCheckbox4').innerHTML = "";
    document.getElementById('NotificationCheckbox5').innerHTML = "";

    let status = true
    if (UserNameOrEmail === "") {
        document.getElementById('NotificationUserNameOrEmail').innerText = "vui lòng nhập thông tin"
        document.getElementById('NotificationUserNameOrEmail').style.color = "red"
        status = false
    }

    if (password === "") {
        document.getElementById('Notificationpassword').innerText = "vui lòng nhập mật khẩu"
        document.getElementById('Notificationpassword').style.color = "red"
        status = false
    }

    if (!checkbox4.checked) {
        document.getElementById('NotificationCheckbox4').innerText = "vui lòng chọn chấp nhận điều khoản"
        document.getElementById('NotificationCheckbox4').style.color = "red"
        status = false
    }

    if (!checkbox5.checked) {
        document.getElementById('NotificationCheckbox5').innerText = "vui lòng chọn chấp nhận điều khoản"
        document.getElementById('NotificationCheckbox5').style.color = "red"
        status = false
    }

    if (!status) {
        e.preventDefault()
    }
})