import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import ProductModel from "../../../Models/ProductModel";
import { productAddedAction } from "../../../Redux/ProductsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import "./AddProduct.css";

function AddProduct(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm<ProductModel>();

    async function addProduct(product: ProductModel) {
        try {
            const response = await axios.post<ProductModel>(globals.productsUrl, ProductModel.convertToFormData(product));
            const addedProduct = response.data; // The added product in the backend.
            store.dispatch(productAddedAction(addedProduct));
            alert("Product has been added. ID: " + addedProduct.id);
            history.push("/products"); // Go to that route!
        }
        catch (err) {
            alert("Error: " + err);
        }
    }

    return (
        <div className="AddProduct Box">

            <h2>Add new Product</h2>

            <form onSubmit={handleSubmit(addProduct)}>

                <label>Name: </label> <br />
                <input type="text" name="name" autoFocus ref={register({ required: true, minLength: 3 })} />
                {errors.name?.type === "required" && <span>Missing name.</span>}
                {errors.name?.type === "minLength" && <span>Name too short.</span>}
                <br /><br />

                <label>Price: </label> <br />
                <input type="number" name="price" step="0.01" ref={register({ required: true, min: 0})} />
                {errors.price?.type === "required" && <span>Missing price.</span>}
                {errors.price?.type === "min" && <span>Price can't be negative.</span>}
                <br /><br />

                <label>Stock: </label> <br />
                <input type="number" name="stock" ref={register({ required: true, min: 0})} />
                {errors.stock?.type === "required" && <span>Missing stock.</span>}
                {errors.stock?.type === "min" && <span>Stock can't be negative.</span>}
                <br /><br />

                <label>Image: </label> <br />
                <input type="file" name="image" accept="image/*" ref={register({ required: true})} />
                {errors.image?.type === "required" && <span>Missing image.</span>}
                <br /><br />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddProduct;
