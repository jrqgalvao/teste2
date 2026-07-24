"use client";

import { useEffect, useState } from "react";
import { siteConfig as site, whatsappUrl } from "./site-config";

// Fotografias provisórias restauradas em 4K. Consulte IMAGE_SOURCES.md.
const images = {
  hero: "/images/4k/area-externa-piscina-4k.jpg",
  pool: "/images/4k/area-externa-piscina-4k.jpg",
  garden: "/images/4k/jardim-noturno-4k.jpg",
  room: "/images/4k/quarto-rustico-4k.jpg",
  roomTwo: "/images/4k/quarto-tijolos-01-4k.jpg",
  roomThree: "/images/4k/quarto-varanda-4k.jpg",
  roomFour: "/images/4k/quarto-tijolos-02-4k.jpg",
  patio: "/images/4k/quiosque-piscina-4k.jpg",
  coast: "/images/4k/praia-do-rosa-4k.jpg",
};

const nav = [
  ["A pousada", "#a-pousada"],
  ["Experiências", "#experiencias"],
  ["Piscina e quiosque", "#piscina"],
  ["Acomodações", "#acomodacoes"],
  ["Galeria", "#galeria"],
  ["Localização", "#localizacao"],
];

const accommodations = [
  {
    name: "Quarto com madeira",
    capacity: "Ambiente privativo",
    features: ["Ar-condicionado", "Banheiro privativo", "TV de tela plana"],
    image: images.room,
  },
  {
    name: "Quarto com tijolos aparentes",
    capacity: "Ambiente privativo",
    features: ["Ar-condicionado", "Banheiro privativo", "Varanda"],
    image: images.roomTwo,
  },
  {
    name: "Quarto com varanda",
    capacity: "Ambiente privativo",
    features: ["Ar-condicionado", "Banheiro privativo", "TV de tela plana"],
    image: images.roomThree,
  },
];

function ArrowUpRight() {
  return (
    <svg className="link-icon" aria-hidden="true" viewBox="0 0 20 20">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg className="link-icon" aria-hidden="true" viewBox="0 0 20 20">
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

function BookingLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`booking-links${compact ? " compact" : ""}`}>
      {whatsappUrl && (
        <a
          className="button button-primary"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Reservar pelo WhatsApp <ArrowUpRight />
        </a>
      )}
      <a
        className={`button ${whatsappUrl ? "button-ghost" : "button-primary"}`}
        href={site.booking}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver disponibilidade no Booking <ArrowUpRight />
      </a>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <a className="brand" href="#inicio" aria-label="Pousada Lua Rosa — início">
        <span className="brand-moon" aria-hidden="true" />
        <span>
          Pousada
          <strong>Lua Rosa</strong>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {nav.slice(0, 5).map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>

      <a
        className="header-book"
        href={site.booking}
        target="_blank"
        rel="noopener noreferrer"
      >
        Reservar <ArrowUpRight />
      </a>

      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        data-open={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>

      <nav
        id="mobile-menu"
        className={`mobile-nav${open ? " open" : ""}`}
        aria-label="Navegação mobile"
      >
        {nav.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href={site.booking}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          Ver disponibilidade
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-image">
        <img
          src={images.hero}
          alt="Piscina, jardim e quiosque da Pousada Lua Rosa"
        />
      </div>
      <div className="hero-wash" />
      <div className="hero-copy">
        <p className="eyebrow">Praia do Rosa · Santa Catarina</p>
        <h1>
          Pousada <em>Lua Rosa</em>
        </h1>
        <p className="hero-lead">
          Entre o verde e o mar, uma pousada com piscina e clima de casa na
          Praia do Rosa.
        </p>
        <BookingLinks />
      </div>
      <a className="scroll-cue" href="#a-pousada">
        <span>Descubra</span>
        <ArrowDown />
      </a>
    </section>
  );
}

function Introduction() {
  return (
    <section className="section intro" id="a-pousada">
      <div className="section-number">01</div>
      <div className="intro-copy reveal">
        <p className="eyebrow">Boas-vindas à Pousada Lua Rosa</p>
        <h2>Uma base gostosa para viver o Rosa.</h2>
        <p>
          Piscina ao ar livre, jardim e espaços de convivência esperam por você
          entre um passeio e outro.
        </p>
        <div className="micro-highlights">
          <span>Piscina ao ar livre</span>
          <span>Jardim e terraço</span>
          <span>Café da manhã</span>
        </div>
      </div>
      <figure className="intro-main-image reveal">
        <img
          src={images.garden}
          alt="Pousada Lua Rosa — jardim, piscina e área de descanso"
          loading="lazy"
        />
        <figcaption>O jardim ao cair da noite.</figcaption>
      </figure>
      <figure className="intro-small-image reveal">
        <img
          src={images.coast}
          alt="Paisagem costeira da Praia do Rosa"
          loading="lazy"
        />
      </figure>
    </section>
  );
}

function EditorialBreak() {
  return (
    <aside className="editorial-break" aria-label="Convite para desacelerar">
      <span className="editorial-kicker">Um convite do Rosa</span>
      <p>
        Dias para ir sem pressa, voltar com areia nos pés e deixar o tempo{" "}
        <em>respirar.</em>
      </p>
      <svg
        aria-hidden="true"
        viewBox="0 0 220 26"
        preserveAspectRatio="none"
      >
        <path d="M2 17c29-17 50 12 80-1s48-3 66 2 38 4 70-9" />
      </svg>
    </aside>
  );
}

const highlights = [
  [images.pool, "Piscina entre o verde", "Um mergulho antes ou depois da praia."],
  [images.patio, "Quiosque para reunir", "Mesas, churrasqueira e tempo compartilhado."],
  [images.roomTwo, "Noites bem cuidadas", "Quartos privativos para recuperar as energias."],
  [images.coast, "O Rosa por perto", "Mar, trilhas e centrinho no ritmo da região."],
];

function ExperienceHighlights() {
  return (
    <section className="section experiences" id="experiencias">
      <div className="experience-heading">
        <p className="eyebrow">Durante a estadia</p>
        <h2>O que faz parte dos seus dias.</h2>
      </div>
      <div className="experience-list">
        {highlights.map(([image, title, text]) => (
          <article key={title}>
            <img
              src={image}
              alt={`Pousada Lua Rosa — ${title}`}
              loading="lazy"
            />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PoolAndKiosk() {
  return (
    <section className="pool-section" id="piscina">
      <div className="pool-title">
        <p className="eyebrow light">O coração da Pousada Lua Rosa</p>
        <h2>
          Entre mergulhos
          <br />e encontros.
        </h2>
      </div>
      <figure className="pool-main-image">
        <img
          src={images.pool}
          alt="Pousada Lua Rosa — piscina e jardim da propriedade"
          loading="lazy"
        />
      </figure>
      <div className="pool-note">
        <span className="scribble">Sol, água e boa companhia</span>
        <p>
          A piscina refresca as tardes; ao lado, o quiosque e a churrasqueira
          recebem refeições demoradas, jogos e conversas entre amigos ou
          família.
        </p>
        <ul>
          <li>Piscina ao ar livre</li>
          <li>Quiosque e churrasqueira</li>
          <li>Convivência e jogos</li>
          <li>Vegetação e espreguiçadeiras</li>
        </ul>
        <a
          className="pool-book"
          href={site.booking}
          target="_blank"
          rel="noopener noreferrer"
        >
          Planejar meus dias no Rosa <ArrowUpRight />
        </a>
      </div>
      <figure className="pool-detail-image">
        <img
          src={images.patio}
          alt="Pousada Lua Rosa — quiosque junto à piscina"
          loading="lazy"
        />
      </figure>
    </section>
  );
}

function AccommodationsPreview() {
  return (
    <section className="section accommodations" id="acomodacoes">
      <div className="accommodation-heading">
        <div>
          <p className="eyebrow">Seu canto no Rosa</p>
          <h2>Privacidade para recarregar.</h2>
        </div>
        <p>
          Quartos com ar-condicionado, banheiro privativo, TV de tela plana e
          varanda, preparados para noites confortáveis no Rosa.
        </p>
      </div>
      <div className="room-grid">
        {accommodations.map((room, index) => (
          <article className="room-card" key={room.name}>
            <div className="room-image">
              <img
                src={room.image}
                alt={`Pousada Lua Rosa — ${room.name}`}
                loading="lazy"
              />
              <span>0{index + 1}</span>
            </div>
            <div className="room-info">
              <p>{room.capacity}</p>
              <h3>{room.name}</h3>
              <ul>
                {room.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                href={site.booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conhecer acomodação <ArrowUpRight />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const gallery = [
    [images.hero, "Área externa"],
    [images.patio, "Quiosque"],
    [images.room, "Quarto"],
    [images.roomTwo, "Acomodação com tijolos aparentes"],
    [images.roomFour, "Detalhes da acomodação"],
  ];
  return (
    <section className="gallery" id="galeria">
      <div className="gallery-heading">
        <p className="eyebrow light">Galeria</p>
        <h2>Por dentro da Pousada Lua Rosa.</h2>
      </div>
      <div className="gallery-grid">
        {gallery.map(([src, label], index) => (
          <figure key={label}>
            <img
              src={src}
              alt={`Pousada Lua Rosa — ${label}`}
              loading="lazy"
            />
            <figcaption>
              <span>0{index + 1}</span>
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="section location" id="localizacao">
      <div className="location-copy">
        <p className="eyebrow">Praia do Rosa · Imbituba</p>
        <h2>Mar, trilhas e o ritmo do Rosa.</h2>
        <p>
          A região combina paisagens costeiras, caminhos em meio ao verde e um
          centrinho cheio de personalidade para explorar sem roteiro rígido.
        </p>
        <div className="location-postcard">
          <span className="postcard-stamp" aria-hidden="true">
            SC
          </span>
          <small>Seu próximo destino</small>
          <address className="location-address">
            {site.address}
            <br />
            {site.city}, {site.municipality} — {site.state}
            <br />
            CEP {site.postalCode}
          </address>
          <a
            className="text-link"
            href={site.location}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir no mapa <ArrowUpRight />
          </a>
        </div>
        <div className="location-tags">
          <span>Praias</span>
          <span>Trilhas</span>
          <span>Centrinho</span>
          <span>Verão</span>
        </div>
      </div>
      <figure className="location-image">
        <img
          src={images.coast}
          alt="Paisagem da Praia do Rosa, em Santa Catarina"
          loading="lazy"
        />
        <figcaption>Praia do Rosa · Santa Catarina</figcaption>
      </figure>
    </section>
  );
}

const testimonials = [
  [
    "Atendimento próximo",
    "A atenção dos anfitriões aparece entre os elogios mais frequentes. Os relatos reforçam a sensação de acolhimento e cuidado durante a hospedagem.",
  ],
  [
    "Quartos bem cuidados",
    "Limpeza e organização são pontos destacados por hóspedes. O cuidado com os quartos cria uma base confortável para descansar entre os passeios.",
  ],
  [
    "Áreas para aproveitar",
    "Piscina, cozinha compartilhada e espaços comuns completam a estadia. São ambientes para alternar momentos de descanso e convivência na pousada.",
  ],
];

function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-heading">
        <div>
          <p className="eyebrow">Impressões de hóspedes</p>
          <h2 id="testimonials-title">Memórias que ficam.</h2>
          <p className="demo-label">
            Sínteses de comentários publicados por hóspedes no Booking.
          </p>
        </div>
        <aside className="testimonials-note">
          <span className="testimonial-moon" aria-hidden="true" />
          <small>Em poucas palavras</small>
          <p>Acolhimento, cuidado e bons espaços para viver o Rosa.</p>
        </aside>
      </div>
      <div className="quote-grid">
        {testimonials.map(([title, text], index) => (
          <article key={title}>
            <div className="quote-card-meta">
              <span>0{index + 1}</span>
              <small>Hóspedes destacam</small>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="quote-card-source">
              <span aria-hidden="true" />
              <small>Síntese do Booking</small>
            </div>
          </article>
        ))}
      </div>
      <div className="review-links">
        <a href={site.booking} target="_blank" rel="noopener noreferrer">
          Ver no Booking <ArrowUpRight />
        </a>
        <a href={site.tripadvisor} target="_blank" rel="noopener noreferrer">
          Ver no Tripadvisor <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}

function BookingCTA() {
  return (
    <section className="booking-cta">
      <img
        src={images.patio}
        alt="Pousada Lua Rosa — quiosque e piscina da propriedade"
        loading="lazy"
      />
      <div className="booking-cta-overlay" />
      <div className="booking-cta-content">
        <p className="eyebrow light">Praia do Rosa · Santa Catarina</p>
        <h2>Escolha suas datas no Rosa.</h2>
        <p>Confira a disponibilidade e planeje sua estadia.</p>
        <BookingLinks compact />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="footer-moon" aria-hidden="true" />
        <p>Pousada</p>
        <strong>Lua Rosa</strong>
        <small>Praia do Rosa · Santa Catarina</small>
      </div>
      <div>
        <h3>Navegue</h3>
        {nav.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </div>
      <div>
        <h3>Conecte-se</h3>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer">
          Instagram <ArrowUpRight />
        </a>
        <a href={site.booking} target="_blank" rel="noopener noreferrer">
          Booking <ArrowUpRight />
        </a>
        <a href={site.tripadvisor} target="_blank" rel="noopener noreferrer">
          Tripadvisor <ArrowUpRight />
        </a>
      </div>
      <div>
        <h3>Contato</h3>
        <p>
          {site.address}
          <br />
          {site.city}, {site.municipality} — {site.state}
        </p>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar pelo Instagram <ArrowUpRight />
        </a>
      </div>
      <p className="footer-note">
        © 2026 Pousada Lua Rosa · Praia do Rosa, Santa Catarina.
      </p>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <div
      className="whatsapp-float"
      role="img"
      aria-label="WhatsApp"
    />
  );
}

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }),
      { threshold: 0.15 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
        <EditorialBreak />
        <ExperienceHighlights />
        <PoolAndKiosk />
        <AccommodationsPreview />
        <Gallery />
        <Location />
        <Testimonials />
        <BookingCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
