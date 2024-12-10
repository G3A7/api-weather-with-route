const login = document.getElementById("login");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const eye = document.getElementById("eye");
const eyeSlash = document.getElementById("eye-slash");
// console.log(eye, eyeSlash);
const inputs = document.querySelectorAll(".col-md-4 input");
// console.log(inputs)
const regex = {
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  pass: /^.{6,10}$/,
};
// console.log(localStorage.getItem("userLogin"))
let arrLogin = JSON.parse(localStorage.getItem("userLogin"));
if (!localStorage.getItem("userLogin")) {
  arrLogin = [];
}
eye.addEventListener("click", (e) => {
  pass.setAttribute("type", "text");
  eyeSlash.classList.replace("d-none", "d-block");
  eye.classList.replace("d-block", "d-none");
});
eyeSlash.addEventListener("click", (e) => {
  pass.setAttribute("type", "password");

  eyeSlash.classList.replace("d-block", "d-none");
  eye.classList.replace("d-none", "d-block");
});
inputs.forEach((e) => {
  e.addEventListener("input", (e) => {
    validationsInput(e.target);
  });
});

login.addEventListener("click", () => {
  if (CheckValidation()) {
    let objData = {
      // name: name.value,
      email: email.value,
      pass: pass.value,
    };
    const validUser = arrLogin.find((e) => {
      return e.email == objData.email;
    });
    // const Index = arrLogin.findIndex((e) => {
    //   return e.email == objData.email;
    // });
    console.log(validUser);
    if (validUser) {
      if (validUser.pass == objData.pass) {
        location.assign(`./home.html?idx=${validUser.id}`);
      } else {
        pass.classList.add("is-invalid");
        Swal.fire({
          html: `<div class="box">
              <div class="box-header">
                  <div class="circle">
                      <span></span>
                      <span></span>
                      <span></span>
                  </div>
                  <div class="box-body text-start   pt-4">
                      <ul class=' w-75 mt-5 mx-auto text-center'>
                          <li class='text-nowrap'>
                             <strong>Pass:</strong> <i class='text-danger'>Wrong</i> 
                          </li>
                          
                      </ul>
                  </div>
              </div>
            </div>`,
        });
      }
    } else {
      Swal.fire({
        html: `<div class="box">
          <div class="box-header">
              <div class="circle">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              <div class="box-body text-start   pt-4">
                  <ul class=' w-75 mt-5 mx-auto text-center'>
                      <li class='text-nowrap'>
                         <strong>Email:</strong> <i class='text-danger'>Is Already </i> 
                      </li>
                      
                  </ul>
              </div>
          </div>
        </div>`,
      });
    }
  } else {
    Swal.fire({
      html: `<div class="box">
    <div class="box-header">
        <div class="circle">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="box-body text-start   pt-4">
            <ul class=' w-75 mt-5 mx-auto'>
              
                 <li  class='text-nowrap'>
                   <strong>Email:</strong> <i class='text-danger'>Exampl@gmail.com</i> 
                </li>
                <li  class='text-nowrap'>
                   <strong>Password:</strong> <i class='text-danger'>must be more than 6</i> 
                </li>
            </ul>
        </div>
    </div>
  </div>`,
    });
  }
});

function validationsInput(el) {
  if (regex[el.id].test(el.value)) {
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    return true;
  } else {
    el.classList.remove("is-valid");
    el.classList.add("is-invalid");
    return false;
  }
}
function CheckValidation() {
  let flag = true;

  if (!validationsInput(email)) {
    flag = false;
  }
  if (!validationsInput(pass)) {
    flag = false;
  }
  //    validationsInput(name) && validationsInput(email) && validationsInput(pass);
  return flag;
}
``;
