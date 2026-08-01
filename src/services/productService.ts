
import { CATEGORIES } from '@/constants';
import type { Product, Category } from '@/types';

// ─── Filter / Pagination interfaces ────────────────────────────────────────

export interface ProductFilters {
  category?: string | null;
  searchQuery?: string;
  priceRange?: [number, number];
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'name-asc' | 'name-desc';
  featured?: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DynamicCategory {
  id: string;
  name: string;
  nameAr: string;
  count: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://pizza-api.obitachi3840.workers.dev';

// ─── Column normalizer ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeProduct(raw: Record<string, any>): Product {
  let imagesArray: string[] = [];
  if (Array.isArray(raw.images)) {
    imagesArray = raw.images;
  } else if (typeof raw.images === 'string') {
    try {
      imagesArray = JSON.parse(raw.images);
    } catch {
      imagesArray = raw.image ? [raw.image] : [];
    }
  } else if (raw.image) {
    imagesArray = [raw.image];
  }

  let tagsArray: string[] = [];
  if (Array.isArray(raw.tags)) {
    tagsArray = raw.tags;
  } else if (typeof raw.tags === 'string') {
    if (raw.tags.startsWith('[') || raw.tags.startsWith('{')) {
      try {
        tagsArray = JSON.parse(raw.tags);
      } catch {
        tagsArray = raw.tags.split(',').map((t: string) => t.trim());
      }
    } else {
      tagsArray = raw.tags.split(',').map((t: string) => t.trim());
    }
  }

  return {
    id:              raw.id != null ? Number(raw.id) : undefined,
    title:           raw.title           ?? raw.Title          ?? '',
    titleAr:         raw.titleAr         ?? raw.titleAR        ?? raw.title_ar       ?? '',
    description:     raw.description     ?? raw.Description    ?? raw.desc            ?? '',
    descriptionAr:   raw.descriptionAr   ?? raw.descriptionAR  ?? raw.description_ar  ?? raw.descAr ?? '',
    price:           Number(raw.price    ?? raw.Price          ?? 0),
    discount:        raw.discount        != null ? Number(raw.discount)        : undefined,
    category:        raw.category        ?? raw.Category       ?? '',
    categoryAr:      raw.categoryAr      ?? raw.categoryAR     ?? raw.category_ar     ?? '',
    featured:        Boolean(raw.featured ?? raw.Featured ?? false),
    image:           imagesArray[0]      ?? raw.image          ?? '',
    images:          imagesArray.length  ? imagesArray         : undefined,
    whatsappNumber:  raw.whatsappNumber  ?? raw.whatsNumber    ?? raw.whatsapp_number ?? raw.whats_number ?? raw.phone ?? '',
    createdAt:       raw.createdAt       ?? raw.created_at     ?? undefined,
    rating:          Number(raw.rating   ?? raw.Rating         ?? 0),
    reviews:         Number(raw.reviews  ?? raw.Reviews        ?? 0),
    inStock:         raw.inStock         != null ? Boolean(raw.inStock)
                   : raw.in_stock        != null ? Boolean(raw.in_stock)
                   : true,
    sku:             raw.sku             ?? raw.Sku             ?? raw.SKU            ?? '',
    tags:            tagsArray,
  };
}

// ─── Fetchers (To be wrapped by React Query) ───────────────────────────────

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products?pageSize=1000`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const result = await response.json();
    const list = Array.isArray(result.data) ? result.data : (Array.isArray(result) ? result : []);
    return list.map((item: any) => normalizeProduct(item));
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
}

export async function fetchProductById(id: string | number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return normalizeProduct(data);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
}


export async function addProductToDB(
  _product: Omit<Product, 'id' | 'createdAt'>
): Promise<Product | null> {
  // TODO: Implement Cloudflare fetch logic
  return null;
}

export async function updateProductInDB(
  _id: number,
  _updates: Partial<Omit<Product, 'id' | 'createdAt'>>
): Promise<Product | null> {
  // TODO: Implement Cloudflare fetch logic
  return null;
}

export async function deleteProductFromDB(_id: number): Promise<boolean> {
  // TODO: Implement Cloudflare fetch logic
  return true;
}

// ─── Pure Functions (For React Query Selectors) ─────────────────────────────

export function filterProducts(products: Product[], filters?: ProductFilters): Product[] {
  let result = products;

  if (filters?.featured) {
    result = result.filter((p) => p.featured);
  }

  if (filters?.category) {
    const catFilter = filters.category.toLowerCase().trim();
    result = result.filter((p) => {
      const pCat = p.category.toLowerCase().trim();
      const pCatAr = p.categoryAr ?? '';
      // Exact match on stored category value
      if (pCat === catFilter) return true;
      // Exact match on Arabic category
      if (pCatAr === filters.category) return true;
      // The URL slug (cat.id) is derived via deriveDynamicCategories which lowercases the category
      // So "Chicken Spicy" → id = "chicken spicy". Match if they are equal after normalization.
      // Also handle cases where slug may have dashes instead of spaces
      const catFilterNormalized = catFilter.replace(/-/g, ' ');
      if (pCat === catFilterNormalized) return true;
      return false;
    });
  }

  if (filters?.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.titleAr.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.descriptionAr.includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.categoryAr.includes(q) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (filters?.priceRange) {
    const [min, max] = filters.priceRange;
    const isDefaultRange = min === 0 && max === Infinity;
    if (!isDefaultRange) {
      result = result.filter((p) => {
        const discount = p.discount || 0;
        const sellPrice = discount > 0 ? p.price - p.price * (discount / 100) : p.price;
        return sellPrice >= min && (max === Infinity || sellPrice <= max);
      });
    }
  }

  if (filters?.sortBy) {
    result = sortProducts(result, filters.sortBy);
  }

  return result;
}

export function deriveDynamicCategories(products: Product[]): DynamicCategory[] {
  const map = new Map<string, { name: string; nameAr: string; count: number }>();

  for (const p of products) {
    if (!p.category) continue;
    const key = p.category.toLowerCase().trim();
    const existing = map.get(key);
    if (existing) {
      existing.count++;
    } else {
      map.set(key, {
        name: p.category,
        nameAr: p.categoryAr || p.category,
        count: 1,
      });
    }
  }

  return Array.from(map.entries())
    .map(([id, { name, nameAr, count }]) => ({ id, name, nameAr, count }))
    .sort((a, b) => b.count - a.count);
}

function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
      );
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

// ─── Static categories ──────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}

// For backwards compatibility / incremental refactoring
class ProductService {
  getCategories = getCategories;
  getCategoryById = getCategoryById;
  getDynamicCategories = async () => deriveDynamicCategories(await fetchAllProducts());
  getProducts = async (filters?: ProductFilters) => filterProducts(await fetchAllProducts(), filters);
  getFeaturedProducts = async () => filterProducts(await fetchAllProducts(), { featured: true });
  getProductById = fetchProductById;
  getRelatedProducts = async (id: string | number, limit: number = 4) => {
    const all = await fetchAllProducts();
    const numId = Number(id);
    const source = all.find((p) => p.id === numId);
    if (!source) return [];
    return all.filter((p) => p.id !== numId && p.category === source.category).slice(0, limit);
  };
  addProduct = addProductToDB;
  updateProduct = updateProductInDB;
  deleteProduct = deleteProductFromDB;
}

export const productService = new ProductService();
