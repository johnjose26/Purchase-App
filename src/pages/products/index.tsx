import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getProducts, deleteProduct } from '../../redux/productSlice.ts';
import "./index.scss";
import Table from '../../components/table/index.tsx';
import { ProductItem } from '../../redux/productSlice.ts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleMessage,handleHide } from '../../redux/toastSlice.ts';
import ProductForm from '../../components/ProductForm/index.tsx';
import PurchaseForm from '../../components/PurchaseForm/index.tsx';

const PageProducts = () => {

    const { userDetails } = useAppSelector(state => state.auth);
    const imgUrl = "https://info-shop-now.vijee.in/";
    const [show, setShow] = useState<boolean>(false); // Delete Modal
    const [showFormModal, setShowFormModal] = useState<boolean>(false); // Form Modal
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false); // Toast
    const [search, setSearch] = useState(String);
    const [showPurchaseFormModal, setShowPurchaseFormModal] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null); // Toast Message
    // console.log(selectedProductId);


    const columns = [{
        label: "Image", accessor: "image", sortable: false, basecolumn: false,
        render: (row: ProductItem) => <img style={{ width: "50px" }} src={`${imgUrl}${row.image}`} alt={row.name} />

    },
    { label: "Name", accessor: "name", sortable: true, basecolumn: true },

    userDetails && userDetails.type === 1 && { label: "Stock", accessor: "count", sortable: false, basecolumn: false },

    {
        label: "Actions", render: (row: ProductItem) => {
            return <div>
                <span className="material-symbols-outlined" onClick={() => {
                    setSelectedProductId(row.guid);
                    setShowPurchaseFormModal(true);

                }} > local_mall
                </span>
                {userDetails && userDetails.type === 1 ?
                    <span className="material-symbols-outlined" onClick={() => {
                        setSelectedProductId(row.guid);
                        setShowFormModal(true);

                    }}> edit
                    </span> : null

                }

                {userDetails && userDetails.type === 1 &&
                    <span onClick={() => {
                        setSelectedProductId(row.guid);
                        setShow(true);

                    }
                    }
                        style={{ color: "red" }} className="material-symbols-outlined">
                        delete
                    </span >}
            </div>;
        }, accessor: "guid"
    },]

    const productListOriginal = useAppSelector((state) => state.products.productList);
    const [productList, setProductList] = useState(Array<ProductItem>);
    const reduxDispatch = useAppDispatch();

    useEffect(() => {
        reduxDispatch(getProducts())

    }, [reduxDispatch])


    useEffect(() => {
        setProductList(productListOriginal.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        }))
    }, [productListOriginal, search])

    const handleClose = () => {
        setShow(false);
        setSelectedProductId(null);
    };

    const handleDelete = () => {
        if (selectedProductId) {
            console.log(selectedProductId);
            reduxDispatch(deleteProduct(selectedProductId))
                .then((data) => {
                    if (data.payload.data.status === 200) {
                        reduxDispatch(handleMessage("Product Deleted"));
                        setTimeout(()=>{
                            reduxDispatch(handleHide());
                           
                        },1000);

                        reduxDispatch(getProducts());
                     
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

    const toggleFormModal = () => {
        setShowFormModal(!showFormModal);
        setSelectedProductId("");
    }

    const togglePurchaseFormModal = () => {
        setShowPurchaseFormModal(!showPurchaseFormModal);
        setSelectedProductId("");
    }





    return (

        <div className='product-box'>
            <div className='product-header-wrap'>
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

            </div>

            <Table columns={columns} data={productList} />

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


            <Modal className='form-add-edit-product-modal' show={showFormModal} onHide={toggleFormModal}>
                <ProductForm onHide={toggleFormModal} guid={selectedProductId}  />
            </Modal >


            <Modal className='form-add-edit-purchase-modal' show={showPurchaseFormModal} onHide={togglePurchaseFormModal}>
                <PurchaseForm onHide={togglePurchaseFormModal} productId={selectedProductId}/>
            </Modal >

           
        </div>

    );
};

export default PageProducts;
