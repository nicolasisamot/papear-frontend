import React from "react";
import { useState } from "react";
import FormValidator from "../../helpers/FormValidator.tsx";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UserServices from "../../../../api/UserServices.tsx";
import Form from "../../../../components/Form/Form.tsx";
import styles from "./RegistrationForm.module.scss";

import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

export default function RegistrationForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  // Estados de erro para cada campo
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  // Estado para mostrar/ocultar senha
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Estado para botão submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  useState<boolean>(false);

  const validateForm = (): boolean => {
    const usernameIsValid = FormValidator.validateUsername(
      username,
      setUsernameError
    );
    const emailIsValid = FormValidator.validateEmail(email, setEmailError);
    const passwordIsValid = FormValidator.validatePassword(
      password,
      setPasswordError
    );
    const confirmPasswordIsValid = FormValidator.validateConfirmPassword(
      password,
      confirmPassword,
      setConfirmPasswordError
    );
    const acceptTermsIsValid = FormValidator.validateAcceptTerms(
      acceptTerms,
      setTermsError
    );

    if (
      usernameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid &&
      acceptTermsIsValid
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Função de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        await UserServices.register({ username, email, password });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAcceptTerms(false);
        window.location.assign("/login");
      } catch (error) {
        if (error.response && error.response.data.statusCode === 409) {
          const errorData = error.response.data;
          if (errorData.details.usernameExists) {
            setUsernameError("Nome de usuário ja cadastrado.");
          }
          if (errorData.details.emailExists) {
            setEmailError("E-mail ja cadastrado.");
          }
        } else {
          alert("Erro ao enviar formulário.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Form title="Criar Conta" onSubmit={handleSubmit}>
      <TextField
        sx={{ mt: 1.5 }}
        label="Nome de Usuário"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!usernameError} // Mostrar erro se houver um
        helperText={usernameError} // Exibir mensagem de erro
      />

      {/* Campo E-mail */}
      <TextField
        sx={{ mt: 1.5 }}
        label="E-mail"
        variant="outlined"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError} // Mostrar erro se houver um
        helperText={emailError} // Exibir mensagem de erro
      />

      {/* Campo Senha */}
      <TextField
        sx={{ mt: 1.5 }}
        label="Senha"
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError} // Mostrar erro se houver um
        helperText={passwordError} // Exibir mensagem de erro
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                aria-label="toggle password visibility"
                tabIndex={-1}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Campo Confirmar Senha */}
      <TextField
        sx={{ mt: 1.5 }}
        label="Confirmar Senha"
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!confirmPasswordError} // Mostrar erro se houver um
        helperText={confirmPasswordError} // Exibir mensagem de erro
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                aria-label="toggle confirm password visibility"
                tabIndex={-1}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Checkbox para aceitar os termos */}

      <FormControlLabel
        control={
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
        }
        label={
          <Typography variant="body2">
            {"Eu li e concordo com os "}
            <a href="/terms">Termos de Uso</a>
          </Typography>
        }
      />

      {/* Exibição de erro para os termos */}
      {termsError && (
        <Typography
          sx={{ fontSize: "0.75rem", mb: 1, textAlign: "center" }}
          color="error"
        >
          {termsError}
        </Typography>
      )}

      {/* Botão de envio */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ padding: 2 }}
        disabled={isSubmitting} // Desabilita o botão quando isSubmitting for true
      >
        {isSubmitting ? "Enviando..." : "Cadastrar"}
      </Button>
      <Typography variant="body2" sx={{ mt: 1.5, textAlign: "center" }}>
        {"Já possui uma conta? "}
        <a href="/login">Entrar</a>
      </Typography>
    </Form>
  );
}
