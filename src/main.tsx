import SupportAssistant from "./app/components/SupportAssistant";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App";
import {
  KVKK,
  GizlilikPolitikasi,
  CerezPolitikasi,
  KullanimKosullari,
} from "./app/LegalPages";
import BlogPage from "./app/blog/BlogPage";
import BlogPostPage from "./app/blog/BlogPost";
import "./styles/index.css";

const app = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/kvkk" element={<KVKK />} />
      <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
      <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
      <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
    </Routes>
    <SupportAssistant />
  </BrowserRouter>
);
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
