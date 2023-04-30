export const API_URL = process.env.CMS_URL || "http://localhost:1337";

export const fromImgToUrl = (image) => {
	//default image when there is no image given to function
	if (!image) {
		return "/vercel.svg";
	}

	//for relative urls
	if (image.url.indexOf("/") === 0) {
		return `${API_URL}${image.url}`;
	}

	//default behavior
	return image.url;
};

export async function imgUrlFromId(id) {
	const url = `${API_URL}/api/products/${id}?populate=image`;
	const img = await fetch(url);
	const res = await img.json();
	const imgUrl = res.data.attributes.image.data.attributes.url;

	return `${API_URL}${imgUrl}`;
}
