/**
 * Модели: их типы и связанные с ними вспомогательные функции
 */

import { isEmpty } from '../utils/utils';

export type ProductId = string;

export type Product = {
	id: ProductId;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export function formatProductPrice(price: Product['price']) {
	if (isEmpty(price)) return '';

	const lastDigit = price % 10;

	return lastDigit === 0 || lastDigit >= 5
		? `${price} синапсов`
		: lastDigit === 1
		? `${price} синапс`
		: `${price} синапса`;
}

export type PaymentType = 'card' | 'cash';

export type Order = {
	payment: PaymentType;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: Product[];
};

type OrderId = string;
type OrderTotal = number;

export type SentOrder = { id: OrderId; total: OrderTotal };

export function emptyOrder(): Order {
	return {
		payment: 'card',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};
}

export function togglePaymentType(value: PaymentType): PaymentType {
	return value === 'card' ? 'cash' : 'card';
}
