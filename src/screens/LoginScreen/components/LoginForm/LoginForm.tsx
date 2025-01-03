import React from "react";
import { useState } from "react";
import FormValidator from "../../helpers/FormValidator.tsx";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UserServices from "../../../../api/UserServices.tsx";
import Form from "../../../../components/Form/Form.tsx";
import styles from "./LoginForm.scss";
import { useNavigate } from "react-router-dom";

import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Estado para mostrar/ocultar senha
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Estado para botão submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  useState<boolean>(false);

  const validateForm = (): boolean => {
    const emailIsValid = FormValidator.validateEmail(email, setEmailError);
    const passwordIsValid = FormValidator.validatePassword(
      password,
      setPasswordError
    );

    if (emailIsValid && passwordIsValid) {
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
        const response = await UserServices.login({ email, password });
        localStorage.setItem("authToken", `Bearer ${response.data.data.token}`);
        setEmail("");
        setPassword("");
        window.location.assign("/chat");
      } catch (error) {
        if (error.response && error.response.data.statusCode === 401) {
          setEmailError("E-mail ou senha inválidos.");
          setPasswordError("E-mail ou senha inválidos.");
        } else {
          alert("Erro ao enviar formulário.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Form title="Entrar" onSubmit={handleSubmit}>
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
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        <a href="/login">Esqueceu sua senha?</a>
      </Typography>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ padding: 2, mt: 1.5 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Entrar"}
      </Button>
      <Typography variant="body2" sx={{ mt: 1.5, textAlign: "center" }}>
        {"Não possui uma conta? "}
        <a href="/register">Criar</a>
      </Typography>
    </Form>
  );
}
