// hooks/useCart.ts
'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast"

export const useCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch cart data
  const { data: cart, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // Cache cart for 5 minutes
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to add item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Refetch cart data
      toast({
        title: "Added to Cart",
        description: "Item has been successfully added.",
        variant: "default", // Default success toast
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Please login to add items to cart.",
        variant: "destructive",
      });
    }
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to remove item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Refetch cart data
      toast({
        title: "Deleted from Cart",
        description: "Item has been successfully deleted.",
        variant: "default", // Default success toast
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete item to cart. Try again later.",
        variant: "destructive",
      });
    }
  });

  return { cart, isLoading, error, addToCartMutation, removeFromCartMutation };
};
