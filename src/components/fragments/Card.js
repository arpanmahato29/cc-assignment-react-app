import React from "react";

const Card = ({product}) => {
    const cardTitle = product ? product.name : "";
    const cardDescrption = product ? product.description : "";
    const cardPrice = product ? product.price : "";

    return (
        <div className="card text-dark border border-info mx-3 mt-4">
          <div className="card-header lead">{cardTitle}</div>
          <div className="card-body">
            {/* <ImageHelper product={product} /> */}
            <p className="lead bg-success text-white font-weight-normal text-wrap">
              {cardDescrption}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
            <div className="row">
              {/* <div className="col-12">{showAddToCart(addtoCart)}</div>
              <div className="col-12">{showRemoveFromCart(removeFromCart)}</div> */}
            </div>
          </div>
        </div>
      );
    };
    
export default Card;
