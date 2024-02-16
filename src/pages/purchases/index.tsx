import React, { useEffect, useState } from 'react';
import './index.scss';
import { getPurchases } from '../../redux/purchaseSlice.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';



const PagePurchases = () => {

    const reduxDispatch = useAppDispatch();
   
    // const purchaseList = useAppSelector((state) => state.purchases.purchaseList);
   
   
 
    useEffect(() => {
        reduxDispatch(getPurchases())

    }, [reduxDispatch])










    return(
        
        <div className='purchase-box'>
            {/* <div className='product-header-wrap'>
                <div className='product-search-container'>
                    <input type="text" placeholder='Search Product' value={search} onChange={e => setSearch(e?.target?.value)} />
            </div>
                {userDetails && userDetails.type === 1 &&
                    <div className='add-product-container' onClick={toggleFormModal}>
                        <span className="material-symbols-outlined">
                            category
                        </span>
                        <span className='add-product'>  Add Product </span>
                    </div>}

                </div> */}
            </div>

    );


}

export default PagePurchases;
