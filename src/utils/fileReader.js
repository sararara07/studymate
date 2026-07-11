import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function readPDF(file) {
  const buffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: buffer,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content = await page.getTextContent();

    text +=
      content.items
        .map((item) => item.str)
        .join(" ") + "\n\n";
  }

  return text;
}

export async function readImage(file) {
  const result = await Tesseract.recognize(
    file,
    "eng",
    {
      logger: (m) => console.log(m),
    }
  );

  return result.data.text;
}