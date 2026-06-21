import re

with open("src/components/sections/home/FeaturedServices.jsx", "r") as f:
    code = f.read()

# Cards text out
code = code.replace(
    "tl.to(fullTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)",
    "tl.to(fullTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)"
)
code = code.replace(
    "tl.to(splitLeftTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)",
    "tl.to(splitLeftTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)"
)
code = code.replace(
    "tl.to(splitRightTextsRef.current[scenes.length - 1], { opacity: 0, duration: 0.4 }, cardsLabel)",
    "tl.to(splitRightTextsRef.current[scenes.length - 1], { opacity: 0, y: '-100vh', duration: 1, ease: 'power3.inOut' }, cardsLabel)"
)

with open("src/components/sections/home/FeaturedServices.jsx", "w") as f:
    f.write(code)

