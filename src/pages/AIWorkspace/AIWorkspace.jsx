import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Brain,
  ClipboardList,
  Copy,
  Download,
  FileText,
  ImagePlus,
  Sparkles,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { readImage, readPDF } from "../../utils/fileReader";
import { generateFlashcards, generateKeyPoints, generateQuiz, generateSummary } from "../../services/aiService";
import { addFlashcard } from "../../services/flashcardService";
import { addQuiz } from "../../services/quizService";

const imageTypes = ["image/png", "image/jpeg", "image/webp"];
const maxUploadSize = 10 * 1024 * 1024;

function isPdf(file) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function parseAiJson(value, label) {
  const cleaned = String(value)
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error(`Groq returned an invalid ${label} response. Please try again.`);
  }
}

export default function AIWorkspace() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [isPdfUpload, setIsPdfUpload] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  async function handleFile(file) {
    if (!file) return;
    const pdfUpload = isPdf(file);
    if (!pdfUpload && !imageTypes.includes(file.type)) {
      toast.error("Choose a PDF, PNG, JPG, JPEG, or WEBP file.");
      return;
    }

    if (file.size > maxUploadSize) {
      toast.error("Files must be smaller than 10 MB.");
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(pdfUpload ? "" : URL.createObjectURL(file));
    setImageName(file.name);
    setIsPdfUpload(pdfUpload);
    setLoading(true);

    try {
      const extractedText = pdfUpload ? await readPDF(file) : await readImage(file);
      if (!extractedText.trim()) throw new Error("No selectable text found.");
      setNotes(extractedText.trim());
      toast.success(pdfUpload ? "Text extracted from your PDF." : "Text extracted from your image.");
    } catch (error) {
      console.error("File reading failed:", error);
      toast.error(pdfUpload ? "We couldn't read that PDF. Try a text-based PDF." : "We couldn't read that image. Try a clearer image.");
    } finally {
      setLoading(false);
    }
  }

  function clearImage() {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setImageName("");
    setIsPdfUpload(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function generate(type) {
    if (!notes.trim()) {
      toast.error("Upload notes or paste text before generating.");
      return;
    }

    setLoading(true);
    try {
      if (type === "summary") setOutput(await generateSummary(notes));
      if (type === "keypoints") setOutput(await generateKeyPoints(notes));

      if (type === "flashcards") {
        const cards = parseAiJson(await generateFlashcards(notes), "flashcard");
        if (!Array.isArray(cards) || !cards.every((card) => card?.question && card?.answer)) {
          throw new Error("Groq returned incomplete flashcards. Please try again.");
        }
        await Promise.all(cards.map((card) => addFlashcard("AI Generated", card.question, card.answer)));
        setOutput("Flashcards are ready in your Flashcards collection.");
        toast.success(`${cards.length} flashcards created.`);
      }

      if (type === "quiz") {
        const quizzes = parseAiJson(await generateQuiz(notes), "quiz");
        if (!Array.isArray(quizzes) || !quizzes.every((quiz) => quiz?.question && Array.isArray(quiz.options) && quiz.options.length === 4 && quiz?.answer)) {
          throw new Error("Groq returned an incomplete quiz. Please try again.");
        }
        await Promise.all(quizzes.map((quiz) => addQuiz("AI Quiz", quiz.question, quiz.options, quiz.answer)));
        setOutput("Your quiz is ready in the Quiz section.");
        toast.success(`${quizzes.length} quiz questions created.`);
      }
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.error(error.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard.");
  }

  function downloadOutput() {
    const url = URL.createObjectURL(new Blob([output], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "studymate-ai-output.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  const actions = [
    { type: "summary", label: "Create summary", description: "A clear overview", icon: Brain, className: "from-violet-600 to-indigo-600" },
    { type: "keypoints", label: "Key points", description: "Revision essentials", icon: Sparkles, className: "from-sky-500 to-cyan-500" },
    { type: "flashcards", label: "Flashcards", description: "Save ready-to-review cards", icon: BookOpen, className: "from-emerald-500 to-teal-500" },
    { type: "quiz", label: "Practice quiz", description: "Test your knowledge", icon: ClipboardList, className: "from-orange-500 to-amber-500" },
  ];

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="mx-auto max-w-6xl space-y-8 pb-10">
        <section className="rounded-[2rem] border border-violet-100 bg-[#F8F5FF] p-7 text-gray-900 shadow-lg shadow-violet-100/70 sm:p-10">
          <div className="max-w-2xl"><div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-[#7C3AED] shadow-sm"><Sparkles size={16} /> AI study studio</div><h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Turn your notes into a study plan.</h1><p className="mt-3 text-gray-500">Upload a clear notes image or text-based PDF, extract the text, then create exactly what you need to revise.</p></div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold text-slate-900">Upload notes</h2><p className="mt-1 text-sm text-slate-500">PDF, PNG, JPG, JPEG or WEBP up to 10 MB.</p></div><div className="rounded-xl bg-violet-100 p-3 text-violet-700"><FileText size={22} /></div></div>
            {imageName ? <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">{imagePreview ? <img src={imagePreview} alt="Selected study notes" className="h-60 w-full object-contain" /> : <div className="flex h-60 flex-col items-center justify-center text-slate-600"><FileText size={48} className="text-violet-600" /><p className="mt-3 font-semibold">PDF ready to extract</p><p className="mt-1 text-sm text-slate-500">Text from each page will be added to your study text.</p></div>}<div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3"><span className="truncate text-sm font-medium text-slate-600">{imageName}</span><button onClick={clearImage} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Remove selected ${isPdfUpload ? "PDF" : "image"}`}><X size={18} /></button></div></div> : <label className="mt-6 flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 p-6 text-center transition hover:border-violet-400 hover:bg-violet-50"><ImagePlus size={40} className="text-violet-600" /><p className="mt-4 font-semibold text-slate-800">Choose an image or PDF</p><p className="mt-1 text-sm text-slate-500">Use a clear image or a text-based PDF for the best result.</p><input ref={fileInputRef} type="file" accept="application/pdf,.pdf,image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} /></label>}
          </div>

          <div className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-4"><div><h2 className="text-xl font-bold text-slate-900">Study text</h2><p className="mt-1 text-sm text-slate-500">Edit extracted text before asking AI to help.</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">{notes.trim().length} characters</span></div><textarea rows={12} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Upload an image or PDF to extract text, or paste your notes here…" className="mt-6 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-700 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100" /></div>
        </section>

        <section><div className="mb-5"><h2 className="text-2xl font-bold text-slate-900">Choose your study tool</h2><p className="mt-1 text-slate-500">AI will use the text in your study workspace.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{actions.map(({ type, label, description, icon: Icon, className }) => <button key={type} disabled={loading} onClick={() => generate(type)} className={`group rounded-2xl bg-gradient-to-br ${className} p-5 text-left text-white shadow-lg transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60`}><Icon size={26} /><p className="mt-8 font-bold">{label}</p><p className="mt-1 text-sm text-white/75">{description}</p></button>)}</div></section>

        <section className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-bold text-slate-900">AI output</h2><p className="mt-1 text-slate-500">Your generated material appears here.</p></div>{output && <div className="flex gap-2"><button onClick={copyOutput} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Copy size={16} /> Copy</button><button onClick={downloadOutput} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"><Download size={16} /> Download</button></div>}</div>{loading ? <div className="flex min-h-72 flex-col items-center justify-center text-center"><div className="h-11 w-11 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" /><p className="mt-5 font-medium text-slate-600">Reading your notes and preparing your study material…</p></div> : <div className="mt-6 min-h-72 rounded-2xl border border-slate-100 bg-slate-50 p-5"><pre className="whitespace-pre-wrap font-sans leading-7 text-slate-700">{output || "Your study material will appear here. Upload a notes image or paste text, then choose a study tool."}</pre></div>}</section>
      </div>
    </DashboardLayout>
  );
}
