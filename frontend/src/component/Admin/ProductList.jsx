import React, { useEffect } from 'react'
import "./productList.css";
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from '@mui/material';

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProducts());
    },[dispatch,error,deleteError,isDeleted,navigate])

    const columns = [
        {
            field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type:"Number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type:"Number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.3,
            minWidth: 150,
            type: "Number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.row.id}`} ><EditIcon /></Link>
                        <Button onClick={()=>deleteProductHandler(params.row.id)}><DeleteIcon /></Button>
                    </>
                )
            }
        }
    ];
    const rows = [];
    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name:item.price
        })
    });

  return (
      <>
          <MetaData title={"All Products -- Admin"} />
          <Toaster />
          <div className="dashboard">
              <Sidebar />
              <div className="productListContainer">
                  <h1 id="productListHeading">ALL PRODUCTS</h1>
                  <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={100}
                      disableSelectionOnClick
                      className="productionListTable"
                    //   autoHeight
                    //   sx={{ overflow:"auto",scrollBehavior:"smooth" }}
                  />
              </div>
          </div>
      </>
  )
}

export default ProductList