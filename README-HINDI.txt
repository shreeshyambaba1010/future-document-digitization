FUTURE DOCUMENT DIGITIZATION WORK – AI OCR WEBSITE

यह प्रोजेक्ट Vercel पर deploy करने के लिए है।

जरूरी:
1) OpenAI API account और API key चाहिए। API का खर्च अलग से लगता है।
2) इस ZIP में API key नहीं है और key को HTML में कभी न डालें।
3) Vercel में project deploy करने के बाद:
   Project Settings -> Environment Variables
   Name: OPENAI_API_KEY
   Value: अपनी OpenAI API key
   Environment: Production, Preview (जरूरत हो तो)
   Save करें।
4) फिर Deployments में जाकर Redeploy करें।
5) वेबसाइट खोलकर फोटो चुनें -> AI से डॉक्यूमेंट तैयार करें।
6) निकले टेक्स्ट को मूल फोटो से मिलाकर सुधारें -> PDF सेव/प्रिंट करें।

सुरक्षा:
- API key किसी को WhatsApp या ChatGPT chat में न भेजें।
- API usage paid हो सकता है। OpenAI API billing अलग होती है।
- AI गलत OCR कर सकता है; रकम, तारीख, नाम और कानूनी/वित्तीय जानकारी जरूर verify करें।
- यह वेबसाइट मूल दस्तावेज़ की authenticity प्रमाणित नहीं करती।
