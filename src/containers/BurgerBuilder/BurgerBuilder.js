import { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((ingredientName) => ingredients[ingredientName])
            .reduce((sum, el) => sum + el, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });

        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }

        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = this.state.ingredients[type] - 1;

        const newPrice = INGREDIENT_PRICES[type] - this.state.totalPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });

        this.updatePurchaseState(updatedIngredients);
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;