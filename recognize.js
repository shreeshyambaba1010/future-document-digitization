export const config = {
  api: { bodyParser: { sizeLimit: "5mb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "Vercel में OPENAI_API_KEY environment variable सेट नहीं है।" });

  try {
    const { imageData, mimeType } = req.body || {};
    if (typeof imageData !== "string" || !imageData.startsWith("data:image/")) {
      return res.status(400).json({ error: "कृपया सही डॉक्यूमेंट फोटो अपलोड करें।" });
    }
    if (imageData.length > 4_500_000) {
      return res.status(413).json({ error: "फोटो बड़ी है। कृपया छोटी/कम resolution वाली फोटो चुनें।" });
    }
    const prompt = `You are a careful document transcription and reconstruction assistant.
Read the uploaded document image and produce a clean, computer-typed transcription in the same language(s), preserving the original order, headings, labels, rows, columns, quantities, dates, names, and amounts.
Rules:
- Do not invent, guess, correct, or silently alter any text, digit, date, quantity, or amount.
- If a character or value is not legible, write [अस्पष्ट] in that exact place.
- Preserve tables as aligned plain-text tables or clearly separated rows. Include every visible row.
- Keep Hindi in Devanagari and English in Latin script.
- Do not add explanations, claims of authenticity, signatures, seals, stamps, or official verification not clearly visible.
- Output only the reconstructed document text.`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1",
        input: [{ role: "user", content: [
          { type: "input_text", text: prompt },
          { type: "input_image", image_url: imageData, detail: "high" }
        ]}]
      })
    });
    const payload = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: payload?.error?.message || "AI API request failed" });
    const text = (payload.output || []).flatMap(item => item.content || [])
      .filter(part => part.type === "output_text").map(part => part.text).join("\n").trim();
    if (!text) return res.status(502).json({ error: "AI से पढ़ने योग्य टेक्स्ट नहीं मिला।" });
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + (err?.message || "unknown error") });
  }
}
