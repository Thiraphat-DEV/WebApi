//declar varible
var jwt = localStorage.getItem("jwt"); //ใช้เก็บข้อมูลตัวเเปรค่าต่างๆภายในเว็๋ป
if (jwt != null) {
  window.location.href = "./index.html";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://www.mecallapi.com/api/login"); //method post and web api
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); //set body to json
  xhttp.send(
    JSON.stringify({
      //compare obj to string
      username: username,
      password: password,
    })
  );
  xhttp.onreadystatechange = () => {
    //call back function => To avoid running before running, you must first run the program.
    if (this.readyState === 4) {
      //check state true
      const object = JSON.parse(this.responseText); //parse response Text to json
      console.log(object);
      if (object[status] === "ok") {
        localStorage.setItem("jwt", object["accessToken"]); //set item of jwt and member token  for item in jwt
        Swal.fire({
          //set object
          title: object["message"],
          icon: "success",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.location.href = "./index.html";
          }
        });
      } else {
        Swal.fire(object["status"], object["message"], "error");
      }
    }
  };
  return false;
}
login();
