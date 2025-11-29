export async function authFetch(url, options = {}) {
    // opcions recibidas por parametro y se le agrega las credenciales para mandarlas
    const opts = {
        ...options,
        credentials: "include",
    };

    let res = await fetch(url, opts);

    if (res.status === 401) {
        const refresh = await fetch("/auth/refresh", { method: "POST", credentials: "include" });

        if (refresh.ok) {
            res = await fetch(url, opts);
        } else {
            window.location.href = "/admin/login";
            return;
        }
    }

    return res;
}
