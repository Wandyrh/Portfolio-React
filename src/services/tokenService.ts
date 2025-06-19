const TOKEN_KEY = "accessToken";

export function setToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}