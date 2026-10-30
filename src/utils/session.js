// One login for the whole app. Saves the session and sends the user to the right side:
//   role "customer"                      -> online store ("/" or the page they came from)
//   Doctor / Caretaker / Administrator   -> admin panel (/dashboard)
export const goAfterLogin = (data, navigate, redirect) => {
  localStorage.setItem("avv_token", data.token);
  localStorage.setItem("avv_user", JSON.stringify(data));
  const safe = redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : null;
  if (data.role === "customer") navigate(safe || "/", { replace: true });
  else navigate("/dashboard", { replace: true });
};
