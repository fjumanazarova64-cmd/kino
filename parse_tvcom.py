import re
import json

with open('tvcom_page.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

print('Length:', len(content))
print('Title:', re.findall(r'<title>(.*?)</title>', content, re.IGNORECASE))

scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', content)
print('Script sources (sample):', scripts[:10])

# Check for JSON data in scripts
json_scripts = re.findall(r'<script[^>]*type=["\']application/json["\'][^>]*>(.*?)</script>', content, re.DOTALL)
print(f'JSON scripts count: {len(json_scripts)}')
for i, js in enumerate(json_scripts):
    print(f'JSON script {i} len: {len(js)}, sample: {js[:200]}')

nuxt = re.findall(r'window\.__NUXT__\s*=\s*(.*?);</script>', content, re.DOTALL)
if nuxt:
    print('Nuxt state found! length:', len(nuxt[0]))
    with open('nuxt_data.txt', 'w', encoding='utf-8') as out:
        out.write(nuxt[0][:50000])

next_data = re.findall(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', content)
if next_data:
    print('Next data found! length:', len(next_data[0]))
    with open('next_data.json', 'w', encoding='utf-8') as out:
        out.write(next_data[0])

# Check for API urls
apis = set(re.findall(r'https?://[^\s"\'<>]+(?:api|v1|v2|catalog|media)[^\s"\'<>]+', content))
print('APIs found:', len(apis))
for a in list(apis)[:10]:
    print('  ', a)

# Check for images
imgs = set(re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|png|webp|jpeg|svg)', content))
print('Images found:', len(imgs))
for img in list(imgs)[:15]:
    print('  ', img)
