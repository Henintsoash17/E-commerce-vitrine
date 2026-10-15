"use client";
import { Grid2X2, Laptop, Cpu, Keyboard, Headphones, Wifi } from "lucide-react";
import { categories } from "@/lib/products";
const icons = [Grid2X2, Laptop, Cpu, Keyboard, Headphones, Wifi];
export default function CategoryStrip({
    active,
    onSelect,
}: {
    active: string;
    onSelect: (v: string) => void;
}) {
    return (
        <div className="category-strip">
            {categories.map((name, i) => {
                const Icon = icons[i];
                return (
                    <button
                        key={name}
                        className={`category-chip ${active === name ? "selected" : ""}`}
                        onClick={() => onSelect(name)}
                    >
                        <Icon size={17} />
                        {name}
                    </button>
                );
            })}
        </div>
    );
}
