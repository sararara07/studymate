import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export async function readPDF(file) {
  const buffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  try {
    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => item.str)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      if (pageText) pages.push(pageText);
    }

    return pages.join("\n\n");
  } finally {
    await pdf.destroy();
  }
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
