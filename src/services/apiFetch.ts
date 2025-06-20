import { getToken, removeToken } from "./tokenService";

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401 || res.status === 403) {
    removeToken();
    window.location.href = "/login";
    return Promise.reject(new Error("Unauthorized"));
  }
  return res;
}