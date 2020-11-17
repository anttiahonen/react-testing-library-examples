import { doGetRequest } from '../httpClient';

const foodsUrl = `${process.env.REACT_APP_BACKEND_HOST}/foods`;

const getAllFoods = () => [
  createFood({name: 'Frozen yoghurt', calories: 159}),
  createFood({name: 'Ice cream sandwich', calories: 237}),
  createFood({name: 'Eclair', calories: 262}),
  createFood({name: 'Cupcake', calories: 305}),
  createFood({name: 'Gingerbread', calories: 356})
];

const createFood = ({name, calories}) => ({
  name: name,
  calories: calories,
  fat: 6.0,
  carbs: 25.0,
  protein: 3.0
});

const getAllFoodsActual = () => {
  return doGetRequest(foodsUrl, "foods");
};

export { getAllFoods, getAllFoodsActual };
