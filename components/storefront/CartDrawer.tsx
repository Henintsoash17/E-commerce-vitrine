"use client";
import { Minus, Plus, Trash2, X, ArrowRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
export type CartItem = { product: Product; quantity: number };
export default function CartDrawer({
    open,
    items,
    onClose,
    onQuantity,
    onRemove,
}: {
    open: boolean;
    items: CartItem[];
    onClose: () => void;
    onQuantity: (id: number, d: number) => void;
    onRemove: (id: number) => void;
}) {
    if (!open) return null;
    const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    return (
        <div
            className="drawer-backdrop"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <aside className="cart-drawer">
                <div className="drawer-head">
                    <div>
                        <small>VOTRE SÉLECTION</small>
                        <h2>
                            Votre panier (
                            {items.reduce((s, i) => s + i.quantity, 0)})
                        </h2>
                    </div>
                    <button onClick={onClose} aria-label="Fermer">
                        <X />
                    </button>
                </div>
                {!items.length ? (
                    <div className="cart-empty">
                        <ShoppingBag size={34} />
                        <h3>Votre panier est vide</h3>
                        <p>Le prochain upgrade de votre setup vous attend.</p>
                        <button className="primary" onClick={onClose}>
                            Découvrir la boutique <ArrowRight size={16} />
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {items.map(({ product, quantity }) => (
                                <div className="cart-item" key={product.id}>
                                    <div
                                        className={`cart-thumb art-${product.color}`}
                                        role="img"
                                        aria-label={product.name}
                                        style={{
                                            backgroundImage: `url("${product.image}")`,
                                        }}
                                    />
                                    <div className="cart-item-info">
                                        <b>{product.name}</b>
                                        <span>
                                            {formatPrice(product.price)}
                                        </span>
                                        <div className="quantity">
                                            <button
                                                onClick={() =>
                                                    onQuantity(product.id, -1)
                                                }
                                                aria-label="Diminuer"
                                            >
                                                <Minus size={13} />
                                            </button>
                                            {quantity}
                                            <button
                                                onClick={() =>
                                                    onQuantity(product.id, 1)
                                                }
                                                aria-label="Augmenter"
                                            >
                                                <Plus size={13} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="remove"
                                        onClick={() => onRemove(product.id)}
                                        aria-label="Retirer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="drawer-summary">
                            <p>✓ Livraison offerte dès 250 000 Ar</p>
                            <div className="total">
                                <span>Sous-total</span>
                                <b>{formatPrice(total)}</b>
                            </div>
                            <button
                                className="primary"
                                onClick={() =>
                                    window.alert(
                                        "Démo portfolio : aucun paiement réel n'est connecté.",
                                    )
                                }
                            >
                                Passer la commande <ArrowRight size={16} />
                            </button>
                            <small>Démo locale — aucun paiement réel.</small>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
