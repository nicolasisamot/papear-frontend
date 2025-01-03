import React, { useEffect, useState, useContext } from "react";
import styles from "./AddUserMenu.module.scss";
import FormValidator from "../../../../../../../LoginScreen/helpers/FormValidator.tsx";
import { AuthContext } from "../../../../../../../../contexts/AuthContext.tsx";
import { Button, TextField } from "@mui/material";
import {
  emitEvent,
  handleEventResponse,
  cancelEventResponse,
} from "../../../../../../../../socket.tsx";

export default function AddUserMenu() {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameSuccess, setUsernameSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { socketIsConnected } = useContext(AuthContext);

  useEffect(() => {
    if (socketIsConnected) {
      handleEventResponse("sendFriendRequest", (response: any) => {
        console.log(response);
        switch (response.statusCode) {
          case 404:
            setUsernameError("Usuário não encontrado.");
            break;
          case 409:
            if (response.details.self) {
              setUsernameError("Não é possivel enviar pedido de amizade.");
            }
            if (response.details.alreadyFriends) {
              setUsernameError("Usuário já é seu amigo.");
            }
            if (response.details.friendRequestPending) {
              setUsernameError("Pedido de amizade pendente.");
            }
            break;
          case 201:
            setUsernameSuccess("Pedido de amizade enviado com sucesso.");
            break;
          default:
            setUsernameError("Erro ao enviar pedido de amizade.");
            break;
        }
        setIsSubmitting(false);
      });
    }

    return () => {
      cancelEventResponse("sendFriendRequest");
    };
  }, [socketIsConnected]);

  const validateForm = (): boolean => {
    const usernameIsValid = FormValidator.validateUsername(
      username,
      setUsernameError
    );

    if (usernameIsValid) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        emitEvent("sendFriendRequest", { username });
      } catch (error) {
      } finally {
      }
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        hiddenLabel
        id="search-field"
        variant="outlined"
        placeholder="Nome de usuário"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!usernameError} // Mostrar erro se houver um
        helperText={usernameError || usernameSuccess}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ padding: 2, mt: 1.5 }}
        disabled={isSubmitting}
      >
        {" "}
        {isSubmitting ? "Enviando..." : "Adicionar"}
      </Button>
    </form>
  );
}
