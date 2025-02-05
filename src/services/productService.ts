import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const API_URL = "https://fakestoreapi.com";

// Generate placeholder products for empty categories
const generatePlaceholderProducts = (category: string, startId: number): Product[] => {
  const products: Product[] = [];
  const count = Math.floor(Math.random() * 5) + 5; // Generate 5-10 products

  const categoryItems: { [key: string]: { items: string[], imageQueries: string[] } } = {
    "Home & Garden": {
      items: ["Garden Tools", "Indoor Plants", "Outdoor Furniture", "Home Decor", "Kitchen Appliances"],
      imageQueries: ["garden-tools", "indoor-plant", "patio-furniture", "home-decoration", "kitchen-appliance"]
    },
    "Books": {
      items: ["Fiction Novel", "Self Help Book", "Biography", "Science Book", "History Book"],
      imageQueries: ["book-cover", "self-help-book", "biography-book", "science-book", "history-book"]
    },
    "Sports": {
      items: ["Basketball", "Tennis Racket", "Soccer Ball", "Gym Equipment", "Running Shoes"],
      imageQueries: ["basketball-ball", "tennis-racket", "soccer-ball", "gym-equipment", "running-shoe"]
    },
    "Toys": {
      items: ["Action Figure", "Board Game", "Remote Control Car", "Building Blocks", "Educational Toy"],
      imageQueries: ["action-figure", "board-game", "rc-car", "lego-blocks", "educational-toy"]
    },
    "Beauty": {
      items: ["Lipstick", "Face Cream", "Perfume", "Makeup Kit", "Hair Care Set"],
      imageQueries: ["lipstick-cosmetic", "face-cream-beauty", "perfume-bottle", "makeup-kit", "hair-care-product"]
    },
    "Health": {
      items: ["Vitamins", "Fitness Tracker", "Yoga Mat", "Protein Powder", "First Aid Kit"],
      imageQueries: ["vitamin-supplements", "fitness-watch", "yoga-exercise", "protein-supplement", "first-aid"]
    },
    "Automotive": {
      items: ["Car Accessories", "Motor Oil", "Car Care Kit", "Dashboard Camera", "Tire Gauge"],
      imageQueries: ["car-accessory", "motor-oil", "car-cleaning", "dash-cam", "tire-pressure"]
    },
    "Pet Supplies": {
      items: ["Pet Food", "Pet Toys", "Pet Bed", "Grooming Kit", "Pet Carrier"],
      imageQueries: ["pet-food-bag", "dog-toy", "pet-bed", "pet-grooming", "pet-carrier"]
    }
  };

  const categoryData = categoryItems[category] || { items: ["Generic Item"], imageQueries: ["product"] };

  for (let i = 0; i < count; i++) {
    const index = i % categoryData.items.length;
    const itemName = categoryData.items[index];
    const imageQuery = categoryData.imageQueries[index];
    products.push({
      id: startId + i,
      title: `${itemName} - ${category}`,
      price: Number((Math.random() * 100 + 20).toFixed(2)),
      description: `High-quality ${itemName.toLowerCase()} for your ${category.toLowerCase()} needs`,
      category,
      image: `https://source.unsplash.com/400x400/?${encodeURIComponent(imageQuery)}`,
      rating: {
        rate: Number((Math.random() * 2 + 3).toFixed(1)), // Rating between 3-5
        count: Math.floor(Math.random() * 200 + 50) // 50-250 ratings
      }
    });
  }

  return products;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const apiProducts = await response.json();
  
  // Transform API products
  const transformedProducts = apiProducts.map((product: Product) => ({
    ...product,
    price: Number(product.price.toFixed(2)),
    image: product.image || `https://source.unsplash.com/400x400/?${encodeURIComponent(product.title)}`
  }));

  // Generate products for missing categories
  let allProducts = [...transformedProducts];
  const existingCategories = new Set(transformedProducts.map(p => p.category));
  
  const allCategories = [
    "Electronics", "Jewelery", "Men's clothing", "Women's clothing",
    "Home & Garden", "Books", "Sports", "Toys", "Beauty", "Health",
    "Automotive", "Pet Supplies"
  ];

  let startId = 1000; // Start IDs for generated products from 1000
  allCategories.forEach(category => {
    if (!existingCategories.has(category)) {
      const placeholderProducts = generatePlaceholderProducts(category, startId);
      allProducts = [...allProducts, ...placeholderProducts];
      startId += placeholderProducts.length;
    }
  });

  return allProducts;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const allProducts = await fetchProducts();
  const categoryProducts = allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
  
  if (categoryProducts.length === 0) {
    return generatePlaceholderProducts(category, 2000);
  }
  
  return categoryProducts;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category),
  });
};