export default function getToken(): string | null {
  const savedToken = localStorage.getItem("authToken");

  if (savedToken) {
    const [_, token] = savedToken.split(" ");
    return token;
  }
  return null;
}
