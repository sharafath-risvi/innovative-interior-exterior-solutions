import os
import re

directories_to_search = ['src/components', 'src/pages']
skip_files = [
    'src/components/sections/home/PremiumHero.jsx',
    'src/components/sections/home/Hero.jsx',
    'src/components/sections/about/AboutHero.jsx',
    'src/components/layout/Navbar.jsx'
]

img_tag_regex = re.compile(r'<img\s+([^>]*?)>', re.IGNORECASE | re.DOTALL)

def process_files():
    for d in directories_to_search:
        for root, _, files in os.walk(d):
            for file in files:
                if not file.endswith('.jsx'):
                    continue
                path = os.path.join(root, file)
                if any(sf in path for sf in skip_files):
                    continue
                
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                def replace_img(match):
                    attrs = match.group(1)
                    if 'loading=' in attrs:
                        return match.group(0)
                    if 'fetchPriority=' in attrs or 'fetchpriority=' in attrs.lower():
                        return match.group(0)
                    return f'<img loading="lazy" {attrs}>'

                new_content = img_tag_regex.sub(replace_img, content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {path}")

process_files()
