import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Routes, Route } from "react-router";
import App from "../src/app/App";
import BlogPage from "../src/app/blog/BlogPage";
import BlogPostPage from "../src/app/blog/BlogPost";
import {
  KVKK,
  GizlilikPolitikasi,
  CerezPolitikasi,
  KullanimKosullari,
} from "../src/app/LegalPages";
export function renderPage(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/kvkk" element={<KVKK />} />
        <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
        <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
        <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
      </Routes>
    </StaticRouter>,
  );
}
