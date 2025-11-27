import ejs from "ejs";
import puppeteer from "puppeteer";
import { Venta, VentaProducto, Producto } from "../../models/index.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

            if (!venta) {
                return res.status(404).send(`Error: No se encontro la venta con ID ${id}`);
            }

            const vista = path.join(__dirname, "..", "..", "backoffice", "views", "cliente", "ticket.ejs");

            const html = await ejs.renderFile(vista, { ticket: venta });

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
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="ticket-nro-${id}.pdf"`,
            });

            res.send(pdfBuffer);
        } catch (error) {
            console.error("Error al generar PDF:", error);

            return res.status(500).send(`Error al generar el ticket: ${error.message}`);
        }
    }
}

export default TicketController;
