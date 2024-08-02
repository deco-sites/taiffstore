export function isEmailValid(email: string) {
  const regex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (email !== "" && regex.test(email))
}

export function isNewsletterFormValid(email: string, name: string, consent: boolean) {
  let errorMessage = ""

  if (name.trim() == "" && email.trim() == "") {
    errorMessage = "Preencha os campos"
  } else if (name.trim() == "") {
    errorMessage = "Preencha o campo de nome"
  } else if (email.trim() == "") {
    errorMessage = "Preencha o campo de email"
  } else if (!consent) {
    errorMessage = "É necessário aceitar a política de privacidade"
  } else if (!isEmailValid(email)) {
    errorMessage = "Forneça um email válido"
  } else {
    return {
      isFormValid: true,
      errorMessage
    }
  }

  return {
    isFormValid: false,
    errorMessage
  }
}
