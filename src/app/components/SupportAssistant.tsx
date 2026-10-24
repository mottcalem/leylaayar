import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import {
  getSupportReply,
  SUPPORT_SUGGESTIONS,
  type SupportReply,
} from "../supportKnowledge";

type Message = SupportReply & { role: "user" | "assistant" };
const welcome: Message = {
  role: "assistant",
  text: "Merhaba! Leyla Ayar bilgi asistanıyım. Hizmetler, adres, çalışma saatleri ve randevu hakkında yardımcı olabilirim. Ne öğrenmek istersiniz?",
};
export default function SupportAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [isTyping, setIsTyping] = useState(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) field.current?.focus({ preventScroll: true });
  }, [open]);
  useEffect(() => {
    if (open && log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [open, messages, isTyping]);
  useEffect(() => () => {
    if (replyTimer.current !== null) clearTimeout(replyTimer.current);
  }, []);
  function close() {
    setOpen(false);
    launcher.current?.focus({ preventScroll: true });
  }
  function ask(text: string) {
    const question = text.trim().slice(0, 500);
    if (!question || replyTimer.current !== null) return;
    setMessages((previous) => [
      ...previous.slice(-39),
      { role: "user", text: question },
    ]);
    setIsTyping(true);
    replyTimer.current = setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        { role: "assistant", ...getSupportReply(question) },
      ]);
      setIsTyping(false);
      replyTimer.current = null;
    }, 2500);
    setInput("");
    field.current?.focus({ preventScroll: true });
  }
  return (
    <div className="support-assistant">
      {open && (
        <section
          id="support-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="support-heading"
          className="support-panel"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              close();
            }
          }}
        >
          <header className="support-header">
            <div>
              <h2 id="support-heading">Leyla Ayar Destek</h2>
              <p>Otomatik bilgi asistanı</p>
            </div>
            <button
              type="button"
              aria-label="Destek panelini kapat"
              onClick={close}
            >
              <X size={21} />
            </button>
          </header>
          <div
            ref={log}
            className="support-log"
            role="log"
            aria-label="Destek konuşması"
            aria-live="polite"
            aria-relevant="additions"
            tabIndex={0}
          >
            {messages.map((message, i) => (
              <div
                className={`support-message support-message-${message.role}`}
                key={i}
              >
                <span className="sr-only">
                  {message.role === "user" ? "Siz: " : "Asistan: "}
                </span>
                <p>{message.text}</p>
                {message.links && (
                  <div className="support-links">
                    {message.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        {...(link.href.startsWith("https:")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="support-message support-message-assistant support-typing" role="status">
                <span>Yazıyor</span>
                <span className="support-typing-dots" aria-hidden="true"><i /><i /><i /></span>
              </div>
            )}
          </div>
          <div className="support-suggestions" aria-label="Önerilen sorular">
            {SUPPORT_SUGGESTIONS.map((question) => (
              <button
                type="button"
                key={question}
                disabled={isTyping}
                onClick={() => ask(question)}
              >
                {question}
              </button>
            ))}
          </div>
          <form
            className="support-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <label htmlFor="support-question" className="sr-only">
              Sorunuz
            </label>
            <input
              ref={field}
              id="support-question"
              value={input}
              maxLength={500}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sorunuzu yazın…"
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label="Soruyu gönder"
              disabled={isTyping || !input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
          <p className="support-note">
            Yanıtlar sitedeki bilgilere dayanır. Tıbbi değerlendirme yapılmaz.
          </p>
        </section>
      )}
      <button
        ref={launcher}
        type="button"
        className="support-launcher"
        aria-label={
          open ? "Destek panelini kapat" : "Canlı destek asistanını aç"
        }
        aria-expanded={open}
        aria-controls={open ? "support-panel" : undefined}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={23} />
            <span>Canlı Destek</span>
          </>
        )}
      </button>
    </div>
  );
}
