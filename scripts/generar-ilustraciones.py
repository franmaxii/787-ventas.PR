"""Genera las ilustraciones SVG de productos de Plaza 787.

Uso: python3 scripts/generar-ilustraciones.py public/img/productos
"""
import math
import pathlib
import sys

OUT = pathlib.Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)


def lg(id_, stops, x1=0, y1=0, x2=0, y2=1):
    n = len(stops)
    s = ''.join(
        f'<stop offset="{i / (n - 1):.2f}" stop-color="{c}"/>' for i, c in enumerate(stops)
    )
    return f'<linearGradient id="{id_}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">{s}</linearGradient>'


def shadow(cx, cy, rx, ry=9):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#0f172a" opacity=".22" filter="url(#sh)"/>'


def star(cx, cy, R, r, n=5, rot=-90):
    pts = []
    for i in range(n * 2):
        rad = R if i % 2 == 0 else r
        a = math.radians(rot + i * 180 / n)
        pts.append(f'{cx + rad * math.cos(a):.2f},{cy + rad * math.sin(a):.2f}')
    return ' '.join(pts)


def svg(name, body, defs=''):
    doc = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none">\n'
        '<defs><filter id="sh" x="-50%" y="-50%" width="200%" height="200%">'
        '<feGaussianBlur stdDeviation="5"/></filter>'
        f'{defs}</defs>\n{body}\n</svg>\n'
    )
    (OUT / f'{name}.svg').write_text(doc)


# 1. Audífonos
svg('audifonos', f'''
{shadow(120, 212, 80)}
<path d="M50 146V120a70 70 0 0 1 140 0v26" stroke="url(#band)" stroke-width="14" stroke-linecap="round"/>
<path d="M60 116a60 60 0 0 1 120 0" stroke="#fff" stroke-opacity=".22" stroke-width="3" stroke-linecap="round"/>
<rect x="45" y="110" width="10" height="24" rx="4" fill="#94a3b8"/>
<rect x="185" y="110" width="10" height="24" rx="4" fill="#94a3b8"/>
<rect x="30" y="128" width="46" height="78" rx="21" fill="url(#cup)" stroke="#ebb549" stroke-width="3"/>
<rect x="64" y="134" width="22" height="66" rx="10" fill="url(#pad)"/>
<rect x="164" y="128" width="46" height="78" rx="21" fill="url(#cup)" stroke="#ebb549" stroke-width="3"/>
<rect x="154" y="134" width="22" height="66" rx="10" fill="url(#pad)"/>
<rect x="39" y="138" width="6" height="46" rx="3" fill="#fff" opacity=".2"/>
<rect x="173" y="138" width="6" height="46" rx="3" fill="#fff" opacity=".2"/>
<circle cx="53" cy="192" r="3" fill="#4ade80"/>
''', lg('band', ['#475569', '#0f172a']) + lg('cup', ['#334155', '#020617']) + lg('pad', ['#f1f5f9', '#94a3b8'], x2=1, y2=0))

# 2. Celular
icons = ''
pal = ['#f64e43', '#ebb549', '#399552', '#ffffff', '#fde68a', '#f8fafc', '#0f766e', '#fb923c', '#fecaca', '#ffffff', '#ebb549', '#399552']
for i, c in enumerate(pal):
    x = 86 + (i % 4) * 20
    y = 62 + (i // 4) * 22
    icons += f'<rect x="{x}" y="{y}" width="14" height="14" rx="4" fill="{c}" opacity=".92"/>'
dock = ''.join(f'<rect x="{91 + i * 16}" y="185" width="10" height="10" rx="3" fill="#fff" opacity=".85"/>' for i in range(4))
svg('celular', f'''
{shadow(120, 216, 58, 7)}
<rect x="67" y="70" width="4" height="24" rx="2" fill="#475569"/>
<rect x="169" y="82" width="4" height="34" rx="2" fill="#475569"/>
<rect x="70" y="24" width="100" height="190" rx="22" fill="url(#body)"/>
<rect x="76" y="30" width="88" height="178" rx="17" fill="url(#scr)"/>
<g clip-path="url(#sc)">
{icons}
<rect x="86" y="132" width="74" height="34" rx="9" fill="#fff" opacity=".25"/>
<rect x="94" y="140" width="30" height="5" rx="2.5" fill="#fff" opacity=".9"/>
<rect x="94" y="150" width="46" height="5" rx="2.5" fill="#fff" opacity=".55"/>
<rect x="84" y="180" width="72" height="20" rx="10" fill="#fff" opacity=".28"/>
{dock}
<path d="M76 130L164 66V30H150L76 84Z" fill="#fff" opacity=".08"/>
</g>
<rect x="104" y="37" width="32" height="10" rx="5" fill="#020617"/>
''', lg('scr', ['#7dd3fc', '#0d90ab', '#0b4f6c'], x2=1, y2=1) + lg('body', ['#334155', '#0f172a'], x2=1, y2=1)
    + '<clipPath id="sc"><rect x="76" y="30" width="88" height="178" rx="17"/></clipPath>')

# 3. Bocina
drop = 'M0 -9C4 -3 7 1 7 4A7 7 0 0 1 -7 4C-7 1 -4 -3 0 -9Z'
svg('bocina', f'''
{shadow(120, 204, 86)}
<path d="M196 118c28 0 28 52 0 52" stroke="#f64e43" stroke-width="8" stroke-linecap="round"/>
<rect x="98" y="88" width="12" height="10" rx="3" fill="#0f172a"/>
<rect x="114" y="88" width="12" height="10" rx="3" fill="#0f172a"/>
<rect x="130" y="88" width="12" height="10" rx="3" fill="#0f172a"/>
<rect x="32" y="96" width="172" height="96" rx="48" fill="url(#bd)"/>
<path d="M80 96A48 48 0 0 0 80 192Z" fill="#f64e43"/>
<path d="M156 96A48 48 0 0 1 156 192Z" fill="#f64e43"/>
<rect x="86" y="104" width="64" height="80" rx="6" fill="url(#g)"/>
<rect x="106" y="138" width="24" height="12" rx="6" fill="#f8fafc"/>
<rect x="46" y="104" width="144" height="8" rx="4" fill="#fff" opacity=".14"/>
<path d="{drop}" transform="translate(52 66)" fill="#0d90ab"/>
<path d="{drop}" transform="translate(70 48) scale(.7)" fill="#0d90ab" opacity=".8"/>
<path d="{drop}" transform="translate(186 62) scale(.85)" fill="#0d90ab"/>
''', lg('bd', ['#475569', '#1e293b', '#0f172a'])
    + '<pattern id="g" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.7" fill="#64748b"/></pattern>')

# 4. Planta eléctrica
vents = ''.join(f'<rect x="142" y="{102 + i * 11}" width="40" height="5" rx="2.5" fill="#7f1d1d" opacity=".45"/>' for i in range(6))
outlet = lambda x: (f'<rect x="{x}" y="130" width="26" height="26" rx="6" fill="#374151"/>'
                    f'<rect x="{x + 7}" y="137" width="3" height="9" rx="1" fill="#111827"/>'
                    f'<rect x="{x + 16}" y="137" width="3" height="9" rx="1" fill="#111827"/>'
                    f'<circle cx="{x + 13}" cy="150" r="2.2" fill="#111827"/>')
wheel = lambda cx: f'<circle cx="{cx}" cy="198" r="14" fill="#111827"/><circle cx="{cx}" cy="198" r="6" fill="#9ca3af"/>'
svg('planta-electrica', f'''
{shadow(120, 214, 92)}
<rect x="34" y="70" width="172" height="124" rx="16" stroke="#111827" stroke-width="8"/>
<rect x="66" y="54" width="108" height="30" rx="12" fill="url(#tank)"/>
<circle cx="152" cy="54" r="8" fill="#111827"/><circle cx="152" cy="54" r="3" fill="#6b7280"/>
<rect x="46" y="80" width="148" height="104" rx="12" fill="url(#red)"/>
<rect x="54" y="86" width="132" height="6" rx="3" fill="#fff" opacity=".28"/>
<rect x="58" y="98" width="74" height="68" rx="8" fill="#1f2937"/>
<rect x="66" y="106" width="30" height="14" rx="3" fill="#ebb549"/>
<rect x="104" y="106" width="20" height="14" rx="4" fill="#4b5563"/><rect x="106" y="108" width="8" height="10" rx="2" fill="#4ade80"/>
{outlet(66)}{outlet(98)}
{vents}
<path d="M34 186H206" stroke="#111827" stroke-width="8" stroke-linecap="round"/>
{wheel(62)}{wheel(178)}
''', lg('red', ['#fb7185', '#f64e43', '#b91c1c']) + lg('tank', ['#f87171', '#dc2626']))

# 5. Estación de energía
usb = ''.join(f'<rect x="{66 + i * 18}" y="142" width="12" height="6" rx="2" fill="#0f172a" stroke="#64748b"/>' for i in range(4))
bars = ''.join(f'<rect x="{76 + i * 10}" y="102" width="7" height="12" rx="1.5" fill="#a7f3d0"/>' for i in range(3))
svg('estacion-energia', f'''
{shadow(120, 208, 84)}
<path d="M80 72V56a10 10 0 0 1 10-10h60a10 10 0 0 1 10 10v16" stroke="#334155" stroke-width="10" stroke-linecap="round"/>
<rect x="42" y="64" width="156" height="136" rx="20" fill="url(#cs)"/>
<rect x="50" y="68" width="140" height="5" rx="2.5" fill="#fff" opacity=".8"/>
<rect x="54" y="78" width="132" height="108" rx="12" fill="#1e293b"/>
<rect x="64" y="88" width="62" height="40" rx="6" fill="#0d90ab"/>
<rect x="72" y="98" width="38" height="20" rx="4" stroke="#fff" stroke-width="2.5"/>
<rect x="110" y="104" width="4" height="8" rx="1.5" fill="#fff"/>
{bars}
<rect x="136" y="88" width="40" height="40" rx="8" fill="#334155"/>
<rect x="146" y="98" width="4" height="12" rx="1.5" fill="#0f172a"/><rect x="162" y="98" width="4" height="12" rx="1.5" fill="#0f172a"/>
<path d="M152 120a4 4 0 0 1 8 0v3h-8z" fill="#0f172a"/>
{usb}
<circle cx="164" cy="156" r="10" fill="#399552"/>
<path d="M164 150v6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
<path d="M159.5 153a6 6 0 1 0 9 0" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
<rect x="66" y="166" width="78" height="7" rx="3.5" fill="#ebb549"/>
''', lg('cs', ['#f8fafc', '#cbd5e1', '#94a3b8']))

# 6. Placa solar
rays = ''.join(
    f'<path d="M{196 + 20 * math.cos(math.radians(a)):.1f} {40 + 20 * math.sin(math.radians(a)):.1f}L'
    f'{196 + 28 * math.cos(math.radians(a)):.1f} {40 + 28 * math.sin(math.radians(a)):.1f}" '
    f'stroke="#ebb549" stroke-width="4" stroke-linecap="round"/>'
    for a in range(0, 360, 45))
svg('placa-solar', f'''
{shadow(132, 214, 88)}
<circle cx="196" cy="40" r="14" fill="#ebb549"/>{rays}
<path d="M84 178L74 212M184 170L194 212M120 176L134 212" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
<polygon points="40,80 200,64 214,168 54,184" fill="url(#cell)" stroke="#e2e8f0" stroke-width="5" stroke-linejoin="round"/>
<path d="M80 76L94 180M120 72L134 176M160 68L174 172M44.7 114.7L204.7 98.7M49.3 149.3L209.3 133.3" stroke="#7dd3fc" stroke-opacity=".55" stroke-width="2"/>
<polygon points="92,75 132,71 88,181 64,183" fill="#fff" opacity=".12"/>
''', lg('cell', ['#1d4ed8', '#0c4a6e'], x2=1, y2=1))

# 7. Abanico de techo
blades = ''.join(f'<rect x="14" y="-15" width="100" height="30" rx="15" fill="url(#wood)" transform="rotate({a})"/>' for a in (0, 72, 144, 216, 288))
svg('abanico', f'''
<rect x="96" y="16" width="48" height="12" rx="6" fill="#f1f5f9"/>
<rect x="116" y="24" width="8" height="66" rx="3" fill="#cbd5e1"/>
<g transform="translate(120 104) scale(1 .34)">{blades}</g>
<rect x="94" y="88" width="52" height="24" rx="12" fill="url(#metal)"/>
<circle cx="120" cy="130" r="30" fill="#fde68a" opacity=".5" filter="url(#sh)"/>
<path d="M100 112a20 18 0 0 0 40 0z" fill="#fef9c3"/>
<path d="M56 166q16-10 32 0t32 0t32 0t32 0" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>
<path d="M80 190q14-9 28 0t28 0t28 0" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>
''', lg('wood', ['#e7b77a', '#b7791f'], x2=1, y2=0) + lg('metal', ['#f8fafc', '#94a3b8']))

# 8. Greca
svg('greca', f'''
{shadow(120, 212, 54)}
<path d="M108 40c-8-8 8-14 0-22M126 36c-8-8 8-14 0-22" stroke="#fff" stroke-opacity=".75" stroke-width="4" stroke-linecap="round"/>
<path d="M158 84c32 4 32 46 2 50" stroke="#111827" stroke-width="12" stroke-linecap="round"/>
<polygon points="84,208 156,208 148,146 92,146" fill="url(#al)"/>
<path d="M106 146L102 208M134 146L138 208" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>
<rect x="88" y="136" width="64" height="12" rx="3" fill="#64748b"/>
<polygon points="92,136 148,136 160,74 80,74" fill="url(#al)"/>
<path d="M106 136L100 74M134 136L140 74" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>
<path d="M80 74L62 66L66 78L84 92Z" fill="#94a3b8"/>
<path d="M78 74H162L152 60H88Z" fill="#cbd5e1"/>
<rect x="111" y="46" width="18" height="16" rx="6" fill="#111827"/>
''', lg('al', ['#94a3b8', '#f8fafc', '#cbd5e1', '#64748b'], x2=1, y2=0))

# 9. Pilón
svg('pilon', f'''
{shadow(120, 208, 62)}
<ellipse cx="120" cy="196" rx="48" ry="12" fill="#78350f"/>
<rect x="72" y="184" width="96" height="12" fill="#78350f"/>
<ellipse cx="120" cy="184" rx="48" ry="12" fill="#92400e"/>
<path d="M100 160H140L134 186H106Z" fill="url(#w1)"/>
<ellipse cx="120" cy="96" rx="62" ry="14" fill="#a16207"/>
<ellipse cx="120" cy="96" rx="52" ry="9" fill="#451a03"/>
<rect x="128" y="16" width="22" height="104" rx="11" transform="rotate(24 139 68)" fill="url(#w2)"/>
<path d="M58 96A62 14 0 0 0 182 96C182 138 162 160 140 166H100C78 160 58 138 58 96Z" fill="url(#w1)"/>
<path d="M58 96A62 14 0 0 0 182 96" stroke="#fcd34d" stroke-opacity=".5" stroke-width="3"/>
<path d="M76 124C96 136 144 136 164 124M86 146C102 154 138 154 154 146" stroke="#fbbf24" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="186" cy="198" rx="9" ry="11" fill="#fefce8"/><path d="M186 188v20" stroke="#e7e5e4" stroke-width="1.5"/>
<ellipse cx="200" cy="202" rx="7" ry="9" fill="#fefce8"/>
''', lg('w1', ['#b45309', '#78350f'], x2=1, y2=0) + lg('w2', ['#d97706', '#92400e'], x2=1, y2=0))

# 10. Sábanas
dots = ''.join(f'<circle cx="{66 + (i % 8) * 14}" cy="{88 + (i // 8) * 12}" r="2" fill="#f59e0b" opacity=".55"/>' for i in range(16))
def layer(x, y, w, color):
    return (f'<rect x="{x}" y="{y + 4}" width="{w}" height="42" rx="12" fill="#0f172a" opacity=".12"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="42" rx="12" fill="{color}"/>'
            f'<path d="M{x + 6} {y + 21}H{x + w - 6}" stroke="#0f172a" stroke-opacity=".07" stroke-width="2"/>'
            f'<rect x="{x + 8}" y="{y + 3}" width="{w - 16}" height="4" rx="2" fill="#fff" opacity=".6"/>')
svg('sabanas', f'''
{shadow(120, 204, 88)}
{layer(40, 152, 160, '#e0f2fe')}
{layer(46, 114, 148, '#ffffff')}
{layer(52, 76, 136, '#fde68a')}
{dots}
<rect x="150" y="72" width="14" height="126" rx="3" fill="#f64e43"/>
<rect x="142" y="120" width="30" height="20" rx="4" fill="#fff" stroke="#f64e43" stroke-width="2"/>
''')

# 11. Camiseta bandera PR
stripes = ''.join(f'<rect x="96" y="{100 + i * 6.4:.1f}" width="48" height="6.4" fill="#f64e43"/>' for i in (0, 2, 4))
shirt = 'M86 44L60 54L30 88L56 110L70 98V206H170V98L184 110L210 88L180 54L154 44C150 60 136 68 120 68C104 68 90 60 86 44Z'
svg('camiseta', f'''
{shadow(120, 214, 64)}
<path d="{shirt}" fill="url(#ct)"/>
<polygon points="60,54 30,88 56,110 70,98" fill="#0f172a" opacity=".06"/>
<polygon points="180,54 210,88 184,110 170,98" fill="#0f172a" opacity=".06"/>
<path d="M86 44C90 60 104 68 120 68C136 68 150 60 154 44" stroke="#cbd5e1" stroke-width="5"/>
<path d="M70 198H170" stroke="#cbd5e1" stroke-width="2"/>
<rect x="96" y="100" width="48" height="32" rx="2" fill="#fff"/>
{stripes}
<polygon points="96,100 96,132 123.7,116" fill="#0d90ab"/>
<polygon points="{star(105.3, 116.4, 5.4, 2.2)}" fill="#fff"/>
<rect x="96" y="100" width="48" height="32" rx="2" stroke="#e2e8f0"/>
''', lg('ct', ['#ffffff', '#e2e8f0']))

# 12. Chancletas
sole = 'M0 -72C26 -72 34 -42 31 -12C28 12 32 38 30 56C28 76 -28 76 -30 56C-32 38 -28 12 -31 -12C-34 -42 -26 -72 0 -72Z'
def flip(tf, top, bottom, inner):
    return (f'<g transform="{tf}">'
            f'<path d="{sole}" transform="translate(0 6)" fill="{bottom}"/>'
            f'<path d="{sole}" fill="{top}"/>'
            f'<path d="{sole}" transform="scale(.84)" fill="{inner}" opacity=".45"/>'
            '<path d="M0 -44C-16 -30 -24 -6 -29 10M0 -44C16 -30 24 -6 29 10" stroke="#fff" stroke-width="7" stroke-linecap="round"/>'
            '<circle cx="0" cy="-44" r="5" fill="#fff"/></g>')
svg('chancletas', f'''
{shadow(120, 210, 92)}
{flip('translate(86 120) rotate(-14)', '#0d90ab', '#0a6f85', '#5bc0d6')}
{flip('translate(156 126) rotate(12) scale(-1 1)', '#f64e43', '#c9362c', '#fca5a5')}
''')

# 13. Gafas
svg('gafas', f'''
{shadow(120, 196, 82, 6)}
<path d="M30 98L12 106M210 98L228 106" stroke="#111827" stroke-width="7" stroke-linecap="round"/>
<path d="M34 100H112C114 132 104 154 76 154C46 154 34 132 34 100Z" fill="url(#lens)" stroke="#111827" stroke-width="5"/>
<path d="M128 100H206C206 132 194 154 164 154C136 154 126 132 128 100Z" fill="url(#lens)" stroke="#111827" stroke-width="5"/>
<path d="M30 98H210" stroke="#111827" stroke-width="10" stroke-linecap="round"/>
<path d="M112 104C116 96 124 96 128 104" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
<path d="M46 108H70L52 140Z" fill="#fff" opacity=".35"/>
<path d="M140 108H164L146 140Z" fill="#fff" opacity=".35"/>
''', lg('lens', ['#fbbf24', '#f64e43', '#7c2d12']))

# 14. Careta de vejigante
teeth = ''
for t in (0.15, 0.3, 0.45, 0.6, 0.75, 0.9):
    x = 84 + 72 * t
    y = 160 + 32 * t * (1 - t)
    teeth += f'<polygon points="{x - 4:.1f},{y - 1:.1f} {x + 4:.1f},{y - 1:.1f} {x:.1f},{y + 8:.1f}" fill="#fff"/>'
svg('vejigante', f'''
{shadow(120, 214, 60)}
<path d="M110 72Q114 24 122 8Q128 30 132 72Z" fill="#0d90ab"/>
<path d="M88 82Q66 38 50 24Q76 40 104 72Z" fill="#399552"/>
<path d="M152 82Q174 38 190 24Q164 40 136 72Z" fill="#f8fafc"/>
<path d="M66 114Q30 92 16 68Q40 84 72 96Z" fill="#f8fafc"/>
<path d="M174 114Q210 92 224 68Q200 84 168 96Z" fill="#0d90ab"/>
<path d="M64 142Q30 146 12 134Q36 128 66 126Z" fill="#d97706"/>
<path d="M176 142Q210 146 228 134Q204 128 174 126Z" fill="#399552"/>
<circle cx="120" cy="40" r="3" fill="#fff"/><circle cx="160" cy="52" r="3" fill="#f64e43"/><circle cx="42" cy="88" r="3" fill="#f64e43"/>
<circle cx="78" cy="50" r="3" fill="#fff"/><circle cx="200" cy="90" r="3" fill="#fff"/><circle cx="34" cy="134" r="3" fill="#fff"/>
<ellipse cx="120" cy="134" rx="58" ry="66" fill="url(#face)"/>
<path d="M74 100Q97 86 120 100T166 100" stroke="#399552" stroke-width="6" stroke-linecap="round"/>
<path d="M84 110Q98 102 112 110M128 110Q142 102 156 110" stroke="#0d90ab" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="98" cy="124" rx="13" ry="10" fill="#fff"/><ellipse cx="142" cy="124" rx="13" ry="10" fill="#fff"/>
<circle cx="99" cy="125" r="6" fill="#111827"/><circle cx="141" cy="125" r="6" fill="#111827"/>
<circle cx="97" cy="123" r="2" fill="#fff"/><circle cx="139" cy="123" r="2" fill="#fff"/>
<path d="M120 130L111 150H129Z" fill="#f64e43"/>
<path d="M84 160Q120 196 156 160Q120 176 84 160Z" fill="#7f1d1d"/>
{teeth}
<circle cx="78" cy="150" r="5" fill="#0d90ab"/><circle cx="162" cy="150" r="5" fill="#0d90ab"/>
<circle cx="72" cy="136" r="3" fill="#f64e43"/><circle cx="168" cy="136" r="3" fill="#f64e43"/>
<ellipse cx="96" cy="88" rx="16" ry="7" fill="#fff" opacity=".3" transform="rotate(-18 96 88)"/>
''', lg('face', ['#fde047', '#ebb549', '#d97706']))

# 15. Cuatro puertorriqueño
frets = ''.join(f'<path d="M-8 {y}H8" stroke="#d6d3d1" stroke-width="1.2"/>' for y in range(-126, -40, 10))
pegs = ''.join(f'<circle cx="{s * 19}" cy="{-166 + i * 7}" r="3" fill="#f8fafc"/>' for i in range(5) for s in (-1, 1))
strings = ''.join(f'<path d="M{x} -166V47" stroke="#f8fafc" stroke-opacity=".85" stroke-width=".9"/>' for x in (-4.5, -2.2, 0, 2.2, 4.5))
body = 'M0 -40C22 -40 30 -52 40 -48C52 -42 44 -18 34 -8C46 4 56 22 48 44C40 66 18 72 0 72C-18 72 -40 66 -48 44C-56 22 -46 4 -34 -8C-44 -18 -52 -42 -40 -48C-30 -52 -22 -40 0 -40Z'
svg('cuatro', f'''
{shadow(120, 214, 72)}
<g transform="translate(130 150) rotate(-32) scale(.86)">
<rect x="-8" y="-138" width="16" height="104" rx="4" fill="#3f1d0b"/>
{frets}
<rect x="-15" y="-174" width="30" height="40" rx="9" fill="#92400e"/>
{pegs}
<path d="{body}" fill="url(#top)" stroke="#78350f" stroke-width="4"/>
<circle cx="0" cy="4" r="15" stroke="#fde68a" stroke-width="2"/>
<circle cx="0" cy="4" r="11" fill="#3f1d0b"/>
<rect x="-14" y="44" width="28" height="6" rx="3" fill="#3f1d0b"/>
{strings}
<ellipse cx="-22" cy="30" rx="10" ry="22" fill="#fff" opacity=".14"/>
</g>
''', lg('top', ['#f59e0b', '#b45309'], x2=1, y2=1))

# 16. Coquí
def toes(cx, cy, s):
    return ''.join(f'<circle cx="{cx + s * dx}" cy="{cy + dy}" r="4.5" fill="#f2c48d"/>' for dx, dy in ((0, 0), (8, 4), (-6, -2)))
svg('coqui', f'''
{shadow(120, 208, 72)}
<ellipse cx="74" cy="170" rx="30" ry="22" fill="#b97a3c"/>
<ellipse cx="166" cy="170" rx="30" ry="22" fill="#b97a3c"/>
<ellipse cx="120" cy="156" rx="52" ry="44" fill="url(#fb)"/>
<ellipse cx="120" cy="172" rx="30" ry="24" fill="#fbe3c0"/>
<path d="M94 176C90 190 84 196 78 198M146 176C150 190 156 196 162 198" stroke="#b97a3c" stroke-width="9" stroke-linecap="round"/>
{toes(74, 198, -1)}{toes(166, 198, 1)}
<circle cx="100" cy="146" r="5" fill="#a86b32" opacity=".45"/><circle cx="144" cy="150" r="4" fill="#a86b32" opacity=".45"/>
<ellipse cx="120" cy="108" rx="48" ry="34" fill="url(#fb)"/>
<circle cx="92" cy="84" r="17" fill="url(#fb)"/><circle cx="148" cy="84" r="17" fill="url(#fb)"/>
<circle cx="92" cy="84" r="11" fill="#1f2937"/><circle cx="148" cy="84" r="11" fill="#1f2937"/>
<circle cx="88" cy="80" r="3.5" fill="#fff"/><circle cx="144" cy="80" r="3.5" fill="#fff"/>
<path d="M100 118Q120 130 140 118" stroke="#7c4a1e" stroke-width="3" stroke-linecap="round"/>
<circle cx="86" cy="112" r="7" fill="#f64e43" opacity=".3"/><circle cx="154" cy="112" r="7" fill="#f64e43" opacity=".3"/>
<ellipse cx="104" cy="98" rx="14" ry="6" fill="#fff" opacity=".35" transform="rotate(-20 104 98)"/>
<path d="M184 64V40L202 35V59" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="180" cy="64" r="5" fill="#fff"/><circle cx="198" cy="59" r="5" fill="#fff"/>
''', lg('fb', ['#f2c48d', '#c98b4a']))

# 17. Cooler
svg('cooler', f'''
{shadow(120, 214, 92)}
<path d="M200 118H214V58H200" stroke="#64748b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="38" y="98" width="164" height="102" rx="14" fill="url(#wb)"/>
<rect x="32" y="78" width="176" height="30" rx="12" fill="url(#rl)"/>
<rect x="40" y="81" width="160" height="5" rx="2.5" fill="#fff" opacity=".35"/>
<ellipse cx="70" cy="90" rx="12" ry="4" fill="#991b1b" opacity=".55"/><ellipse cx="96" cy="90" rx="12" ry="4" fill="#991b1b" opacity=".55"/>
<rect x="108" y="104" width="24" height="16" rx="4" fill="#94a3b8"/>
<rect x="46" y="126" width="10" height="34" rx="5" fill="#cbd5e1"/><rect x="184" y="126" width="10" height="34" rx="5" fill="#cbd5e1"/>
<rect x="72" y="146" width="96" height="10" rx="5" fill="#0d90ab"/>
<circle cx="62" cy="202" r="13" fill="#1f2937"/><circle cx="62" cy="202" r="5" fill="#9ca3af"/>
<circle cx="178" cy="202" r="13" fill="#1f2937"/><circle cx="178" cy="202" r="5" fill="#9ca3af"/>
<rect x="138" y="54" width="24" height="24" rx="6" fill="#e0f2fe" transform="rotate(12 150 66)"/>
<rect x="160" y="62" width="18" height="18" rx="5" fill="#bae6fd" transform="rotate(-10 169 71)"/>
''', lg('wb', ['#ffffff', '#cbd5e1']) + lg('rl', ['#f87171', '#dc2626']))

# 18. Tabla de surf
board = 'M120 12C154 50 160 120 152 192C148 216 92 216 88 192C80 120 86 50 120 12Z'
svg('tabla-surf', f'''
<path d="M14 206q18-14 36 0t36 0t36 0t36 0t36 0t36 0" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>
<g transform="translate(120 116) rotate(-38) scale(.84) translate(-120 -114)">
<path d="{board}" transform="translate(6 6)" fill="#0f172a" opacity=".18"/>
<path d="{board}" fill="url(#bw)"/>
<g clip-path="url(#bc)">
<rect x="60" y="116" width="120" height="13" fill="#0d90ab"/>
<rect x="60" y="133" width="120" height="6" fill="#f64e43"/>
<rect x="60" y="143" width="120" height="3" fill="#ebb549"/>
</g>
<path d="M120 16V206" stroke="#cbd5e1" stroke-width="1.5"/>
<path d="M120 206C126 226 144 222 150 238" stroke="#111827" stroke-width="3"/>
</g>
''', lg('bw', ['#ffffff', '#e2e8f0'], x2=1, y2=0) + f'<clipPath id="bc"><path d="{board}"/></clipPath>')

# 19. Bicicleta
def bwheel(cx, cy=150):
    sp = ''.join(
        f'<path d="M{cx - 33 * math.cos(math.radians(a)):.1f} {cy - 33 * math.sin(math.radians(a)):.1f}L'
        f'{cx + 33 * math.cos(math.radians(a)):.1f} {cy + 33 * math.sin(math.radians(a)):.1f}" stroke="#cbd5e1" stroke-width="1.2"/>'
        for a in [i * 22.5 for i in range(8)])
    return (f'{sp}<circle cx="{cx}" cy="{cy}" r="40" stroke="#111827" stroke-width="10"/>'
            f'<circle cx="{cx}" cy="{cy}" r="33" stroke="#94a3b8" stroke-width="2"/>'
            f'<circle cx="{cx}" cy="{cy}" r="5" fill="#475569"/>')
svg('bicicleta', f'''
{shadow(121, 198, 98, 7)}
{bwheel(64)}{bwheel(178)}
<path d="M64 146L114 141M64 154L114 163" stroke="#64748b" stroke-width="1.5"/>
<path d="M64 150L116 152L102 94ZM102 94L160 90M116 152L166 108" stroke="#0d90ab" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M160 90L166 108L178 150" stroke="#0a6f85" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="116" cy="152" r="11" stroke="#475569" stroke-width="3"/>
<path d="M116 152L124 166" stroke="#334155" stroke-width="4" stroke-linecap="round"/><rect x="118" y="164" width="14" height="5" rx="2" fill="#111827"/>
<path d="M102 94L99 82" stroke="#334155" stroke-width="5"/>
<path d="M86 80C92 74 110 76 114 80C110 84 92 84 86 80Z" fill="#111827"/>
<path d="M160 90L156 74L176 70" stroke="#334155" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M172 71L184 69" stroke="#111827" stroke-width="7" stroke-linecap="round"/>
''')

# 20. Gomas
def tire(cx, cy, R):
    tread = ''.join(
        f'<rect x="-4" y="{-R}" width="8" height="11" rx="2" fill="#0b1220" transform="translate({cx} {cy}) rotate({i * 360 / 28:.2f})"/>'
        for i in range(28))
    spokes = ''.join(
        f'<rect x="-5" y="{-(R - 28)}" width="10" height="{R - 36}" rx="5" fill="#e2e8f0" transform="translate({cx} {cy}) rotate({i * 72})"/>'
        for i in range(5))
    return (f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="#1f2937"/>{tread}'
            f'<circle cx="{cx}" cy="{cy}" r="{R - 12}" fill="#374151"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{R - 19}" stroke="#4b5563" stroke-width="1.5"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{R - 25}" fill="url(#rim)"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{R - 30}" fill="#475569"/>{spokes}'
            f'<circle cx="{cx}" cy="{cy}" r="10" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>'
            f'<path d="M{cx - R + 14} {cy - 18}A{R - 14} {R - 14} 0 0 1 {cx - 10} {cy - R + 14}" stroke="#fff" stroke-opacity=".12" stroke-width="6" stroke-linecap="round"/>')
svg('gomas', f'''
{shadow(120, 214, 98)}
{tire(152, 112, 62)}
{tire(98, 142, 66)}
''', lg('rim', ['#f8fafc', '#94a3b8'], x2=1, y2=1))

# 21. Cámara de reversa
def seg(color, y1, y2):
    lx = lambda y: 78 + (150 - y) * 0.44
    rx = lambda y: 150 - (150 - y) * 0.44
    return (f'<path d="M{lx(y1):.1f} {y1}L{lx(y2):.1f} {y2}M{rx(y1):.1f} {y1}L{rx(y2):.1f} {y2}" stroke="{color}" stroke-width="4" stroke-linecap="round"/>'
            f'<path d="M{lx(y2):.1f} {y2}h8M{rx(y2):.1f} {y2}h-8" stroke="{color}" stroke-width="4" stroke-linecap="round"/>')
svg('camara-reversa', f'''
{shadow(120, 208, 82)}
<path d="M104 160H124L128 176H100Z" fill="#1f2937"/>
<rect x="84" y="174" width="60" height="8" rx="4" fill="#111827"/>
<rect x="36" y="56" width="156" height="106" rx="12" fill="#111827"/>
<rect x="46" y="66" width="136" height="84" rx="6" fill="url(#scr2)"/>
<polygon points="56,150 172,150 136,96 92,96" fill="#64748b" opacity=".35"/>
{seg('#f64e43', 150, 134)}{seg('#ebb549', 132, 117)}{seg('#4ade80', 115, 100)}
<rect x="150" y="168" width="60" height="32" rx="10" fill="#1f2937"/>
<circle cx="180" cy="184" r="11" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
<circle cx="177" cy="181" r="3" fill="#7dd3fc"/>
<circle cx="160" cy="176" r="2" fill="#f87171"/><circle cx="160" cy="192" r="2" fill="#f87171"/>
<circle cx="200" cy="176" r="2" fill="#f87171"/><circle cx="200" cy="192" r="2" fill="#f87171"/>
''', lg('scr2', ['#475569', '#1e293b']))

# 22. Scooter
svg('scooter', f'''
{shadow(122, 208, 90, 7)}
<path d="M14 140H40M8 156H34M18 124H38" stroke="#fff" stroke-opacity=".65" stroke-width="4" stroke-linecap="round"/>
<path d="M34 178A20 20 0 0 1 70 170" stroke="#1f2937" stroke-width="6" stroke-linecap="round"/>
<path d="M178 174L156 54" stroke="#e2e8f0" stroke-width="10" stroke-linecap="round"/>
<path d="M175 172L154 58" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
<path d="M178 174L192 186" stroke="#e2e8f0" stroke-width="8" stroke-linecap="round"/>
<path d="M138 54H176" stroke="#111827" stroke-width="8" stroke-linecap="round"/>
<rect x="152" y="62" width="14" height="9" rx="2" fill="#0d90ab"/>
<circle cx="166" cy="108" r="12" fill="#fde047" opacity=".45" filter="url(#sh)"/>
<circle cx="166" cy="108" r="6" fill="#fde047"/>
<rect x="50" y="168" width="128" height="14" rx="7" fill="#1f2937"/>
<rect x="60" y="167" width="98" height="5" rx="2.5" fill="#0d90ab"/>
<path d="M90 182L80 198" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
<circle cx="52" cy="188" r="18" fill="#111827"/><circle cx="52" cy="188" r="8" fill="#9ca3af"/><circle cx="52" cy="188" r="3" fill="#475569"/>
<circle cx="192" cy="188" r="18" fill="#111827"/><circle cx="192" cy="188" r="8" fill="#9ca3af"/><circle cx="192" cy="188" r="3" fill="#475569"/>
''')

# 23. Café
def bean(x, y, r):
    return (f'<g transform="translate({x} {y}) rotate({r})"><ellipse rx="8" ry="11" fill="#5b3416"/>'
            '<path d="M0 -9C-4 -3 4 3 0 9" stroke="#2d1607" stroke-width="2"/></g>')
svg('cafe', f'''
{shadow(124, 214, 72)}
<path d="M64 58H176L184 206Q184 210 180 210H60Q56 210 56 206Z" fill="url(#kr)"/>
<path d="M74 58L68 210M166 58L172 210" stroke="#7c4a1e" stroke-opacity=".18" stroke-width="2"/>
<rect x="60" y="44" width="120" height="20" rx="4" fill="#b07a45"/>
<rect x="56" y="50" width="128" height="7" rx="3.5" fill="#78350f"/>
<circle cx="152" cy="80" r="6" fill="#78350f"/><circle cx="152" cy="80" r="2.5" fill="#d4a373"/>
<rect x="80" y="96" width="80" height="84" rx="10" fill="#f7ecd9"/>
<rect x="92" y="105" width="34" height="6" rx="3" fill="#78350f"/>
<circle cx="142" cy="122" r="7" fill="#ebb549"/>
<path d="M88 162L108 130L120 146L132 128L152 162Z" fill="#399552"/>
<rect x="92" y="168" width="56" height="4" rx="2" fill="#a0703f" opacity=".6"/>
{bean(190, 204, 20)}{bean(206, 194, -30)}{bean(42, 206, -15)}
''', lg('kr', ['#e0b07e', '#a0703f'], x2=1, y2=0))

# 24. Sofrito
def leaf(x, y, r, c):
    return (f'<g transform="translate({x} {y}) rotate({r})"><path d="M0 0C-8 -10 -8 -24 0 -32C8 -24 8 -10 0 0Z" fill="{c}"/>'
            '<path d="M0 0V-28" stroke="#166534" stroke-opacity=".5" stroke-width="1.5"/></g>')
svg('sofrito', f'''
{shadow(120, 212, 90)}
<rect x="112" y="92" width="78" height="106" rx="14" fill="#166534"/>
<rect x="112" y="92" width="78" height="106" rx="14" fill="url(#gl)"/>
<rect x="108" y="78" width="86" height="20" rx="6" fill="#ebb549"/>
<rect x="50" y="110" width="78" height="98" rx="14" fill="#15803d"/>
<rect x="50" y="110" width="78" height="98" rx="14" fill="url(#gl)"/>
<rect x="46" y="96" width="86" height="20" rx="6" fill="#f64e43"/>
<rect x="52" y="99" width="74" height="4" rx="2" fill="#fff" opacity=".35"/>
<rect x="60" y="140" width="58" height="38" rx="6" fill="#fff"/>
<path d="M76 168C76 154 90 150 100 150C100 162 92 170 76 168Z" fill="#399552"/>
{leaf(198, 206, 20, '#22c55e')}{leaf(206, 204, 50, '#4ade80')}{leaf(190, 206, -14, '#16a34a')}
<ellipse cx="34" cy="200" rx="9" ry="7" fill="#f64e43"/><ellipse cx="22" cy="206" rx="7" ry="6" fill="#ebb549"/>
<path d="M34 193v-5" stroke="#166534" stroke-width="2.5" stroke-linecap="round"/>
''', '<linearGradient id="gl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".35"/>'
     '<stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".15"/></linearGradient>')

# 25. Pique
bottle = 'M108 34H132V78C132 90 150 96 150 114V198C150 206 144 210 136 210H104C96 210 90 206 90 198V114C90 96 108 90 108 78Z'
svg('pique', f'''
{shadow(120, 216, 48)}
<path d="{bottle}" fill="#fff" fill-opacity=".28"/>
<g clip-path="url(#bt)">
<rect x="80" y="104" width="80" height="110" fill="#fcd34d" opacity=".9"/>
<ellipse cx="108" cy="152" rx="6" ry="30" fill="#dc2626" transform="rotate(12 108 152)"/>
<ellipse cx="124" cy="162" rx="6" ry="32" fill="#16a34a" transform="rotate(-8 124 162)"/>
<ellipse cx="138" cy="150" rx="5" ry="26" fill="#f97316" transform="rotate(16 138 150)"/>
<ellipse cx="114" cy="190" rx="5" ry="18" fill="#b91c1c" transform="rotate(-22 114 190)"/>
</g>
<rect x="94" y="132" width="52" height="42" rx="6" fill="#fff7ed"/>
<path d="M106 160C116 160 126 152 130 142C124 150 116 154 106 154Z" fill="#dc2626"/>
<rect x="102" y="164" width="36" height="3.5" rx="1.75" fill="#f64e43" opacity=".6"/>
<path d="{bottle}" stroke="#fff" stroke-opacity=".9" stroke-width="3"/>
<path d="M98 122V194" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>
<rect x="104" y="20" width="32" height="20" rx="5" fill="#d6a46b"/>
<path d="M110 24v12M120 24v12M130 24v12" stroke="#a16207" stroke-opacity=".4" stroke-width="1.5"/>
<path d="M164 198C190 198 206 178 210 152C200 172 186 184 162 188Z" fill="#dc2626"/>
<path d="M164 188C158 190 157 196 164 198" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
''', f'<clipPath id="bt"><path d="{bottle}"/></clipPath>')


# 26. Carro (sedán)
def car_wheel(cx):
    return (f'<circle cx="{cx}" cy="166" r="21" fill="#111827"/><circle cx="{cx}" cy="166" r="10" fill="#cbd5e1"/>'
            f'<circle cx="{cx}" cy="166" r="4" fill="#475569"/>')
svg('carro', f"""
{shadow(124, 190, 100, 8)}
<path d="M26 150C26 136 34 128 50 126L78 121L100 97C106 91 114 88 124 88H160C170 88 178 92 184 100L201 121C213 123 222 130 222 142V156C222 161 218 166 212 166H36C30 166 26 161 26 156Z" fill="url(#cb)"/>
<path d="M107 99L90 121H139V96H125C117 96 111 97 107 99Z" fill="#bae6fd"/>
<path d="M146 96V121H192L179 103C175 99 168 96 160 96Z" fill="#bae6fd"/>
<path d="M112 100L100 118" stroke="#fff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>
<path d="M141 124V160M86 124V158" stroke="#7f1d1d" stroke-opacity=".35" stroke-width="2"/>
<rect x="148" y="132" width="14" height="4" rx="2" fill="#7f1d1d" opacity=".5"/>
<rect x="96" y="132" width="14" height="4" rx="2" fill="#7f1d1d" opacity=".5"/>
<rect x="208" y="133" width="12" height="9" rx="3" fill="#fde68a"/>
<rect x="26" y="135" width="9" height="11" rx="3" fill="#fecaca"/>
<rect x="34" y="128" width="170" height="5" rx="2.5" fill="#fff" opacity=".3"/>
{car_wheel(74)}{car_wheel(180)}
""", lg('cb', ['#ff7a6f', '#f64e43', '#b91c1c']))

# 27. Casa en alquiler
svg('casa', f"""
{shadow(124, 206, 100)}
<path d="M38 204C36 170 40 140 52 116" stroke="#92400e" stroke-width="7" stroke-linecap="round"/>
<path d="M52 116C40 100 22 100 12 108C26 102 40 108 52 116ZM52 116C46 98 52 82 64 76C58 90 56 102 52 116ZM52 116C66 102 84 102 92 112C78 106 64 108 52 116ZM52 116C38 110 26 120 22 132C32 120 42 116 52 116Z" fill="#22c55e"/>
<rect x="64" y="104" width="120" height="98" fill="url(#hw)"/>
<polygon points="52,108 124,52 196,108" fill="#f64e43"/>
<polygon points="52,108 124,52 196,108 186,108 124,62 62,108" fill="#c9362c"/>
<rect x="160" y="62" width="14" height="30" fill="#9ca3af"/>
<rect x="110" y="148" width="28" height="54" rx="4" fill="#0d90ab"/><circle cx="132" cy="176" r="2.5" fill="#fde68a"/>
<rect x="76" y="122" width="26" height="24" rx="3" fill="#bae6fd"/><path d="M89 122V146M76 134H102" stroke="#fff" stroke-width="2.5"/>
<rect x="146" y="122" width="26" height="24" rx="3" fill="#bae6fd"/><path d="M159 122V146M146 134H172" stroke="#fff" stroke-width="2.5"/>
<path d="M210 204V150" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
<rect x="170" y="140" width="64" height="28" rx="5" fill="#ebb549" stroke="#a16207" stroke-width="2"/>
<text x="202" y="158" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="9" fill="#1c1a16">SE ALQUILA</text>
""", lg('hw', ['#ffffff', '#e2e8f0']))

# 28. Sofá (Muebles) y sofá con cartel de GRATIS (Donaciones)
sofa_base = f"""
{shadow(120, 198, 98)}
<rect x="46" y="170" width="8" height="18" rx="3" fill="#78350f"/><rect x="186" y="170" width="8" height="18" rx="3" fill="#78350f"/>
<rect x="52" y="78" width="136" height="62" rx="20" fill="#b91c1c"/>
<rect x="38" y="120" width="164" height="54" rx="16" fill="url(#sf)"/>
<rect x="62" y="122" width="56" height="24" rx="9" fill="#fb7185"/><rect x="122" y="122" width="56" height="24" rx="9" fill="#fb7185"/>
<rect x="26" y="102" width="34" height="74" rx="15" fill="url(#sf)"/><rect x="180" y="102" width="34" height="74" rx="15" fill="url(#sf)"/>
<rect x="60" y="86" width="120" height="6" rx="3" fill="#fff" opacity=".2"/>
"""
free_tag = """
<path d="M196 104L196 72" stroke="#1c1a16" stroke-width="1.5"/>
<g transform="translate(-14 4) rotate(10 214 60)"><path d="M190 48H232L240 60L232 72H190Z" fill="#ebb549" stroke="#a16207" stroke-width="2"/>
<circle cx="196" cy="60" r="3" fill="#a16207"/>
<text x="216" y="64" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="11" fill="#1c1a16">GRATIS</text></g>
"""
svg('sofa', sofa_base, lg('sf', ['#f87171', '#dc2626']))
svg('sofa-gratis', sofa_base + free_tag, lg('sf', ['#f87171', '#dc2626']))

# 29. Cajas de mudanza
def box(x, y, w, h, d=20):
    dy = d * 0.7
    return (f'<polygon points="{x},{y} {x + d},{y - dy} {x + w + d},{y - dy} {x + w},{y}" fill="#e7c393"/>'
            f'<polygon points="{x + w},{y} {x + w + d},{y - dy} {x + w + d},{y + h - dy} {x + w},{y + h}" fill="#b07a45"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#d4a373"/>'
            f'<rect x="{x + w / 2 - 6}" y="{y}" width="12" height="18" fill="#f7ecd9" opacity=".85"/>'
            f'<polygon points="{x + w / 2 - 6},{y} {x + w / 2 - 6 + d},{y - dy} {x + w / 2 + 6 + d},{y - dy} {x + w / 2 + 6},{y}" fill="#f7ecd9" opacity=".85"/>'
            f'<path d="M{x + 12} {y + h - 22}v-12l-5 5m5-5l5 5" stroke="#7c4a1e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>')
svg('cajas', f"""
{shadow(124, 206, 100)}
{box(34, 132, 86, 70)}{box(124, 140, 74, 62)}{box(74, 76, 80, 58)}
""")


# 30. Casa a la venta (techo de concreto, rejas y calentador solar, bien de aquí)
bars = lambda x: ''.join(f'<path d="M{x + 7 + i * 7} 118V146" stroke="#fff" stroke-width="2.2"/>' for i in range(4))
svg('casa-venta', f"""
{shadow(120, 208, 102)}
<rect x="84" y="68" width="40" height="16" rx="3" fill="#1e3a8a" transform="skewX(-14)"/>
<path d="M84 72H120" stroke="#93c5fd" stroke-width="2" transform="skewX(-14)"/>
<rect x="104" y="62" width="34" height="14" rx="7" fill="#e5e7eb"/><rect x="109" y="76" width="4" height="8" fill="#9ca3af"/><rect x="129" y="76" width="4" height="8" fill="#9ca3af"/>
<rect x="44" y="84" width="152" height="14" rx="3" fill="#ffffff"/>
<rect x="50" y="96" width="140" height="110" fill="url(#cv)"/>
<rect x="50" y="96" width="140" height="6" fill="#000" opacity=".06"/>
<rect x="60" y="114" width="36" height="36" rx="3" fill="#bae6fd"/>{bars(60)}
<rect x="144" y="114" width="36" height="36" rx="3" fill="#bae6fd"/>{bars(144)}
<rect x="104" y="146" width="32" height="60" rx="3" fill="#0d90ab"/><circle cx="130" cy="178" r="2.6" fill="#fde68a"/>
<rect x="100" y="140" width="40" height="8" rx="2" fill="#fff"/>
<circle cx="56" cy="200" r="14" fill="#22c55e"/><circle cx="74" cy="204" r="11" fill="#16a34a"/>
<path d="M212 208V138" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
<rect x="166" y="126" width="70" height="30" rx="5" fill="#f64e43" stroke="#b91c1c" stroke-width="2"/>
<text x="201" y="145" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="11" fill="#fff">SE VENDE</text>
""", lg('cv', ['#fef3c7', '#fcd9a0']))

# 31. Coche de bebé
spokes = lambda cx, cy: ''.join(
    f'<path d="M{cx} {cy}L{cx + 13 * math.cos(math.radians(a)):.1f} {cy + 13 * math.sin(math.radians(a)):.1f}" stroke="#94a3b8" stroke-width="2"/>'
    for a in range(0, 360, 45))
svg('coche-bebe', f"""
{shadow(122, 214, 86)}
<path d="M98 168L76 196M150 168L170 196" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
<path d="M186 120L212 76" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
<rect x="200" y="66" width="28" height="12" rx="6" fill="#1e293b" transform="rotate(-30 214 72)"/>
<path d="M48 120H192C192 154 164 176 120 176C76 176 48 154 48 120Z" fill="url(#cb2)"/>
<path d="M58 132H182" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>
<path d="M50 120A70 70 0 0 1 120 50V120Z" fill="url(#hood)"/>
<path d="M68 120A52 52 0 0 1 120 68M86 120A34 34 0 0 1 120 86" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>
<circle cx="150" cy="148" r="7" fill="#ebb549"/>
<circle cx="76" cy="196" r="18" fill="#1f2937"/>{spokes(76, 196)}<circle cx="76" cy="196" r="5" fill="#e5e7eb"/>
<circle cx="170" cy="196" r="18" fill="#1f2937"/>{spokes(170, 196)}<circle cx="170" cy="196" r="5" fill="#e5e7eb"/>
""", lg('cb2', ['#22b3cf', '#0d90ab', '#0b6f88']) + lg('hood', ['#0b6f88', '#0a5568'], x2=1, y2=1))

# 32. Mameluco de bebé
heart = lambda cx, cy, r: (f'M{cx} {cy + r * .9}C{cx - r * 1.4} {cy + r * .1} {cx - r * .9} {cy - r} {cx} {cy - r * .35}'
                           f'C{cx + r * .9} {cy - r} {cx + r * 1.4} {cy + r * .1} {cx} {cy + r * .9}Z')
svg('mameluco', f"""
{shadow(120, 214, 70)}
<path d="M92 46C100 58 140 58 148 46L178 58L200 92L174 108L164 96V156C164 176 150 190 138 196V206H102V196C90 190 76 176 76 156V96L66 108L40 92L62 58Z" fill="url(#mm)"/>
<path d="M92 46C100 58 140 58 148 46" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
<path d="M44 94L62 104M196 94L178 104" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
<path d="{heart(120, 112, 14)}" fill="#f64e43"/>
<circle cx="110" cy="200" r="3" fill="#fff"/><circle cx="120" cy="200" r="3" fill="#fff"/><circle cx="130" cy="200" r="3" fill="#fff"/>
<path d="M88 70V150" stroke="#fff" stroke-opacity=".3" stroke-width="5" stroke-linecap="round"/>
""", lg('mm', ['#fef3c7', '#fde68a', '#ebb549']))

# 33. Secadora de pelo ("blower")
svg('secadora', f"""
{shadow(118, 214, 78)}
<path d="M108 196C114 216 148 216 158 202C168 188 190 190 198 208" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
<rect x="88" y="112" width="38" height="88" rx="16" fill="url(#hd)" transform="rotate(10 107 112)"/>
<rect x="104" y="142" width="10" height="16" rx="3" fill="#ebb549" transform="rotate(10 107 112)"/>
<rect x="104" y="164" width="10" height="10" rx="3" fill="#399552" transform="rotate(10 107 112)"/>
<path d="M150 76L196 86V116L150 126Z" fill="#1e293b"/>
<rect x="34" y="70" width="126" height="60" rx="30" fill="url(#hd)"/>
<rect x="52" y="78" width="96" height="8" rx="4" fill="#fff" opacity=".28"/>
<circle cx="48" cy="100" r="30" fill="#334155"/>
<circle cx="48" cy="100" r="20" fill="none" stroke="#64748b" stroke-width="3"/>
<path d="M48 82V118M30 100H66M35 87L61 113M61 87L35 113" stroke="#64748b" stroke-width="2"/>
<path d="M204 90H226M206 101H234M204 112H222" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/>
""", lg('hd', ['#fb7185', '#e11d48', '#9f1239'], x2=0, y2=1))

# 34. Perfume
flower = lambda cx, cy, r, c: ''.join(
    f'<circle cx="{cx + r * math.cos(math.radians(a)):.1f}" cy="{cy + r * math.sin(math.radians(a)):.1f}" r="{r * .85:.1f}" fill="{c}"/>'
    for a in range(-90, 270, 72)) + f'<circle cx="{cx}" cy="{cy}" r="{r * .55:.1f}" fill="#fde68a"/>'
svg('perfume', f"""
{shadow(120, 212, 66)}
<rect x="96" y="44" width="48" height="38" rx="9" fill="url(#cap)"/>
<rect x="104" y="50" width="8" height="26" rx="4" fill="#fff" opacity=".4"/>
<rect x="106" y="80" width="28" height="18" rx="3" fill="#e5e7eb"/>
<rect x="68" y="96" width="104" height="110" rx="26" fill="#fff" fill-opacity=".55" stroke="#fff" stroke-width="3"/>
<path d="M72 128H168V180C168 194 158 202 144 202H96C82 202 72 194 72 180Z" fill="url(#liq)"/>
<rect x="90" y="138" width="60" height="38" rx="7" fill="#fff"/>
{flower(120, 157, 7, '#f64e43')}
<rect x="78" y="104" width="8" height="84" rx="4" fill="#fff" opacity=".6"/>
{flower(190, 186, 11, '#f64e43')}
<path d="M178 200C186 194 196 196 204 202" stroke="#16a34a" stroke-width="4" stroke-linecap="round"/>
""", lg('cap', ['#fcd34d', '#d97706', '#92400e'], x2=1, y2=1) + lg('liq', ['#fda4af', '#fb7185', '#e11d48']))

# 35. Cómoda de gavetas
drawers = ''.join(
    f'<rect x="{52 + c * 70}" y="{80 + r * 38}" width="64" height="32" rx="4" fill="#d9a066" stroke="#8a5a2b" stroke-width="1.5"/>'
    f'<circle cx="{84 + c * 70}" cy="{96 + r * 38}" r="4" fill="#fde68a" stroke="#a16207" stroke-width="1.5"/>'
    for r in range(3) for c in range(2))
svg('comoda', f"""
{shadow(120, 214, 92)}
<rect x="54" y="196" width="10" height="14" rx="2" fill="#5b3a1a"/><rect x="176" y="196" width="10" height="14" rx="2" fill="#5b3a1a"/>
<rect x="44" y="72" width="152" height="128" rx="6" fill="url(#wd)"/>
{drawers}
<rect x="36" y="60" width="168" height="14" rx="5" fill="#8a5a2b"/>
<rect x="66" y="42" width="22" height="18" rx="3" fill="#f64e43"/>
<path d="M77 42C70 30 62 28 56 30C64 32 70 36 77 42ZM77 42C78 28 86 20 94 20C88 26 82 32 77 42ZM77 42C86 34 96 34 102 38C94 38 86 40 77 42Z" fill="#22c55e"/>
<path d="M146 30H176L184 50H138Z" fill="#ebb549"/><rect x="158" y="50" width="6" height="10" fill="#475569"/>
""", lg('wd', ['#c98b4f', '#a8693a']))

# 36. Donaciones (caja con corazón)
svg('donaciones', f"""
{shadow(122, 210, 92)}
{box(58, 122, 104, 82, 26)}
<rect x="80" y="150" width="60" height="36" rx="6" fill="#fff" opacity=".9"/>
<path d="{heart(110, 168, 11)}" fill="#f64e43"/>
<path d="{heart(124, 70, 34)}" fill="url(#ht)"/>
<path d="M100 58C104 50 112 46 120 48" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>
<path d="M186 54l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="#ebb549"/>
<path d="M58 70l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#fff"/>
""", lg('ht', ['#ff7a6f', '#f64e43', '#c9362c']))

# 37. Brincolín (castillo inflable)
net = ''.join(f'<path d="M{66 + i * 18} 128V176" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>' for i in range(7))
net += ''.join(f'<path d="M62 {136 + i * 12}H178" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>' for i in range(4))
def tower(x):
    return (f'<rect x="{x}" y="88" width="36" height="104" rx="18" fill="url(#tw)"/>'
            f'<circle cx="{x + 18}" cy="88" r="20" fill="#f64e43"/>'
            f'<path d="M{x + 18} 68V46" stroke="#1c1a16" stroke-width="2"/><path d="M{x + 18} 46L{x + 34} 52L{x + 18} 58Z" fill="#399552"/>'
            f'<rect x="{x + 8}" y="100" width="6" height="70" rx="3" fill="#fff" opacity=".35"/>')
crenels = ''.join(f'<rect x="{58 + i * 26}" y="98" width="18" height="18" rx="6" fill="#4ade80"/>' for i in range(5))
svg('brincolin', f"""
{shadow(120, 214, 104)}
{crenels}
<rect x="56" y="108" width="128" height="76" rx="8" fill="url(#bw)"/>
<rect x="62" y="128" width="116" height="48" rx="6" fill="#0d90ab" fill-opacity=".35"/>
{net}
<rect x="28" y="176" width="184" height="30" rx="14" fill="url(#bb)"/>
<rect x="40" y="182" width="160" height="6" rx="3" fill="#fff" opacity=".35"/>
<path d="M98 206H142L152 222H88Z" fill="#ebb549"/>
{tower(26)}{tower(178)}
<ellipse cx="116" cy="40" rx="12" ry="15" fill="#ebb549"/><path d="M116 55C112 64 120 70 116 80" stroke="#1c1a16" stroke-width="1.2"/>
<ellipse cx="138" cy="52" rx="10" ry="13" fill="#fff"/><path d="M138 65C134 72 142 78 138 86" stroke="#1c1a16" stroke-width="1.2"/>
""", lg('tw', ['#fde68a', '#ebb549', '#d39a1f'], x2=1, y2=0) + lg('bw', ['#4ade80', '#399552']) + lg('bb', ['#ff7a6f', '#f64e43', '#c9362c']))

print('\n'.join(sorted(p.name for p in OUT.glob('*.svg'))))
