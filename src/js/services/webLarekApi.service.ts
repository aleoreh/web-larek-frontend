import { Api } from '../adapters/api.adapter';
import { IWebLarekApi } from '../app/ports';
import { Order, Product, ProductId, SentOrder } from '../models';

type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export class WebLarekApi implements IWebLarekApi {
	private api: Api;
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		this.api = new Api(baseUrl, options);
		this.cdn = cdn;
	}

	async getProducts(): Promise<Product[]> {
		return this.api.get('/product').then((data: ApiListResponse<Product>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	async getProduct(id: ProductId): Promise<Product> {
		return this.api.get(`/product/${id}`).then((item: Product) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	async postOrder(order: Order): Promise<SentOrder> {
		return this.api
			.post('/order', { ...order, items: order.items.map((x) => x.id) })
			.then((res: Pick<SentOrder, 'id' | 'total'>) => {
				return { ...order, ...res };
			});
		// ошибка обрабатывается в классе Api
	}
}