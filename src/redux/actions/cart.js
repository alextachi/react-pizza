export const addPizzaToCart = (pizzaObj) => ({
    type: 'ADD_PIZZA_CART',
    payload: pizzaObj
});

export const clearCart = () => ({
    type: 'CLEAR_CART',
});


export const removeCartItem = (id) => ({
    type: 'REMOVE_CART_ITEM',
    payload: id
});

export const plusCartItem = (id) => ({
    type: 'PLUSE_CART_ITEM',
    payload: id
});

export const minuseCartItem = (id) => ({
    type: 'MINUSE_CART_ITEM',
    payload: id
});