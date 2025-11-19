import 'pdfkit';
import type { Receita } from '../database/models/receita.model';

export function renderRecipe(doc: PDFKit.PDFDocument, r: Receita): void {
  doc.rect(50, 40, 40, 40).stroke();
  doc.fontSize(20).text(r.nome || 'Sem título', 100, 45);
  doc
    .fontSize(10)
    .fillColor('gray')
    .text(`ID ${r.id}`, 100, 70)
    .fillColor('black');
  doc.moveDown();

  doc.fontSize(12);
  if (r.tempo_preparo_minutos != null) {
    doc.text(`Tempo de preparo: ${r.tempo_preparo_minutos} minutos`);
  }
  doc.moveDown();

  doc.fontSize(14).text('Ingredientes', { underline: true });
  doc.fontSize(12).text(r.ingredientes || '-', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).text('Modo de preparo', { underline: true });
  doc.fontSize(12).text(r.modo_preparo || '-', { align: 'left' });
}
