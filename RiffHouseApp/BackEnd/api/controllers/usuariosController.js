import { Usuario } from "../models/index.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

class UsuariosController {
    static async login(req, res) {
        try {
            let { email, password } = req.body;
            const usuario = await Usuario.findOne({
                where: { email: email },
            });

            if (!usuario) res.status(401).send({ error: "email invalido" });

            const resultadoLogin = await bcrypt.compare(password, usuario.password);

            if (resultadoLogin) res.status(200).send({ message: "contraseña correcta" });
            if (!resultadoLogin) res.status(401).send({ error: "contraseña invalida" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al loguearse" });
        }
    }
}

export default UsuariosController;
