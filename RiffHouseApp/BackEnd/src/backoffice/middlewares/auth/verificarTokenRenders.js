import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../../../../variablesEntorno.js";

export async function verificarTokenRender(req, res, next) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // si no hay accessToken intenta con refreshToken
    if (!accessToken) {
        if (!refreshToken) return res.redirect("/admin/login"); // si no hay refreshToken vuelve al login

        // intentar renovar con refresh
        try {
            const decodedRefresh = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

            // generar nuevo access token
            const newAccessToken = jwt.sign({ id: decodedRefresh.id, nombre: decodedRefresh.nombre, email: decodedRefresh.email }, JWT_SECRET, { expiresIn: "10m" });

            // enviar nuevo access token en cookie
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 10 * 60 * 1000,
            });

            // opcional: poner los datos del user en req.user
            req.user = decodedRefresh;

            return next();
        } catch (error) {
            return res.redirect("/admin/login");
        }
    }

    // sii hay access token intenta verificarlo
    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        // si access token esta expirado, intenta renovar con refresh token
        if (!refreshToken) return res.redirect("/admin/login");

        try {
            const decodedRefresh = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

            const newAccessToken = jwt.sign({ id: decodedRefresh.id, nombre: decodedRefresh.nombre, email: decodedRefresh.email }, JWT_SECRET, { expiresIn: "10m" });

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 10 * 60 * 1000,
            });

            req.user = decodedRefresh;
            return next();
        } catch (error) {
            return res.redirect("/admin/login");
        }
    }
}
