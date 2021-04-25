const baseUrl = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  perPage: 12,

  fetchImages: async function () {
    const keyApi = '21325700-25e62cbcf61651ae4fee03a33';
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${keyApi}`;

    try {
      let response = await fetch(baseUrl + requestParams);
      let parsedRes = await response.json();
      this.incrementPage();
      return parsedRes.hits;
    } catch (err) {
      console.log(err);
    }
  },

  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
