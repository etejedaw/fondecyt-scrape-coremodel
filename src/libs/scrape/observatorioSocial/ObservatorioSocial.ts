import { Getter, HtmlExtractor } from "../../htmlExtractor";
import Scraper from "./Scraper";
import Output from "../output.interface";

class ObservatorioSocial {
	readonly #url: string;
	readonly #extractor: HtmlExtractor;
	readonly #BASE_URL = "http://observatorio.ministeriodesarrollosocial.gob.cl/";

	constructor(url: string, extractor: HtmlExtractor) {
		this.#url = this.#checkUrl(url);
		this.#extractor = extractor;
	}

	async search(): Promise<Output[] | undefined> {
		const getter = await Getter.build(this.#url, this.#extractor);
		const html = getter.html;
		if (!html) return;
		const scraper = new Scraper(html, this.#BASE_URL);
		return scraper.getData();
	}

	async getByTitle(title: string): Promise<Output | undefined> {
		const allData = await this.search();
		if (!allData) return;
		const data = allData.find(data => data.title === title.trim());
		if (!data) return;
		return data;
	}

	#checkUrl(url: string): string {
		const baseUrl = new URL(this.#BASE_URL);
		const inputUrl = new URL(url);
		if (baseUrl.origin !== inputUrl.origin)
			throw new Error("Input url does not match ObervatorioSocial url");
		return url;
	}
}

export default ObservatorioSocial;
