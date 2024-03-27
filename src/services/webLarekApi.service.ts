import { Api, ApiListResponse } from '../adapters/api.adapter';
import { IWebLarekApi } from '../service.ports';
import { Order, Product } from '../types';

export class WebLarekApi extends Api implements IWebLarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	async getProducts(): Promise<Product[]> {
		return this.get('/product').then((data: ApiListResponse<Product>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	async getProduct(id: Product['id']): Promise<Product> {
		return this.get(`/product/${id}`).then((item: Product) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	async postOrder(order: Order): Promise<void> {
		this.post('/order', order);
	}
}