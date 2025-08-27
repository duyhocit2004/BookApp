
console.log("hello")

document.getElementById('authForm').addEventListener('submit', (e) => {

         

    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;


    console.log(username)
    document.getElementById('notificationUsername').innerHTML = "";
    document.getElementById('notificationEmail').innerHTML = "";
    document.getElementById('notificationPhone').innerHTML = "";
    document.getElementById('notificationPassword').innerHTML = "";

    let status = true
    if (username === "") {
        document.getElementById('notificationUsername').innerText = "Vui lòng nhập tên người dùng"
        document.getElementById('notificationUsername').style.color = "red"
        status = false
    }

    if (email === "") {
        document.getElementById('notificationEmail').innerText = "vui lòng nhập email"
        document.getElementById('notificationEmail').style.color = "red"
        status = false
    }

    if (phone === "") {
        document.getElementById('notificationPhone').innerText = "vui lòng nhập số điện thoại"
        document.getElementById('notificationPhone').style.color = "red"
        status = false
    }else if(phone.length < 9 || phone.length>11){
         document.getElementById('notificationPhone').innerText = "Số điện thoại phải là 10 số"
        document.getElementById('notificationPhone').style.color = "red"
        status = false
    }

    if (password === "") {
        document.getElementById('notificationPassword').innerText = "vui lòng nhập mật khẩu"
        document.getElementById('notificationPassword').style.color = "red"
        status = false
    }

    if (!status)  {
       e.preventDefault()
    }
})