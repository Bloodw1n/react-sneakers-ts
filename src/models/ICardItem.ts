export interface ICardItem {
    id: string;
    title: string;
    price: number;
    imgUrl: string;
    parentId?: string;
}

export interface IOrderItem {
    id: string;
    items: ICardItem[];
    orderPrice: number;
}
