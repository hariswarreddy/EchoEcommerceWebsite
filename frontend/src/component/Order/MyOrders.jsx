import React, { useEffect } from 'react';
import {DataGrid} from "@mui/x-data-grid"
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LaunchIcon from "@mui/icons-material/Launch";
import { clearErrors, myOrders } from '../../actions/orderAction';
import "../../App.css";
import "./myOrders.css";

const MyOrders = () => {
    const dispatch = useDispatch();
    const { loading, orders, error } = useSelector(state => state.myOrders);
    const { user } = useSelector(state => state.user);

    const columns = [
        {
            field: "id", headerName: "Order ID", minWidth: 300, flex: 1 ,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.row.id}`} >{params.row.id}</Link>
                )
            }
        },
        {
            field: "status",
            headerName: "status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "items Qnty",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
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
                    <Link to={`/order/${params.row.id}`} ><LaunchIcon/></Link>
                )
            }
        }
    ];
    const rows = [];
    orders && orders.forEach((item,index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount:item.totalPrice
            
        })
    });
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch,error])
    
  return (
      <>
          <MetaData title={`${user.name}'s Orders`} />
          <Toaster />
          {loading ? <Loader /> : (
              <div className="myOrdersPage">
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                  <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      disableSelectionOnClick
                      className='myOrdersTable'
                      autoHeight
                  />

              </div>
          )}
      </>
  )
}

export default MyOrders;