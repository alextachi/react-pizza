import axios from 'axios';

export const setLoaded = (loaded) => ({
  type: 'SET_LOADED',
  payload: loaded
});

export const fetchPizzas = (sortBy, category) => (dispatch) => {

    dispatch(setLoaded(false));
    axios.get('/pizzas', {
      params: {
        category: category,
        _sort: sortBy.type,
        _order: sortBy.order
      }
    })
    .then(({ data }) => {
      dispatch(setPizzas(data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const setPizzas = (items) => ({
    type: 'SET_PIZZAS',
    payload: items
});