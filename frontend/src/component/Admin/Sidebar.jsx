import React from "react";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImportExportIcon from "@mui/icons-material/ImportExport"; 
import AddIcon from "@mui/icons-material/Add"; 
import PostAddIcon from "@mui/icons-material/PostAdd"; 
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {  TreeItem, SimpleTreeView } from "@mui/x-tree-view";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <Link to={"/"}>ECHO</Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      
      <SimpleTreeView
        collapseIcon={<ExpandMoreIcon />}
        expandIcon={<ImportExportIcon />}
      >
        <TreeItem itemId="1" label="Products">
          <TreeItem 
            itemId="2" 
            label="All" 
            icon={<PostAddIcon />} 
            onClick={() => navigate("/admin/products")} 
          />
          <TreeItem 
            itemId="3" 
            label="Create" 
            icon={<AddIcon />} 
            onClick={() => navigate("/admin/product")} 
          />
        </TreeItem>
      </SimpleTreeView>

      <Link to={"/admin/orders"}>
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to={"/admin/users"}>
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to={"/admin/reviews"}>
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
