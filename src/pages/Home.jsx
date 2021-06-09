import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';

import { setCategory, setSortBy } from '../redux/actions/filters'
import { fetchPizzas } from '../redux/actions/pizzas'
import { addPizzaToCart } from '../redux/actions/cart'

const categoryArray = [
    'Мясные',
    'Вегетерианская',
    'Гриль',
    'Острые',
    'Закрытые'
];

const sortItems = [
    {
        name: 'популярности',
        type: 'popular',
        order: 'desc'
    },
    {
        name: 'цене',
        type: 'price',
        order: 'desc'
    },
    {
        name: 'алфавиту',
        type: 'name',
        order: 'desc'
    }
];

function Home() {

    const dispatch = useDispatch();
    const items = useSelector(({ pizzas }) => pizzas.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const {category, sortBy} = useSelector(({ filters }) => filters);

    React.useEffect(() => {

        //if (!items.length) {
            dispatch(fetchPizzas(sortBy, category));
        //}
    }, [sortBy, category]);

    const onSelectCategory = React.useCallback(index => {
        dispatch(setCategory(index));
    }, []);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddPizzaToCart = (obj) =>  {
        dispatch(addPizzaToCart(obj));
    };



    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClickCategory={onSelectCategory}
                    items={categoryArray}
                    activeCategory={category} />
                <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded 
                    ? items.map((obj, index) => 
                                        <PizzaBlock 
                                            onClickAddPizza={handleAddPizzaToCart} 
                                            key={`${obj}_${index}`} 
                                            addedCount={cartItems[obj.id] &&  cartItems[obj.id].items.length}
                                            {...obj} />
                                )
                    : Array(12)
                        .fill(new Date().getTime() / 1000)
                        .map((item, index) => <PizzaLoadingBlock key={`${index}_${item}`}/>)
                }
            </div>
        </div>
    )
}

export default Home
