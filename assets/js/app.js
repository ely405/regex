var regFirstCapLet = /^[A-Z][a-z]+$/;
var regDni = /^\d{8}$/;
var regCellPhone = /^[9]\d{8}$/;
var regPhone = /^\d{7}$/;
var regPass = /^\S{6}$/;
// var regYear = /^\d{2}$/;

var name1 = document.getElementById("name")
var dni = document.getElementById("dni");
var date = document.getElementById("date");
var cellPhone = document.getElementById("cellphone");
var phone = document.getElementById("phone");
var pass = document.getElementById("pass");
var pass2 = document.getElementById("pass-2");
var comment = document.getElementById("comment");
var termCond = document.getElementById("term-cond");

function createTooltip(parentElement, errorMessage){
    if(parentElement.lastElementChild.getAttribute("class") =="tooltiptext") {
      parentElement.lastElementChild.innerHTML = errorMessage;
      parentElement.lastElementChild.style.display = "block";
    } else {
      var span = document.createElement("span");
      span.innerText = errorMessage;
      span.classList.add("tooltiptext");
      parentElement.append(span);
    }
  }

function validateEachInput(regEx, errorText){
    var input = event.target;
    var elemParent = input.parentElement;
    if(!regEx.test(input.value)){
      createTooltip(elemParent, errorText);
    }else if(elemParent.lastElementChild.getAttribute("class") == "tooltiptext") {
      elemParent.lastElementChild.style.display = "none";
    }
}

function calculateAge(birthDate){
    var today = new Date();
    var birth = new Date(birthDate);
    var age = today.getFullYear() - birth.getFullYear();
    var month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())){
        age--;
    }
    return age;
}


function isAdult(dateOfBirth, errorMess){
  var parent = event.target.parentElement;
  if(calculateAge(dateOfBirth) < 18 || event.target.value == ""){
    createTooltip(parent, errorMess);
  }else if(parent.lastElementChild.getAttribute("class") == "tooltiptext") {
    parent.lastElementChild.style.display = "none";
  }
}

function validateSamePass(firstP, secondP, errorMessage){
  var parent = event.target.parentElement;
  if(firstP !== secondP){
    createTooltip(parent, errorMessage);
  }else if(parent.lastElementChild.getAttribute("class") == "tooltiptext") {
    parent.lastElementChild.style.display = "none";
  }
}

function validateCheckBox(errorMessage) {
    var parent = event.target.parentElement;
    if(termCond.checked == false){
      createTooltip(parent, errorMessage);
    }else if(parent.lastElementChild.getAttribute("class") == "tooltiptext") {
      parent.lastElementChild.style.display = "none";
    }
}

window.addEventListener("load", function(){
  name1.addEventListener("blur", function(){
    validateEachInput(regFirstCapLet, "Primera letra en maýuscula");
  });

  dni.addEventListener("blur", function(){
    validateEachInput(regDni, "Ingresa formato correcto");
  })

  date.addEventListener("blur", function(){
    isAdult(date.value, "Eres menor de edad, aún no puedes enviar el mensaje");
  })

  cellPhone.addEventListener("blur", function(){
    validateEachInput(regCellPhone, "Ingresa formato correcto");
  });

  phone.addEventListener("blur", function(){
    validateEachInput(regPhone, "Ingresa formato correcto");
  });

  pass.addEventListener("blur", function(){
    validateEachInput(regPass, "Mínimo 6 carácteres");
  });

  pass2.addEventListener("blur", function(){
    validateEachInput(regPass, "Mínimo 6 carácteres");
    validateSamePass(pass.value, pass2.value, "Ingresa la misma contraseña");
  });

  termCond.addEventListener("blur", function(){
    validateCheckBox("Leer y aceptar los términos y condiciones");
  });
});
