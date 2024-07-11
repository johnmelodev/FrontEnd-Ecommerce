import { ProductsFetchResponse } from "@/types/products-response";
import axios, { AxiosPromise } from "axios";
import { useQuery } from "react-query";
import { useFilter } from "./useFilter";
import { PriorityTypes } from "@/types/priority-types";
import { mountQuery } from "@/app/utils/graphql-filters";
import { SearchIcon } from '../components/icons/search-icon';
import { useDeferredValue } from "react";
import { Product } from '../types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {
    return axios.post(API_URL, { query });
}

const getFieldByPriority = (priority: PriorityTypes): { field: string, order: string } => {
    if (priority === PriorityTypes.NEWS) return { field: "created_at", order: "ASC" };
    if (priority === PriorityTypes.BIGGEST_PRICE) return { field: "price_in_cents", order: "DESC" };
    if (priority === PriorityTypes.MINOR_PRICE) return { field: "price_in_cents", order: "ASC" };
    return { field: "sales", order: "DESC" };
}
export function useProducts() {
    const { type, priority, search } = useFilter();
    const searchDeferred = useDeferredValue(search)
    const page = 1; // Defina a página ou passe como argumento se necessário
    const query = mountQuery(type, priority, page);    
    const { data } = useQuery(['products', type, priority], () => fetcher(query));

    const products = data?.data?.data?.allProducts;
    const filteredProducts = products?.filter(product => product.name.toLowerCase().includes(searchDeferred.toLowerCase()))

    return {
        data: filteredProducts,
    };
}
