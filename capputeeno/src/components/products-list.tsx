"use client";

import { useProductsList } from "@/hooks/useProductsList";
import { ProductCard } from "@/components/product-card";
import styled from "styled-components";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 256px);
  grid-gap: 32px;
  max-width: 100%;
  margin-top: 32px;
`;

export function ProductsList() {
  const { data } = useProductsList();
  return (
    <ListContainer>
      {data?.map((product) => (
        <ProductCard
          key={product.id}
          title={product.name}
          price={product.price_in_cents}
          image={product.image_url}
          id={product.id}
        />
      ))}
    </ListContainer>
  );
}
