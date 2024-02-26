import React, { useEffect, useState } from 'react';
import './index.scss';
import { PurchaseItem, getPurchases, deletePurchase } from '../../redux/purchaseSlice.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import Table from '../../components/table/index.tsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleMessage,handleHide } from '../../redux/toastSlice.ts';



const PagePurchases = () => {

    const reduxDispatch = useAppDispatch();
    const imgUrl = "https://info-shop-now.vijee.in/";
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const purchaseList = useAppSelector((state) => state.purchases.purchaseList);
    console.log(purchaseList);
   

    useEffect(() => {
        reduxDispatch(getPurchases())

    }, [reduxDispatch])

    const handleDelete = () => {
        if (selectedProductId) {
            console.log(selectedProductId);
            reduxDispatch(deletePurchase(selectedProductId))
                .then((data) => {
                    if (data.payload.data.status === 200) {
                        reduxDispatch(handleMessage("Purchase Deleted"));
                        setTimeout(()=>{
                            reduxDispatch(handleHide());
                           
                        },1000);
                        reduxDispatch(getPurchases());
                      
                        handleClose();
                    } else {
                        reduxDispatch(handleMessage(data.payload.data.message));
                        setTimeout(()=>{
                            reduxDispatch(handleHide());
                           
                        },1000);
                    }
                });
        }
        handleClose();
    };



    const handleClose = () => {
        setShow(false);
        setSelectedProductId(null);
    };

    const columns = [
        {
            label: "Image", accessor: "image", sortable: false, basecolumn: false,
            render: (row: PurchaseItem) =>
                <img style={{ width: "50px" }} src={`${imgUrl}${row.productDetails.image}`} alt={row.productDetails.name} />

        },
        {
            label: "Name", accessor: "guid", sortable: false, basecolumn: true,
            render: (row: PurchaseItem) => <div> {row.productDetails.name} </div>
        },

        { label: "Quantity", accessor: "count", sortable: false, basecolumn: false },

        {
            label: "Actions", render: (row: PurchaseItem) => {
                return <div>

                    <span onClick={() => {
                        setSelectedProductId(row.guid);
                        setShow(true);

                    }
                    }
                        style={{ color: "red" }} className="material-symbols-outlined">
                        delete
                    </span >

                </div>;
            }, accessor: "guid"
        },]



    return (

        <div className='purchase-box'>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title> Buy It Now </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> Do you want to delete? </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleDelete}> Yes </Button>
                    <Button variant="secondary" onClick={handleClose}> No </Button>
                </Modal.Footer>
            </Modal >

            <Table columns={columns} data={purchaseList} />


           
        </div>

    );


}

export default PagePurchases;