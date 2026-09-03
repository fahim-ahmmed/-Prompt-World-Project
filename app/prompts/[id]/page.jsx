import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CopyPromptButton } from "@/components/CopyPromptButton";

async function getPrompt(id) {
  const base = process.env.SERVER_URL || "http://localhost:5000";
  const cookieStore = await cookies();
  const res = await fetch(`${base}/api/prompts/${id}`, {
    cache: "no-store",
    // Forward the browser's cookies so the server can tell if this viewer is Premium.
    headers: { cookie: cookieStore.toString() },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load prompt");
  return res.json();
}

export default async function PromptDetailsPage({ params }) {
  const { id } = await params;
  const prompt = await getPrompt(id);
  if (!prompt) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-4 flex items-center gap-2 text-xs text-mist">
        <span className="rounded-full bg-white/5 px-2 py-0.5">{prompt.category}</span>
        <span className="rounded-full bg-white/5 px-2 py-0.5">{prompt.aiTool}</span>
        <span className="rounded-full bg-white/5 px-2 py-0.5">{prompt.difficulty}</span>
      </div>

      <h1 className="font-display text-3xl font-semibold">{prompt.title}</h1>
      <p className="mt-3 text-mist">{prompt.description}</p>

      <div className="mt-8 rounded-xl border border-white/10 bg-surface p-5">
        {prompt.isLocked ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-mist">
              This is a Premium prompt. Subscribe to unlock the full content.
            </p>
            <a
              href="/payment"
              className="rounded-lg bg-amber px-5 py-2.5 text-sm font-medium text-ink"
            >
              Subscribe to Premium — $5
            </a>
          </div>
        ) : (
          <>
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-paper/90">
              {prompt.content}
            </pre>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-mist">
              <span>Copied {prompt.copyCount}× · by {prompt.creator?.name}</span>
              <CopyPromptButton promptId={prompt._id} content={prompt.content} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
