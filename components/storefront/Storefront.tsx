"use client";
import { useEffect, useMemo, useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    ChevronDown,
    Headphones,
    ShieldCheck,
    Truck,
    Zap,
} from "lucide-react";
import Header from "./Header";
import CategoryStrip from "./CategoryStrip";
import ProductGrid from "./ProductGrid";
import CartDrawer, { type CartItem } from "./CartDrawer";
import { products, type Product } from "@/lib/products";

export default function Storefront() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Tout voir");
    const [sort, setSort] = useState("featured");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [notice, setNotice] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("Elecwave-cart");
            const savedFavorites = localStorage.getItem("Elecwave-favorites");
            if (savedCart) setCart(JSON.parse(savedCart));
            if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        } catch {
            // Ignore invalid local demo data.
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (loaded) localStorage.setItem("Elecwave-cart", JSON.stringify(cart));
    }, [cart, loaded]);

    useEffect(() => {
        if (loaded)
            localStorage.setItem(
                "Elecwave-favorites",
                JSON.stringify(favorites),
            );
    }, [favorites, loaded]);

    useEffect(() => {
        if (!notice) return;
        const timeout = window.setTimeout(() => setNotice(""), 2400);
        return () => window.clearTimeout(timeout);
    }, [notice]);

    const items = useMemo(() => {
        const query = search.trim().toLocaleLowerCase("fr");
        const filtered = products.filter(
            (product) =>
                (!query ||
                    `${product.name} ${product.category} ${product.description}`
                        .toLocaleLowerCase("fr")
                        .includes(query)) &&
                (category === "Tout voir" || product.category === category),
        );
        if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
        if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
        return filtered;
    }, [search, category, sort]);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    function addToCart(product: Product) {
        setCart((current) => {
            const existingItem = current.find(
                (item) => item.product.id === product.id,
            );
            return existingItem
                ? current.map((item) =>
                      item.product.id === product.id
                          ? {
                                ...item,
                                quantity: Math.min(
                                    item.quantity + 1,
                                    product.stock,
                                ),
                            }
                          : item,
                  )
                : [...current, { product, quantity: 1 }];
        });
        setNotice(`${product.name} ajouté au panier`);
    }

    function updateQuantity(id: number, amount: number) {
        setCart((current) =>
            current
                .map((item) =>
                    item.product.id === id
                        ? {
                              ...item,
                              quantity: Math.min(
                                  item.product.stock,
                                  item.quantity + amount,
                              ),
                          }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    }

    function toggleFavorite(id: number) {
        setFavorites((current) =>
            current.includes(id)
                ? current.filter((favoriteId) => favoriteId !== id)
                : [...current, id],
        );
    }

    return (
        <main>
            <Header
                count={cartCount}
                search={search}
                onSearch={setSearch}
                onCart={() => setCartOpen(true)}
            />

            <section className="hero">
                <div className="hero-copy">
                    <div className="eyebrow">
                        <span /> LA TECH, BIEN CHOISIE
                    </div>
                    <h1>
                        Le bon matériel.
                        <br />
                        Pour aller <em>plus loin.</em>
                    </h1>
                    <p>
                        Ordinateurs, composants et accessoires : trouvez la
                        technologie qui suit vos idées, sans compliquer le
                        choix.
                    </p>
                    <div className="hero-actions">
                        <a className="primary" href="#catalogue">
                            Explorer la boutique <ArrowRight size={17} />
                        </a>
                        <a className="text-link" href="#selection">
                            Voir la sélection <ArrowUpRight size={16} />
                        </a>
                    </div>
                    <div className="hero-proof">
                        <div className="proof-bubbles">
                            <span>H</span>
                            <span>M</span>
                            <span>T</span>
                            <span>+</span>
                        </div>
                        <div>
                            <b>4,9/5</b>
                            <small>par nos passionnés</small>
                        </div>
                        <i />
                        <div>
                            <b>1 200+</b>
                            <small>clients satisfaits</small>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div
                        className="hero-photo"
                        role="img"
                        aria-label="Ordinateur portable présenté dans un espace de travail lumineux"
                        style={{
                            backgroundImage: `url("${products[0].image}")`,
                        }}
                    />
                    <div className="float-tag">
                        <Zap size={15} /> Performance au quotidien
                    </div>
                    <div className="hero-device-caption">
                        <small>À LA UNE</small>
                        <b>AeroBook Pro 14</b>
                        <strong>4 299 000 Ar</strong>
                    </div>
                </div>
            </section>

            <section className="benefits" aria-label="Nos engagements">
                <div>
                    <span>
                        <Truck />
                    </span>
                    <p>
                        <b>Livraison suivie</b>
                        <small>Partout à Madagascar</small>
                    </p>
                </div>
                <div>
                    <span>
                        <ShieldCheck />
                    </span>
                    <p>
                        <b>Achat en confiance</b>
                        <small>Produits sélectionnés</small>
                    </p>
                </div>
                <div>
                    <span>
                        <BadgeCheck />
                    </span>
                    <p>
                        <b>Garantie incluse</b>
                        <small>Sur une sélection de produits</small>
                    </p>
                </div>
                <div>
                    <span>
                        <Headphones />
                    </span>
                    <p>
                        <b>Conseil humain</b>
                        <small>Avant et après l'achat</small>
                    </p>
                </div>
            </section>

            <section className="catalog-section" id="catalogue">
                <div className="section-heading">
                    <div>
                        <small className="eyebrow">TROUVEZ VOTRE MATCH</small>
                        <h2>
                            La tech, <em>sans détour.</em>
                        </h2>
                        <p>
                            Du matériel fiable pour travailler, créer et jouer.
                        </p>
                    </div>
                    <a className="text-link" href="#catalogue">
                        Tout le catalogue <ArrowRight size={16} />
                    </a>
                </div>
                <CategoryStrip active={category} onSelect={setCategory} />
                <div className="catalog-toolbar">
                    <div>
                        <b>{items.length} produits</b>
                        <span> sélectionnés pour vous</span>
                    </div>
                    <label>
                        Trier par
                        <select
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                        >
                            <option value="featured">En vedette</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="rating">Mieux notés</option>
                        </select>
                        <ChevronDown size={14} />
                    </label>
                </div>
                <ProductGrid
                    items={items}
                    onAdd={addToCart}
                    favorites={favorites}
                    onFavorite={toggleFavorite}
                />
            </section>

            <section className="feature-banner" id="selection">
                <div>
                    <small className="eyebrow">
                        POUR LES SETUPS QUI ENVOIENT
                    </small>
                    <h2>
                        Composez votre setup.
                        <br />
                        <em>À votre façon.</em>
                    </h2>
                    <p>
                        Composants, périphériques et accessoires : les bonnes
                        pièces pour un espace de travail ou de jeu qui vous
                        ressemble.
                    </p>
                    <a
                        className="primary"
                        href="#catalogue"
                        onClick={() => setCategory("Composants")}
                    >
                        Voir les composants <ArrowRight size={17} />
                    </a>
                </div>
                <div className="feature-chip" aria-hidden="true">
                    <div className="chip-orbit" />
                    <div className="chip-core">BW</div>
                    <span className="power-tag">
                        POWER
                        <br />
                        <b>UP ↗</b>
                    </span>
                </div>
            </section>

            <section className="newsletter">
                <div>
                    <small className="eyebrow">RESTEZ DANS LA COURSE</small>
                    <h2>
                        La bonne info, <em>pas de spam.</em>
                    </h2>
                    <p>
                        Les nouveautés et les bons plans tech, de temps en
                        temps.
                    </p>
                </div>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setNotice(
                            "Merci ! Inscription de démonstration enregistrée.",
                        );
                        event.currentTarget.reset();
                    }}
                >
                    <input
                        type="email"
                        required
                        placeholder="votre@email.com"
                        aria-label="Votre adresse e-mail"
                    />
                    <button className="primary" type="submit">
                        Je m'inscris <ArrowRight size={16} />
                    </button>
                    <small>Démo portfolio — aucune donnée n'est envoyée.</small>
                </form>
            </section>

            <footer id="footer">
                <div className="footer-top">
                    <div>
                        <div className="footer-brand">
                            <span className="brand-mark">⌁</span>
                            <b>
                                Elecwave<span className="brand-dot">.</span>
                            </b>
                        </div>
                        <p>
                            La tech qui vous fait avancer.
                            <br />
                            Sélectionnée avec curiosité, vendue avec confiance.
                        </p>
                    </div>
                    <div>
                        <b>Boutique</b>
                        <a href="#catalogue">Ordinateurs</a>
                        <a href="#catalogue">Composants</a>
                        <a href="#catalogue">Périphériques</a>
                    </div>
                    <div>
                        <b>Besoin d'aide ?</b>
                        <a href="#footer">Centre d'aide</a>
                        <a href="#footer">Livraison & retours</a>
                        <a href="#footer">Garanties</a>
                    </div>
                    <div>
                        <b>Le petit mot</b>
                        <p>
                            Projet de portfolio Next.js.
                            <br />
                            Catalogue et panier fictifs.
                        </p>
                        <span className="demo-pill">DEMO LOCALE</span>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2026 Elecwave. Projet fictif pour portfolio.</span>
                    <span>Fait avec soin ♥ et Next.js</span>
                </div>
            </footer>

            <CartDrawer
                open={cartOpen}
                items={cart}
                onClose={() => setCartOpen(false)}
                onQuantity={updateQuantity}
                onRemove={(id) =>
                    setCart((current) =>
                        current.filter((item) => item.product.id !== id),
                    )
                }
            />
            {notice && (
                <div className="toast" role="status">
                    ✓ &nbsp;{notice}
                    <button onClick={() => setNotice("")} aria-label="Fermer">
                        ×
                    </button>
                </div>
            )}
        </main>
    );
}
