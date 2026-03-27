"use client";

import { useState, useEffect, useRef } from "react";

/* ─── VULPINE-INSPIRED COLOR TOKENS ────────────────────
   Light, warm, residential — cream / linen / wood / charcoal
──────────────────────────────────────────────────────── */
const C = {
  bg:       "#FAFAF7",        // warm near-white
  linen:    "#F2EDE5",        // linen panel
  card:     "#FFFFFF",        // pure white card
  border:   "#E4DDD3",        // warm divider
  charcoal: "#1C1A17",        // deep warm black
  brown:    "#6B4F3A",        // warm wood brown (primary accent)
  tan:      "#C4A882",        // muted champagne gold
  muted:    "#8C7D6E",        // warm gray body text
  soft:     "#F7F3EE",        // softest linen
  green:    "#4A6741",        // muted sage (CTA)
};

/* ─── UNSPLASH CLOSET IMAGES ─── */
const IMGS = {
  hero:      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80&fit=crop",
  walk1:     "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop",
  walk2:     "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80&fit=crop",
  reach:     "https://images.unsplash.com/photo-1609602644879-e2a54481f78e?w=800&q=80&fit=crop",
  detail1:   "https://images.unsplash.com/photo-1595428773374-5e69b5f42a94?w=600&q=80&fit=crop",
  detail2:   "https://images.unsplash.com/photo-1558618047-3c8c76ca7d08?w=600&q=80&fit=crop",
  lifestyle: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&fit=crop",
};

/* ─── SMALL COMPONENTS ─── */

const Divider = ({ style = {} }) => (
  <div style={{ height: 1, background: C.border, ...style }} />
);

const Label = ({ children, color = C.brown }) => (
  <div style={{
    fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
    color, fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500, marginBottom: 14,
  }}>
    {children}
  </div>
);

const Display = ({ children, style = {} }) => (
  <h2 style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(34px, 5vw, 56px)",
    fontWeight: 300, color: C.charcoal,
    lineHeight: 1.1, letterSpacing: -.5,
    ...style,
  }}>
    {children}
  </h2>
);

const Body = ({ children, style = {} }) => (
  <p style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15, color: C.muted,
    lineHeight: 1.8, fontWeight: 300,
    ...style,
  }}>
    {children}
  </p>
);

const CTA = ({ children, variant = "dark", onClick, style = {} }) => {
  const [hov, setHov] = useState(false);
  const dark = variant === "dark";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? (dark ? C.brown : "transparent")
          : (dark ? C.charcoal : "transparent"),
        color: dark ? "#FFF" : C.charcoal,
        border: dark ? "none" : `1px solid ${C.charcoal}`,
        padding: dark ? "14px 34px" : "13px 33px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12, fontWeight: 500, letterSpacing: 2,
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "background .25s, color .25s",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

/* ─── FEATURE CARD ─── */
const FeatureCard = ({ icon, title, desc }) => (
  <div style={{
    padding: "32px 28px",
    borderTop: `2px solid ${C.border}`,
    background: C.card,
  }}>
    <div style={{ fontSize: 28, marginBottom: 18 }}>{icon}</div>
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 21, fontWeight: 400, color: C.charcoal,
      marginBottom: 12, lineHeight: 1.2,
    }}>
      {title}
    </div>
    <Body style={{ fontSize: 14 }}>{desc}</Body>
  </div>
);

/* ─── PROCESS STEP ─── */
const Step = ({ n, title, desc }) => (
  <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 48, fontWeight: 300, color: C.tan,
      lineHeight: 1, flexShrink: 0, width: 36, textAlign: "right",
    }}>
      {n}
    </div>
    <div style={{ paddingTop: 6 }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 20, fontWeight: 500, color: C.charcoal,
        marginBottom: 6,
      }}>
        {title}
      </div>
      <Body style={{ fontSize: 14 }}>{desc}</Body>
    </div>
  </div>
);

/* ─── GALLERY ITEM ─── */
const GalleryItem = ({ src, label, aspect = "4/3" }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div style={{
        aspectRatio: aspect,
        overflow: "hidden",
        background: C.linen,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform .6s cubic-bezier(.22,1,.36,1)",
          display: "block",
        }} />
      </div>
      {label && (
        <div style={{
          marginTop: 10,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
          color: C.muted,
        }}>
          {label}
        </div>
      )}
    </div>
  );
};

/* ─── LEAD FORM ─── */
function LeadForm() {
  const [form, setForm]   = useState({ name: "", phone: "", email: "", type: "" });
  const [done, setDone]   = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32, fontWeight: 300, color: C.charcoal,
          marginBottom: 12,
        }}>
          We'll be in touch.
        </div>
        <Body>Your consultation request has been received. Expect a call within one business day.</Body>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    background: C.bg,
    border: `1px solid ${C.border}`,
    padding: "13px 16px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, color: C.charcoal,
    transition: "border-color .2s",
    appearance: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input placeholder="First & Last Name"
          value={form.name} onChange={e => set("name", e.target.value)}
          style={inputStyle}
        />
        <input placeholder="Phone Number"
          value={form.phone} onChange={e => set("phone", e.target.value)}
          style={inputStyle}
        />
      </div>
      <input placeholder="Email Address"
        value={form.email} onChange={e => set("email", e.target.value)}
        style={inputStyle}
      />
      <select
        value={form.type} onChange={e => set("type", e.target.value)}
        style={{ ...inputStyle, color: form.type ? C.charcoal : C.muted }}
      >
        <option value="" disabled>Closet Type — Select One</option>
        <option>Walk-In Closet</option>
        <option>Reach-In Closet</option>
        <option>Master Suite Wardrobe</option>
        <option>Pantry / Laundry</option>
        <option>Custom — Multiple Spaces</option>
      </select>
      <CTA
        variant="dark"
        onClick={() => { if (form.name && form.phone) setDone(true); }}
        style={{ marginTop: 4, width: "100%", padding: "15px" }}
      >
        Request Free Design Consultation
      </CTA>
      <Body style={{ fontSize: 12, textAlign: "center" }}>
        No pressure. No obligation. We come to you.
      </Body>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Closets4Less() {
  const [navSolid, setNavSolid]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const sec = { maxWidth: 1100, margin: "0 auto", padding: "0 32px" };

  return (
    <div style={{ background: C.bg, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: navSolid ? "rgba(250,250,247,0.96)" : "transparent",
        backdropFilter: navSolid ? "blur(12px)" : "none",
        borderBottom: navSolid ? `1px solid ${C.border}` : "none",
        transition: "background .4s, border .4s",
        height: 64,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ ...sec, display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {/* Logo */}
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22, fontWeight: 400, color: C.charcoal,
              letterSpacing: -.3, lineHeight: 1,
            }}>
              Closets<span style={{ color: C.brown }}>4</span>Less
            </div>
            <div style={{
              fontSize: 8, letterSpacing: 3, textTransform: "uppercase",
              color: C.muted, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500, marginTop: 1,
            }}>
              Luxury · Maricopa County
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {["Our Work", "Collections", "Process", "Contact"].map(l => (
              <a key={l} href="#" style={{
                fontSize: 11, fontWeight: 500, letterSpacing: 1.5,
                textTransform: "uppercase", color: C.muted,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                transition: "color .2s",
              }}
                onMouseEnter={e => e.target.style.color = C.charcoal}
                onMouseLeave={e => e.target.style.color = C.muted}
              >
                {l}
              </a>
            ))}
            <CTA variant="dark" onClick={scrollToForm} style={{ padding: "10px 22px", fontSize: 10 }}>
              Free Consultation
            </CTA>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMGS.hero} alt="Luxury walk-in closet" style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
        }} />
        {/* Warm overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(28,26,23,0.58) 0%, rgba(28,26,23,0.25) 60%, rgba(28,26,23,0.1) 100%)",
        }} />

        <div style={{
          position: "relative", zIndex: 2,
          height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "0 64px 80px",
          maxWidth: 1100, margin: "0 auto",
        }}>
          <div className="fade-up d1">
            <Label style={{ color: "rgba(196,168,130,0.9)" }}>Closets4Less · Phoenix, AZ</Label>
          </div>
          <h1 className="fade-up d2" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 300, color: "#FAF9F6",
            lineHeight: 1.02, letterSpacing: -.5,
            marginBottom: 24, maxWidth: 700,
          }}>
            The closet<br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>you've always imagined.</em>
          </h1>
          <p className="fade-up d3" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, color: "rgba(250,249,246,0.75)",
            lineHeight: 1.75, maxWidth: 440,
            fontWeight: 300, marginBottom: 36,
          }}>
            Custom built-in closets designed for your life —
            installed with precision, priced without compromise.
          </p>
          <div className="fade-up d4" style={{ display: "flex", gap: 14 }}>
            <CTA onClick={scrollToForm} variant="dark">
              Book Free Consultation
            </CTA>
            <CTA variant="light" style={{ color: "#FAF9F6", borderColor: "rgba(250,249,246,0.45)", fontSize: 11 }}>
              View Our Work
            </CTA>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="fade-in d6" style={{
          position: "absolute", bottom: 32, right: 64,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <div style={{
            fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
            color: "rgba(250,249,246,0.45)", fontFamily: "'DM Sans', sans-serif",
            writingMode: "vertical-rl",
          }}>
            Scroll
          </div>
          <div style={{
            width: 1, height: 40,
            background: "linear-gradient(to bottom, rgba(250,249,246,0.45), transparent)",
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════
          INTRO STRIP
      ══════════════════════════════════ */}
      <section style={{ background: C.charcoal, padding: "22px 0" }}>
        <div style={{ ...sec, display: "flex", gap: 48, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {["Custom Design Included", "Licensed & Insured Install", "Maricopa County", "No-Obligation Estimate"].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: 1.5,
              textTransform: "uppercase", color: "rgba(250,249,246,0.65)",
            }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.tan }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          INTRO EDITORIAL
      ══════════════════════════════════ */}
      <section style={{ padding: "100px 0 80px" }}>
        <div style={{ ...sec, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "end" }}>
          <div>
            <Label>Our Philosophy</Label>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 14, fontWeight: 300, color: C.muted,
              lineHeight: 1.9, letterSpacing: .3,
            }}>
              A well-designed closet isn't about storage.<br />
              It's about starting the day with intention.
            </div>
          </div>
          <div>
            <Display style={{ marginBottom: 24 }}>
              Luxury doesn't have to mean<br />
              <em>out of reach.</em>
            </Display>
            <Body style={{ maxWidth: 540 }}>
              We bring the craftsmanship and attention to detail of a high-end interior
              designer — without the high-end price tag. Every closet we design is custom
              to your space, your style, and the way you actually live. No cookie-cutter
              systems. No big-box assembly. Just beautifully built closets, installed right,
              by a licensed contractor you can trust.
            </Body>
          </div>
        </div>
      </section>

      <Divider style={{ maxWidth: 1036, margin: "0 auto" }} />

      {/* ══════════════════════════════════
          GALLERY — BENTO STYLE
      ══════════════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ ...sec }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <Label>The Work</Label>
              <Display>Spaces we've<br /><em>transformed.</em></Display>
            </div>
            <CTA variant="outline" style={{
              color: C.charcoal, border: `1px solid ${C.charcoal}`,
              padding: "11px 26px", fontSize: 10,
            }}>
              View Full Gallery
            </CTA>
          </div>

          {/* Bento grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gridTemplateRows: "auto auto", gap: 16 }}>
            <div style={{ gridRow: "1 / 3" }}>
              <GalleryItem src={IMGS.walk1} label="Walk-In · Master Suite" aspect="3/4" />
            </div>
            <GalleryItem src={IMGS.walk2} label="Walk-In · His & Hers" aspect="4/3" />
            <GalleryItem src={IMGS.reach} label="Reach-In · Bedroom" aspect="4/3" />
            <GalleryItem src={IMGS.detail1} label="Drawer Detail" aspect="4/3" />
            <GalleryItem src={IMGS.detail2} label="Shoe Display" aspect="4/3" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          COLLECTIONS
      ══════════════════════════════════ */}
      <section style={{ background: C.linen, padding: "80px 0" }}>
        <div style={sec}>
          <Label>Collections</Label>
          <Display style={{ marginBottom: 12 }}>Built for every home.<br /><em>Designed for yours.</em></Display>
          <Body style={{ marginBottom: 48, maxWidth: 480 }}>
            Three signature collections. Endless finish options. One standard: exceptional.
          </Body>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {[
              {
                name: "The Classic", icon: "◻",
                desc: "Clean lines. Warm wood tones. Timeless organization that complements any home style.",
                features: ["Shaker-style hanging bars", "Pull-out shoe racks", "Soft-close drawers", "Built-in LED lighting"],
                price: "From $1,800 installed",
                color: C.tan,
              },
              {
                name: "The Luxe", icon: "◈",
                desc: "Floor-to-ceiling presence. Velvet-lined drawers. The kind of closet you show off to guests.",
                features: ["Full-height cabinetry", "Integrated island", "Mirror panels", "Jewelry + accessory drawers"],
                price: "From $4,200 installed",
                color: C.brown,
                featured: true,
              },
              {
                name: "The Studio", icon: "◇",
                desc: "Minimal footprint. Maximum function. Perfect for reach-ins, guest rooms, or smaller spaces.",
                features: ["Double hang systems", "Adjustable shelving", "Modular add-ons", "Clean matte finishes"],
                price: "From $950 installed",
                color: C.muted,
              },
            ].map((col, i) => (
              <div key={i} style={{
                background: col.featured ? C.charcoal : C.card,
                padding: "36px 28px",
                position: "relative",
              }}>
                {col.featured && (
                  <div style={{
                    position: "absolute", top: 20, right: 20,
                    fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                    background: C.brown, color: "#fff",
                    padding: "4px 10px", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                  }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: 24, color: col.color, marginBottom: 16 }}>{col.icon}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 26, fontWeight: 400,
                  color: col.featured ? "#FAF9F6" : C.charcoal,
                  marginBottom: 12,
                }}>
                  {col.name}
                </div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, color: col.featured ? "rgba(250,249,246,0.6)" : C.muted,
                  lineHeight: 1.75, fontWeight: 300, marginBottom: 24,
                }}>
                  {col.desc}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                  {col.features.map((f, j) => (
                    <div key={j} style={{
                      display: "flex", gap: 10, alignItems: "center",
                      fontSize: 12, fontFamily: "'DM Sans', sans-serif",
                      color: col.featured ? "rgba(250,249,246,0.75)" : C.muted,
                      fontWeight: 300,
                    }}>
                      <div style={{ width: 16, height: 1, background: col.color, flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
                <Divider style={{ background: col.featured ? "rgba(255,255,255,0.1)" : C.border, marginBottom: 20 }} />
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18, fontWeight: 400,
                  color: col.featured ? C.tan : C.brown,
                  marginBottom: 16,
                }}>
                  {col.price}
                </div>
                <button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  style={{
                    background: "transparent",
                    border: `1px solid ${col.featured ? "rgba(250,249,246,0.3)" : C.border}`,
                    color: col.featured ? "rgba(250,249,246,0.85)" : C.charcoal,
                    padding: "10px 20px", cursor: "pointer",
                    fontSize: 10, fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: 2, textTransform: "uppercase",
                    fontWeight: 500, width: "100%",
                    transition: "all .2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = col.featured ? "rgba(250,249,246,0.08)" : C.linen;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Get This Look
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY US
      ══════════════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={sec}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
            <div>
              <Label>Why Closets4Less</Label>
              <Display style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                Craft you can<br /><em>feel.</em>
              </Display>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <FeatureCard
                icon="🪵"
                title="Premium Materials"
                desc="Every build uses European-engineered panels, solid hardwood accents, and soft-close hardware rated for 100,000+ cycles."
              />
              <FeatureCard
                icon="📐"
                title="Custom to the Inch"
                desc="We measure your space precisely and build to fit — no gaps, no filler panels, no off-the-shelf compromises."
              />
              <FeatureCard
                icon="🏠"
                title="Licensed Contractor"
                desc="Fully licensed, bonded, and insured. Every installation is done right, on time, and backed by a craftsmanship guarantee."
              />
              <FeatureCard
                icon="💡"
                title="Integrated Lighting"
                desc="Every collection can include warm LED lighting — motion-activated, dimmable, and beautifully placed."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LIFESTYLE BAND
      ══════════════════════════════════ */}
      <section style={{ position: "relative", height: 480, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMGS.lifestyle} alt="Luxury home" style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(28,26,23,0.75) 0%, rgba(28,26,23,0.3) 60%)",
          display: "flex", alignItems: "center",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 64px" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 300, color: "#FAF9F6",
              lineHeight: 1.15, maxWidth: 520,
              marginBottom: 24,
            }}>
              "The details aren't the details.<br />
              <em>They make the design."</em>
            </div>
            <div style={{ fontSize: 11, letterSpacing: 2, color: C.tan, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              — Charles Eames
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROCESS
      ══════════════════════════════════ */}
      <section style={{ background: C.soft, padding: "80px 0" }}>
        <div style={{ ...sec, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          <div>
            <Label>The Process</Label>
            <Display style={{ marginBottom: 16 }}>
              Simple from<br /><em>start to finish.</em>
            </Display>
            <Body>
              Most installations are complete in one to two days.
              You get a custom-designed closet and never deal with the chaos of a full renovation.
            </Body>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 36, paddingTop: 8 }}>
            <Step
              n="01"
              title="Free In-Home Consultation"
              desc="We come to you. Measure the space, understand how you live, and walk through design options together."
            />
            <Divider />
            <Step
              n="02"
              title="Custom Design Presentation"
              desc="Within 48 hours, we present a 3D rendering of your new closet with finish options, pricing, and a firm install date."
            />
            <Divider />
            <Step
              n="03"
              title="Precision Installation"
              desc="Our crew arrives, protects your home, and installs everything clean and plumb. Usually one full day."
            />
            <Divider />
            <Step
              n="04"
              title="The Reveal"
              desc="We walk you through every detail, answer every question, and don't leave until you love it."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONSULTATION FORM
      ══════════════════════════════════ */}
      <section ref={formRef} style={{ padding: "80px 0", background: C.bg }}>
        <div style={{ ...sec, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <Label>Get Started</Label>
            <Display style={{ marginBottom: 20 }}>
              Book your free<br /><em>design consultation.</em>
            </Display>
            <Body style={{ marginBottom: 32 }}>
              We serve all of Maricopa County. Consultations are free,
              no-pressure, and done in your home so we can see the space
              exactly as it is.
            </Body>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "📍", label: "Serving All of Maricopa County" },
                { icon: "📅", label: "Available 7 Days a Week"        },
                { icon: "✓",  label: "Licensed & Insured Contractor"  },
                { icon: "⚡", label: "Most Installs Complete in 1 Day" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ fontSize: 16, width: 24, textAlign: "center" }}>{item.icon}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, color: C.muted, fontWeight: 300,
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: C.card, padding: "40px 36px",
            border: `1px solid ${C.border}`,
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 24, fontWeight: 400, color: C.charcoal,
              marginBottom: 6,
            }}>
              Request a Consultation
            </div>
            <Body style={{ fontSize: 13, marginBottom: 28 }}>
              Fill this out and we'll reach out within one business day to schedule.
            </Body>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <footer style={{
        background: C.charcoal, padding: "48px 0 36px",
        borderTop: `3px solid ${C.brown}`,
      }}>
        <div style={{ ...sec }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26, fontWeight: 300, color: "#FAF9F6",
                marginBottom: 4,
              }}>
                Closets<span style={{ color: C.tan }}>4</span>Less
              </div>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "rgba(250,249,246,0.35)", marginBottom: 16 }}>
                Luxury · Maricopa County
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, color: "rgba(250,249,246,0.45)",
                lineHeight: 1.75, fontWeight: 300, maxWidth: 280,
              }}>
                Custom built-in closets designed for your home and installed by a licensed contractor. Serving all of Maricopa County.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.tan, fontWeight: 500, marginBottom: 18 }}>
                Collections
              </div>
              {["Walk-In Closets", "Reach-In Closets", "Master Wardrobes", "Pantry Systems", "Custom Builds"].map(l => (
                <div key={l} style={{
                  fontSize: 13, color: "rgba(250,249,246,0.45)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300, marginBottom: 10, cursor: "pointer",
                }}>
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.tan, fontWeight: 500, marginBottom: 18 }}>
                Contact
              </div>
              {[
                { label: "closets4less.com",      sub: "Website" },
                { label: "Maricopa County, AZ",   sub: "Service Area" },
                { label: "Licensed Contractor",    sub: "G3 Home Remodel" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "rgba(250,249,246,0.35)", fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>
                    {item.sub}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(250,249,246,0.65)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider style={{ background: "rgba(250,249,246,0.08)", marginBottom: 24 }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 11, color: "rgba(250,249,246,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
              © 2026 Closets4Less · Built by SNRG Labs
            </div>
            <div style={{ fontSize: 11, color: "rgba(250,249,246,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
              Licensed · Insured · Maricopa County, AZ
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
