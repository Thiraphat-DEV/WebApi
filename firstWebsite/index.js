//declar varible
var jwt = localStorage.getItem("jwt"); //ใช้เก็บข้อมูลตัวเเปรค่าต่างๆภายในเว็๋ป
if (jwt != null) {//jwt is not null
  window.location.href = "./login.html";//link location page to login 
}


function loaduser() {
  //get userName and PassWord
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();//create XML 
  xhttp.open("POST", "https://www.mecallapi.com/api/auth/user"); //method post and web api
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); //set body to json
  xhttp.setRequestHeader("Authorization", `Bearer ${jwt}`); //set body to json
  xhttp.send(
    JSON.stringify({
      //compare username, password to string
      username: username,
      password: password,
    })
  );
  xhttp.onreadystatechange = () => {
    //call back function
    if ((this.readyState === 4)) {
      //check state true
      const object = JSON.parse(this.responseText); //parse responsetext to json
      console.log(object);
      if (object[status] == "ok") { //check status is ok or status is 200

	const user = object['user']
  //get id from html
	document.getElementById('fname').innerHTML = user['fname'];
	document.getElementById('avatar').src = user['avatar'];
	document.getElementById('user').innerHTML = user['username'];
      } else {
        Swal.fire(object["status"], object["message"], "error");//if condition is not case gave apply show error
      }
    }
  };

}
loaduser();//apply function loaduser

function logout() {
	localStorage.removeItem('jwt');// remove item in jwt checkOut localstorage 
	window.location.href = './login.html';//back location page to login
}