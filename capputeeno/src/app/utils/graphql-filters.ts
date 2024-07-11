import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";

export function getCategoryByType(type: FilterType): string {
    if (type === FilterType.MUGS) return "mugs";    
    if (type === FilterType.SHIRTS) return "t-shirts";
    return "";
}

export function getFieldByPriority(priority: PriorityTypes): {field: string, order: string} {
    if (priority === PriorityTypes.NEWS) return { field: "created_at", order: "ASC" };
    if (priority === PriorityTypes.BIGGEST_PRICE) return { field: "price_in_cents", order: "DESC" };
    if (priority === PriorityTypes.MINOR_PRICE) return { field: "price_in_cents", order: "ASC" };
    return { field: "sales", order: "DESC" };
}

export const mountQuery = (type: FilterType, priority: PriorityTypes, page: number): string => {
    const sortSettings = getFieldByPriority(priority);
    const categoryFilter = getCategoryByType(type);

    if (type === FilterType.ALL && priority === PriorityTypes.POPULARITY) {
        return `query {
            allProducts(sortField: "sales", sortOrder: "DESC") {
                id
                name
                price_in_cents        
                image_url    
            }
        }`;
    } else {
        return `query {
            allProducts(sortField: "${sortSettings.field}", sortOrder: "${sortSettings.order}"${categoryFilter ? `, filter: { category: "${categoryFilter}" }` : ''}) {
                id
                name
                price_in_cents        
                image_url
                category
            }
        }`;
    }
}