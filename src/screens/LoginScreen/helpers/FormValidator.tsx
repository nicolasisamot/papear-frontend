import validator from "validator";

export default class FormValidator {
  static validateUsername(username: string, setUsernameError: any): boolean {
    let isValid = true;
    if (!username) {
      setUsernameError("Nome de usuário é obrigatório.");
      isValid = false;
    } else {
      setUsernameError(null);
      if (!validator.isAlphanumeric(username)) {
        setUsernameError(
          "Nome de usuário deve conter apenas letras e números."
        );
        isValid = false;
      }
      if (username.length < 4) {
        setUsernameError("Nome de usuário deve ter pelo menos 4 caracteres.");
        isValid = false;
      }
      if (username.length > 20) {
        setUsernameError("Nome de usuário deve ter no máximo 20 caracteres.");
        isValid = false;
      }
    }
    return isValid;
  }
  static validateEmail(email: string, setEmailError: any): boolean {
    let isValid = true;
    if (!email) {
      setEmailError("E-mail é obrigatório.");
      isValid = false;
    } else {
      setEmailError(null);
      if (!validator.isEmail(email)) {
        setEmailError("E-mail inválido.");
        isValid = false;
      }
    }
    return isValid;
  }
  static validatePassword(password: string, setPasswordError: any): boolean {
    let isValid = true;
    if (!password) {
      setPasswordError("Senha é obrigatória.");
      isValid = false;
    } else {
      setPasswordError(null);
      if (password.length < 8) {
        setPasswordError("Senha deve ter pelo menos 8 caracteres.");
        isValid = false;
      }
      if (password.length > 30) {
        setPasswordError("Senha deve ter no máximo 30 caracteres.");
        isValid = false;
      }
    }
    return isValid;
  }
  static validateConfirmPassword(
    password: string,
    confirmPassword: string,
    setConfirmPasswordError: any
  ): boolean {
    let isValid = true;
    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      isValid = false;
    } else {
      setConfirmPasswordError(null);
    }
    return isValid;
  }
  static validateAcceptTerms(
    acceptTerms: boolean,
    setTermsError: any
  ): boolean {
    let isValid = true;
    if (!acceptTerms) {
      setTermsError("Deve aceitar os termos.");
      isValid = false;
    } else {
      setTermsError(null);
    }
    return isValid;
  }
}
