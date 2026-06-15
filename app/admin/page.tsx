import { getProducts } from "@/lib/catalog";
import { getAllStock } from "@/lib/stock";
import { StockRow } from "./stock-row";

export default async function AdminPage() {
  const [products, stockMap] = await Promise.all([
    getProducts("es"),
    getAllStock(),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#21402d]">
        Inventario
      </h1>
      <p className="mt-2 text-sm text-[#516154]">
        Ajusta las unidades disponibles por producto. Con 0 unidades el producto aparece como agotado.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {products.map((product) => (
          <StockRow
            key={product.id}
            productId={product.id}
            title={product.title}
            size={product.size}
            quantity={stockMap.get(product.id) ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
