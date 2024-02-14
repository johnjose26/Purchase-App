import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getProducts, addProduct, deleteProduct } from '../../redux/productSlice.ts';
import "./index.scss";
import Table from '../../components/table/index.tsx';
import { ProductItem } from '../../redux/productSlice.ts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductForm from '../../components/ProductForm.tsx/index.tsx';


const PageProducts = () => {

    const { userDetails } = useAppSelector(state => state.auth);
    const imgUrl = "http://localhost:8085/";

    const [show, setShow] = useState<boolean>(false);
    const [showFormModal, setShowFormModal] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [search, setSearch] = useState(String);
    const [error, setError] = useState<string>("");
    // console.log(selectedProductId);


    const columns = [{
        label: "Image", accessor: "image", sortable: false, basecolumn: false,
        render: (row: ProductItem) => <img style={{ width: "50px" }} src={`${imgUrl}${row.image}`} alt={row.name} />

    },
    { label: "Name", accessor: "name", sortable: true, basecolumn: true },

    {
        label: "Actions", render: (row: ProductItem) => {
            return <div>
                {userDetails && userDetails.type === 1 ? <span className="material-symbols-outlined" onClick={() => {
                    setSelectedProductId(row.guid);
                    setShowFormModal(true);


                }}> edit </span>
                    : <span className="material-symbols-outlined"> local_mall  </span>}

                {userDetails && userDetails.type === 1 && <span onClick={
                    () => {
                        handleEdit(row.guid);
                        // setShow(true);

                    }
                }

                    style={{ color: "red" }} className="material-symbols-outlined">
                    delete
                </span >}  </div>;
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
                        reduxDispatch(getProducts());
                        handleClose();
                    } else {
                        console.error("Failed to delete product.");
                    }
                });
        }
        handleClose();
    };

    const toggleFormModal = () => {
        setShowFormModal(!showFormModal);
        setSelectedProductId('');
    }

    const handleEdit = (selectedProductId) => {
        setSelectedProductId(selectedProductId);
        setShow(true);
    }


    return (
        <div>
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
                    <ProductForm onHide={toggleFormModal} guid={selectedProductId} />
                </Modal >
            </div>

        </div>
    );
};

export default PageProducts;
