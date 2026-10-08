import asyncio
import os
import ssl
import edge_tts

# Standard Python SSL bypass for Windows cert issues
ssl._create_default_https_context = ssl._create_unverified_context
try:
    _unverified = ssl._create_unverified_context()
    edge_tts.constants.DEFAULT_SSL_CONTEXT = _unverified
    edge_tts.voices._SSL_CTX = _unverified
except Exception:
    pass

import aiohttp
_orig_ws = aiohttp.ClientSession._ws_connect
async def _patched_ws(self, url, **kwargs):
    kwargs["ssl"] = False
    return await _orig_ws(self, url, **kwargs)
aiohttp.ClientSession._ws_connect = _patched_ws

out_dir = os.path.join("public", "al-ulama", "video01", "audio")
os.makedirs(out_dir, exist_ok=True)

VOICES = [
    ("vo1.mp3", "ایک یادگار سفر۔ این آئی سی فیصل آباد میں اپنی ایپ کی شاندار پریزنٹیشن۔"),
    ("vo2.mp3", "جدید ٹیکنالوجی اور اسلام۔ ماہرین اور ججز کے سامنے پراجیکٹ کا پروقار تعارف۔"),
    ("vo3.mp3", "فلاح و رہنمائی کا مشن۔ جدید ٹیکنالوجی کے ذریعے امت مسلمہ کے لیے ایک نیا عزم۔"),
    ("vo4.mp3", "علمی و تربیتی دورہ۔ ساتھی اور شاگرد کے ادارے میں آمد اور طلباء سے خصوصی خطاب۔"),
    ("vo5.mp3", "بنیادی تعلیم و تربیت۔ بچوں کو درست تلفظ، فہم اور اسلامی اقدار سکھانے کی پرخلوص کاوش۔"),
    ("vo6.mp3", "اللہ تعالیٰ ہماری اس ادنیٰ محنت کو اپنی بارگاہ میں قبول فرمائے۔ آمین۔ العلماء، علم اور عمل کا سفر۔"),
]

async def generate():
    for name, text in VOICES:
        path = os.path.join(out_dir, name)
        print(f"Generating {name}...")
        communicate = edge_tts.Communicate(text, "ur-PK-AsadNeural", rate="-2%")
        await communicate.save(path)
        print(f"Saved {path}")
    print("ALL 6 VOICEOVERS GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(generate())
