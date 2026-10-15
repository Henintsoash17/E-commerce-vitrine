"use client";
import { Heart, Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
export default function ProductCard({
    product,
    onAdd,
    favorite,
    onFavorite,
}: {
    product: Product;
    onAdd: (p: Product) => void;
    favorite: boolean;
    onFavorite: (id: number) => void;
}) {
    return (
        <article className="product-card">
            <div className={`product-art art-${product.color}`}>
                <div
                    className="product-photo"
                    role="img"
                    aria-label={product.name}
                    style={{ backgroundImage: `url("${product.image}")` }}
                />
                {product.badge && (
                    <span
                        className={`badge ${product.badge === "Offre" ? "sale" : ""}`}
                    >
                        {product.badge}
                    </span>
                )}
                <button
                    className={`favorite ${favorite ? "liked" : ""}`}
                    onClick={() => onFavorite(product.id)}
                    aria-label={
                        favorite ? "Retirer des favoris" : "Ajouter aux favoris"
                    }
                >
                    <Heart
                        size={17}
                        fill={favorite ? "currentColor" : "none"}
                    />
                </button>
                <span className="art-label">
                    {product.category.toUpperCase()}
                </span>
            </div>
            <div className="product-info">
                <div className="category-label">{product.category}</div>
                <h3>{product.name}</h3>
                <div className="rating">
                    <Star size={13} fill="currentColor" />
                    <b>{product.rating.toFixed(1)}</b>
                    <span>({product.reviews} avis)</span>
                </div>
                <div className="product-bottom">
                    <div>
                        <strong>{formatPrice(product.price)}</strong>
                        {product.oldPrice && (
                            <del>{formatPrice(product.oldPrice)}</del>
                        )}
                    </div>
                    <button
                        className="add-button"
                        onClick={() => onAdd(product)}
                    >
                        <ShoppingBag size={16} />
                        <span>Ajouter</span>
                    </button>
                </div>
            </div>
        </article>
    );
}
