import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
export default function ProductGrid({
    items,
    onAdd,
    favorites,
    onFavorite,
}: {
    items: Product[];
    onAdd: (p: Product) => void;
    favorites: number[];
    onFavorite: (id: number) => void;
}) {
    if (!items.length)
        return (
            <div className="empty-state">
                <span>⌕</span>
                <h3>Aucun produit trouvé</h3>
                <p>Essayez un autre mot-clé ou une autre catégorie.</p>
            </div>
        );
    return (
        <div className="product-grid">
            {items.map((p) => (
                <ProductCard
                    key={p.id}
                    product={p}
                    onAdd={onAdd}
                    favorite={favorites.includes(p.id)}
                    onFavorite={onFavorite}
                />
            ))}
        </div>
    );
}
