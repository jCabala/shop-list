const makeStatuses = status => status.split(',').filter(e => e !== '');

export const statuses = [
  'all',
  'recommended',
  'saleout',
  'bestseller',
  'promotion',
  'new',
];

export const translateStatus = status => {
  switch (status) {
    case 'recommended':
      return 'Rekomendowane';

    case 'saleout':
      return 'Wyprzedarz';

    case 'bestseller':
      return 'Najlepiej sprzedawane';

    case 'promotion':
      return 'Promocja';

    case 'new':
      return 'Nowy';

    case 'all':
      return 'Wszystko';

    default:
      return '';
  }
};

export const fetchProducts = async () => {
  try {
    const res = await fetch('./products/products.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const data = await res.json();
    const productKeys = Object.keys(data).filter(e => e !== 'response_code');

    const products = productKeys.map(key => ({
      id: data[key].prod_id,
      name: data[key].prod_name,
      price: data[key].prod_price,
      status: makeStatuses(data[key].prod_status),
    }));

    return products;
  } catch (err) {
    console.log(err.message);
  }
};
