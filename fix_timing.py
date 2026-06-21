import re

with open("src/components/sections/home/FeaturedServices.jsx", "r") as f:
    code = f.read()

# Desktop text out
code = code.replace(
    "tl.to(fullTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)",
    "tl.to(fullTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)"
)
code = code.replace(
    "tl.to(splitLeftTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)",
    "tl.to(splitLeftTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)"
)
code = code.replace(
    "tl.to(splitRightTextsRef.current[i - 1], { opacity: 0, duration: 0.4 }, label)",
    "tl.to(splitRightTextsRef.current[i - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, label)"
)

with open("src/components/sections/home/FeaturedServices.jsx", "w") as f:
    f.write(code)

