export function removeAllKey() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
}

export function getJwtToken(): string | null {
  return sessionStorage.getItem("token");
}

export function getUserId(): string | null {
  return sessionStorage.getItem("userId");
}
