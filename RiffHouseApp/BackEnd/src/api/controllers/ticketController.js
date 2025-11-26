import ejs from "ejs";
import puppeteer from "puppeteer";
import { Venta, VentaProducto, Producto } from "../../models/index.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ver tema validaciones en middlewares |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
class TicketController {
    static async descargarTicket(req, res) {
        try {
            const { id } = req.params;

            const venta = await Venta.findByPk(id, {
                include: [
                    {
                        model: VentaProducto,
                        include: [{ model: Producto }],
                    },
                ],
            });

            if (!venta) return res.status(404).send("Venta no encontrada");

            const vista = path.join(__dirname, "..", "..", "backoffice", "views", "cliente", "ticket.ejs");

            const html = await ejs.renderFile(vista, {
                ticket: venta,
            });

            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            await page.setContent(html, { waitUntil: "networkidle0" });

            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    top: "20px",
                    bottom: "20px",
                    right: "20px",
                    left: "20px",
                },
            });

            await browser.close();

            res.set({
                "Content-Type": "Application/pdf",
                "Content-Disposition": `attachment; filename="ticket-nro-${id}.pdf"`,
            });

            res.send(pdfBuffer);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error generando PDF");
        }
    }
}

export default TicketController;
