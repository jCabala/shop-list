import { useEffect, useState } from 'react';
import '../styles/App.css';
import Product from './Product';
import { fetchProducts, statuses, translateStatus } from '../api';

function App() {
  const [products, setProducts] = useState(null);
  const [select, setSelect] = useState('all');

  useEffect(() => {
    const setInitialProducts = async () => {
      const newProducts = await fetchProducts();
      setProducts(newProducts);
    };

    setInitialProducts();
  }, []);

  const handleChange = e => {
    setSelect(e.target.value);
  };

  const filterByStatus = (statuses, selected) => {
    if (selected === 'all') {
      return true;
    }

    return statuses.indexOf(selected) > -1;
  };

  return (
    <div className='app'>
      <select onChange={handleChange}>
        {statuses.map((e, idx) => (
          <option value={e} key={`option-${idx}`}>
            {translateStatus(e)}
          </option>
        ))}
      </select>

      <div className='app__productsContainer'>
        {products &&
          products
            .filter(e => filterByStatus(e.status, select))
            .map(({ id, status, price, name }, idx) => (
              <Product
                key={`product-${id}`}
                status={status}
                name={name}
                price={price}
                id={id}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
