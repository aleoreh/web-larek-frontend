import { UiConfig } from '../app/uiConfig';
import { Product } from '../types';
import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { ProductView } from './ProductView';

interface IBasketViewModel {
	items: Product[];
	total: number;
}

interface IBasketViewEvents {
	deleteItem: (item: Product) => void;
	submit: () => void;
}

export class BasketView extends Component<IBasketViewModel> {
	private _items: HTMLElement;
	private _total: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		private events: IBasketViewEvents
	) {
		const container = cloneTemplate(template);
		super(container);

		this._items = ensureElement<HTMLElement>('.basket__list', container);
		this._total = ensureElement<HTMLElement>('.basket__price', container);

		container.addEventListener('submit', () => {
			events.submit();
		});
	}

	set items(value: Product[]) {
		const cards = value.map((product) => {
			const productView = new ProductView(
				UiConfig.templates.cardBasketTemplate,
				{
					onDeleteClick: () => {
						this.events.deleteItem(product);
					},
				},
				'basket'
			);
			console.log(productView, product);
			return productView.render(product);
		});
		this._items.replaceChildren(...cards);
	}

	set total(value: number) {
		this.setText(this._total, value);
	}

	render(value: IBasketViewModel) {
		console.log('rendering basket with', value);
		return super.render(value);
	}
}
