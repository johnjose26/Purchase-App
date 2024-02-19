import React, { useEffect, useReducer, useState } from 'react';
import "./index.scss";
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { addPurchase, getPurchases } from '../../redux/purchaseSlice.ts';


interface State{
    name: string;
    // image: string;
    details: string;
    count: number;
    image: string;
    imageName: string;
 }

type reducerAction = Object;
 
const reducer = (state: State, action: reducerAction) => {
    return {
        ...state,
        ...action
    }
};
 
const initialState: State = {
    name: '',
    // image: '',
    details: '',
    count: 1,
    image:'',
    imageName:''
   
}
 

const PurchaseForm = ({onHide = ()=> {}, productId,toast, toastMessage}) => {

    // console.log(guid);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, details, image, imageName, count  } = state;
    const [showToast, setShowToast] = useState<boolean>(false);
    const reduxDispatch = useAppDispatch();
    const productList = useAppSelector((state) => state.products.productList);
    // console.log(productList);
    const imgUrl = "https://info-shop-now.vijee.in/";


    const handlePurchase = (e)=> {

        e.preventDefault();

        if(productId){
           
            reduxDispatch(addPurchase({ productId, count}))
            .then( data => {

                if (data.payload.data.status === 200) {
                    onHide();
                    toastMessage("Purchase Added");
                    toast();
                      
                    setTimeout(() => {
                        toast(false);

                    }, 2000);

                    // reduxDispatch(getPurchases())
                    // setShowToast(true);
                    // setTimeout(() => {
                    //     setShowToast(false);
                        
                    // }, 2000);
                    
                }

            })
        } 
    }

    useEffect(() => {
        if (productId) {
            const product = productList.find((product) => product.guid === productId);
            if (product) {
                dispatch({
                    name: product.name,
                    details: product.details,
                    // count: product.count,
                    image: `${imgUrl}${product.image}`,
                    imageName: product.imageName
                });
            }
        }
    }, [productId, productList]);



// console.log(image);

    return (

        <>
        <form className='signup-box' onSubmit={handlePurchase}>
            <h3> {name} </h3> 
            <p> {details} </p>

            <label className='form-group'>
            <img src={image}  alt={image}  style={{ maxWidth: "100px" }}/> 
            </label>

            <label className='form-group'>
                <div className='form-label'> Count </div>
                <input className='form-control password' type="number" value={count} onChange={e => dispatch({ count: e?.target?.value })} placeholder="Count" required />
            </label> 

            <div className='signup-footer'>
               
              <button className='btn-primary' type="submit"> Add To Cart  </button>  
             <button className='btn btn-secondary' type="button" onClick={onHide}> Cancel </button>       
            </div>
        </form>

        

        </>
    )
};

export default PurchaseForm;

