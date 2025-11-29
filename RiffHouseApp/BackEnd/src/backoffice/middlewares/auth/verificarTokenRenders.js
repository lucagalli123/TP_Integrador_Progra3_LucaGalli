import jwt from "jsonwebtoken";
// import Response from "../../response.js";

export async function verificarTokenRender(req, res, next) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // si no hay accessToken intenta con refreshToken
    if (!accessToken) {
        if (!refreshToken) return res.redirect("/admin/login"); // si no hay refreshToken vuelve al login

        // intentar renovar con refresh
        try {
            const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            // generar nuevo access token
            const newAccessToken = jwt.sign({ id: decodedRefresh.id, nombre: decodedRefresh.nombre, email: decodedRefresh.email }, process.env.JWT_SECRET, { expiresIn: "20s" });

            // enviar nuevo access token en cookie
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 20 * 1000,
            });

            // opcional: poner los datos del user en req.user
            req.user = decodedRefresh;

            return next();
        } catch (err) {
            return res.redirect("/admin/login");
        }
    }

    // sii hay access token intenta verificarlo
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        // si access token esta expirado, intenta renovar con refresh token
        if (!refreshToken) return res.redirect("/admin/login");

        try {
            const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            const newAccessToken = jwt.sign({ id: decodedRefresh.id, nombre: decodedRefresh.nombre, email: decodedRefresh.email }, process.env.JWT_SECRET, { expiresIn: "20s" });

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 20 * 1000,
            });

            req.user = decodedRefresh;
            return next();
        } catch (err) {
            return res.redirect("/admin/login");
        }
    }
}
