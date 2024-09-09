import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string'; // You'll need to install this package

const CategoryShop = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const id = queryParams.id;

  // Use `id` and `categoryName` as needed
  console.log('Category Name:', categoryName);
  console.log('Category ID:', id);

  // Fetch or display content based on the ID
  // ...

  return (
    <div>
      <h1>{categoryName}</h1>
      {/* Other content */}
    </div>
  );
};

export default CategoryShop;
