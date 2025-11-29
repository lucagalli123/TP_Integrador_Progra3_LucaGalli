import jwt from "jsonwebtoken";

export async function verificarTokenApi(req, res, next) {
    // recupero el access token de la req.cookies
    const accessToken = req.cookies.accessToken;

    // si no existe lanzo error 401
    if (!accessToken) return res.status(401).json({ message: "Token no enviada" });

    try {
        // decoded:   {
        //   id: 1,
        //   email: "moni@example.com",
        //   iat: 1764357635,  // issued at (timestamp)
        //   exp: 1764357655   // expiration (timestamp)
        // }
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalido o expirado" });
    }
}
