import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Usuario } from "../../models/usuario.js";
import Response from "../response.js";

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // busco si existe el usuario
            const user = await Usuario.findOne({ where: { email } });
            if (!user) return res.status(401).send(Response.error("email invalido", null));

            // me fijo si coincide la contraseña
            const okPass = await bcrypt.compare(password, user.password);
            if (!okPass) return res.status(401).send(Response.error("contraseña invalida", null));

            // creo el ACCESS TOKEN -> { data, token, opciones (expiracion, algoritmo)}
            const accessToken = jwt.sign({ id: user.id, nombre: user.nombre, email: user.email }, process.env.JWT_SECRET, { expiresIn: "20s", algorithm: "HS256" });

            // envio la cookie  con el access token al navegador
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 20 * 1000, // 20 segundos
            });

            // creo el REFRESH TOKEN -> { data, token, opciones (expiracion, algoritmo)}
            const refreshToken = jwt.sign({ id: user.id, nombre: user.nombre, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d", algorithm: "HS256" });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                // path: "/",
            });

            return res.status(200).send(Response.success(null, "logueado"));
        } catch (error) {
            return res.status(500).send(Response.error("Error al loguearse", error));
        }
    }

    static async refresh(req, res) {
        try {
            // recupera el refresh token
            const tokenFromCookie = req.cookies.refreshToken;
            if (!tokenFromCookie) return res.status(401).send(Response.error("No hay refresh token", null));

            // lo decodifica
            const decoded = jwt.verify(tokenFromCookie, process.env.JWT_REFRESH_SECRET);

            // nuevo access token
            const newAccess = jwt.sign({ id: decoded.id, nombre: decoded.nombre, email: decoded.email }, process.env.JWT_SECRET, {
                expiresIn: "20s",
            });

            // enviamos en cookie
            res.cookie("accessToken", newAccess, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 20 * 1000,
            });

            // PRUEBA
            // console.log("nuevo token $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            // console.log(newAccess);
            // console.log(decoded);

            return res.status(200).send(Response.success({ accessToken: newAccess }, "nuevo access token"));
        } catch (error) {
            return res.status(401).send(Response.error("refresh token invalido", error));
        }
    }

    static logout(req, res) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.send(Response.success(null, "sesion cerrada"));
    }
}

export default AuthController;
