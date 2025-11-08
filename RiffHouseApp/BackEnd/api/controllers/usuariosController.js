import { Usuario } from "../models/index.js";
import bcrypt from "bcrypt";
const saltRounds = 15;

class UsuariosController {
    // validar...
    static async crearUsuario(req, res) {
        try {
            let { nombre, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            // id,nombre,email,password
            const usuarioCreado = await Usuario.create({
                nombre: nombre,
                email: email,
                password: hashedPassword,
            });
            res.status(201).send({ resultado: usuarioCreado });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al crear usuario" });
        }
    }

    // validar...
    static async login(req, res) {
        try {
            let { nombre, password } = req.body;
            const usuario = await Usuario.findOne({
                where: { nombre: nombre },
            });
            const resultadoLogin = await bcrypt.compare(password, usuario.password);
            if (resultadoLogin) res.status(200).send({ message: "Password correcta!" });
            if (!resultadoLogin) res.status(400).send({ message: "Password incorrecta!" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al loguearse" });
        }
    }
}

export default UsuariosController;
