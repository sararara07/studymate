import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import Tesseract from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs", import.meta.url).toString();

async function readScannedPdfPage(page) {
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  await page.render({
    canvasContext: canvas.getContext("2d", { willReadFrequently: true }),
    viewport,
  }).promise;

  const result = await Tesseract.recognize(canvas.toDataURL("image/png"), "eng", {
    logger: (message) => console.log(message),
  });
  return result.data.text.trim();
}

export async function readPDF(file) {
  const buffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    useWorkerFetch: false,
  });
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

    if (pages.length) return pages.join("\n\n");

    const scannedPages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const pageText = await readScannedPdfPage(page);
      if (pageText) scannedPages.push(pageText);
    }

    return scannedPages.join("\n\n");
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
