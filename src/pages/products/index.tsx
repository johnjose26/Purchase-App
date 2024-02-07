import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getProducts } from '../../redux/productSlice.ts';
import "./index.scss";
import Table from '../../components/table/index.tsx';
import { ProductItem } from '../../redux/productSlice.ts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormComponent from '../../components/form/index.tsx';

 
const PageProducts = () => {
 
 
    const [show, setShow] = useState<boolean>(false);
    const [showFormModal,  setShowFormModal] = useState <boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
 
    const [search, setSearch] = useState(String);
 
    const columns = [{ label: "Image", accessor: "image", sortable: true, basecolumn: false },
    { label: "Name", accessor: "name", sortable: true, basecolumn: true },
 
    {
        label: "Actions", render: (row: ProductItem) => {
            return <div>
            <span  onClick={() => {
                setSelectedProductId(row.guid);
                setShow(true);
            }}
           
            style={{ color: "red" }} className="material-symbols-outlined">
                delete
            </span> </div>;
        }, accessor: "guid"
    },]
 
    const productListOriginal = useAppSelector((state) => state.products.productList);
    const [productList, setProductList] = useState(Array<ProductItem>);
 
 
 
    const reduxDispatch = useAppDispatch();
    useEffect(() =>{
        reduxDispatch(getProducts())
 
    },[reduxDispatch])
 
 
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
    }
 
 
 
 
    return (
        <div>
           <div className='product-box'>
            <div className='product-header-wrap'>
                <div className='product-search-container'>
                    <input type="text" placeholder='Search Product' value={search} onChange={e => setSearch(e?.target?.value)} />
 
                </div>
 
                <div className='add-product-container' onClick={toggleFormModal}>
                    <span className="material-symbols-outlined">
                        person_add
                    </span>
                    <span className='add-product'>  Add Product </span>
                </div>
 
            </div>
 
            <Table columns={columns} data={productList} />
           
            <div
                className="modal show box"
                style={{ display: show ? 'block': 'none', position: 'fixed', top:40, }}
            >
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={handleClose}>
                        <Modal.Title>Buy It Now </Modal.Title>
                    </Modal.Header>
 
                    <Modal.Body>
                        <p> Do you want to delete? </p>
                    </Modal.Body>
 
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleDelete}> Yes </Button>
                        <Button variant="secondary" onClick={handleClose}> No </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
 
 
         {showFormModal && (
           <>
            <div className='overlay' onClick={toggleFormModal}
              style={{position: 'fixed', top:0, left:0,
             width:"100%", height: "100%", background:"rgba(0, 0, 0, 0.6)",
             zIndex:1000
           
            }}> </div>
            <div
                style={{ display: showFormModal ? 'block': 'none', position: 'fixed', top:"50%",
                left:"50%", transform: 'translate(-50%, -50%)', zIndex:1001,
            }} >
           
                <Modal.Dialog>
                <FormComponent />
                </Modal.Dialog>
            </div>
              </> ) }
           
        </div>
        </div>
    );
};
 
export default PageProducts;