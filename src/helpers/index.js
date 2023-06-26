export function userExist(userArr, username, password) {
  // Usuario e senha são iguais?
  let findUser = userArr.find(
    (user) => user.username == username && user.password == password
  );
  if (typeof findUser !== "object") {
    let allUsers = [];
    userArr.map((user) => {
      allUsers.push(user.username);
    });
    if (allUsers.includes(username)) {
      return "invalid password";
    } else {
      return "invalid user";
    }
  } else {
    return "success";
  }
}

export function filter(data, type, value) {
  let results = [];
  switch (type) {
    case "nome":
      results = data.filter((cliente) => cliente.nome.includes(value));
      break;
    case "cpf":
      results = data.filter((cliente) => cliente.cpf.includes(value));
      break;
  }
  return results;
}

export function formatDate(date) {
  let format = date.split("/").reverse().join("-");
  let converted = new Date(format).toISOString().slice(0, -5);
  return converted;
}

export function convertDate(data) {
  let toConvert = new Date(data).toLocaleDateString("pt-BR");
  return toConvert;
}

export function passwordIsValid(password) {
  if (password.trim().includes(" ") && password.length < 6) {
    return "Remova espaços e inclua no minimo 6 caracteres";
  } else if (password.trim().includes(" ")) {
    return "A senha não pode conter espaços";
  } else if (password.length < 6) {
    return "A senha deve conter no minimo 6 caracteres.";
  } else {
    return "valido";
  }
}

export function usernameIsValid(nomes, username) {
  if (username.includes(" ") && username.length < 7) {
    return "Remova espaços e inclua no minimo 7 caracteres";
  } else if (username.trim().includes(" ")) {
    return "O username não pode conter espaços";
  } else if (username.length < 7) {
    return "O username deve conter no minimo 6 caracteres.";
  } else if (userExist(nomes, username) != "invalid user") {
    return "O username já existe";
  } else {
    return "valido";
  }
}

export function dateIsValid(data) {
  const partesData = data.split("/");
  const dia = parseInt(partesData[0]);
  const mes = parseInt(partesData[1]) - 1;
  const ano = parseInt(partesData[2]);
  const dataNascimento = new Date(ano, mes, dia);

  const dataMinima = new Date(1950, 0, 1); // min 01/01/1970
  const dataAtual = new Date();

  if (
    isNaN(dataNascimento) ||
    dia !== dataNascimento.getDate() ||
    mes !== dataNascimento.getMonth() ||
    ano !== dataNascimento.getFullYear() ||
    dataNascimento > dataAtual ||
    dataNascimento < dataMinima
  ) {
    return false;
  }

  return true;
}

export function cpfIsValid(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = soma % 11;
  let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
    return false;
  }

  soma = 0;
  for (let j = 0; j < 10; j++) {
    soma += parseInt(cpf.charAt(j)) * (11 - j);
  }

  resto = soma % 11;
  let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
    return false;
  }

  return true;
}
