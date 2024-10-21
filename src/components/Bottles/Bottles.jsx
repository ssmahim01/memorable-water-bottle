import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css';
import { addToLS, getStoredCart, removeFromLS } from "../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
        .then(response => response.json())
        .then(data => setBottles(data))
    }, []);

    useEffect(() => {
        if(bottles.length > 0){
            const storedCartId = getStoredCart();
        console.log(storedCartId, bottles);

        const savedCart = [];
        for(const id of storedCartId){
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
                savedCart.push(bottle);
            }
            }
            setCart(savedCart);
        }
    }, [bottles]);

    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id);
    };

    const handleRemoveFromCart = id => {
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        removeFromLS(id);
    };

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
           
           <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
           <div className="bottles-container">
           {
            bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>)
           }
           </div>
        </div>
    );
};

export default Bottles;