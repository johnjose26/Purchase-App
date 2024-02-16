import React, { useEffect, useState } from 'react';
import './index.scss';
import { PurchaseItem, getPurchases } from '../../redux/purchaseSlice.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import Table from '../../components/table/index.tsx';
 
 
const PagePurchases = () => {
 
    const reduxDispatch = useAppDispatch();
    const imgUrl = "https://info-shop-now.vijee.in/";
   
    const purchaseList = useAppSelector((state) => state.purchases.purchaseList);
    console.log(purchaseList);
 
    useEffect(() => {
        reduxDispatch(getPurchases())
 
    }, [reduxDispatch])
 
    const columns = [
        {
        label: "Image", accessor: "image", sortable: false, basecolumn: false,
        render: (row: PurchaseItem) =>
         <img style={{ width: "50px" }} src={`${imgUrl}${row.productDetails.image}`} alt={row.productDetails.name} />
       
    },
    { label: "Name", accessor:"guid", sortable: false, basecolumn: true ,
    render: (row: PurchaseItem) => <div> {row.productDetails.name} </div>
},
   
    { label: "Quantity", accessor:"count", sortable:false, basecolumn: false },
 
    {
        label: "Actions", render: (row: PurchaseItem) => {
            return <div>
             
                    <span className="material-symbols-outlined" onClick={() => {
                        // setSelectedProductId(row.guid);
                        // setShowFormModal(true);
 
                    }}> edit
                    </span>
 
                    <span onClick={() => {
                        // setSelectedProductId(row.guid);
                        // setShow(true);
 
                    }
                    }
                        style={{ color: "red" }} className="material-symbols-outlined">
                        delete
                    </span >
                   
            </div>;
        }, accessor: "guid"
    },]
 
   
 
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
 
                <Table columns={columns} data={purchaseList} />
            </div>
 
    );
 
 
}
 
export default PagePurchases;