import React from "react";
import { Card, Badge, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";

const DataListView = ({ product, isSelect, settoggleModal }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id}>
        <Card
          className={classnames("d-flex flex-row", {
            active: isSelect
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            {/* <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
              <CardImg top alt={product.title} src={product.img} />
            </NavLink> */}

              <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.bottleTitle}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {product.bottleType.toUpperCase()}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {product.bottleSize}
              {product.sizeUnit}
              </p>
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
                {new Date(product.dateAdded).toUTCString()}
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={product.bottleStatus} pill>
                  {product.bottleStatus}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <Button onClick={() => settoggleModal(product)} className="rje btn btn-outline-primary mb-1">View History</Button>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
