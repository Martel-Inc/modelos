import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../types";

// Renamed local Model to CatalogModel to avoid conflict with the global Model type from types.ts
type CatalogModel = {
  id: string;
  name: string;
  image: string;
  category: string;
};

// Defined props interface to match usage in App.tsx
interface CatalogProps {
  user: User | null;
  onLoginSuccess: (newUser: User) => void;
}

export default function Catalog({ user, onLoginSuccess }: CatalogProps) {
  const [models, setModels] = useState<CatalogModel[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "models"));
        const data: CatalogModel[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<CatalogModel, "id">)
        }));
        setModels(data);
      } catch (error) {
        console.error("Error loading models from Firestore:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-4 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {models.map(model => (
          <div
            key={model.id}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl hover:border-rose-500/50 transition-all group"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{model.name}</h3>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mt-1">{model.category}</p>
            </div>
          </div>
        ))}
      </div>
      {models.length === 0 && (
        <div className="text-center py-20 text-neutral-600 font-black uppercase tracking-widest italic">
          No se encontraron modelos en la base de datos.
        </div>
      )}
    </div>
  );
}