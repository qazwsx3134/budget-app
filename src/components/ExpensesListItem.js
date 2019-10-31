import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import numeral from "numeral";

export const ExpenseListItem = ({dispatch , id, description, amount, createdAt}) => ( //解構props 抓很重要
        <Link className="list-item" to={`/edit/${id}`}>
            <div>
                <h3 className="list-tiem__title">{description}</h3>
                <span className="list-item__subtitle">{moment(createdAt).format("MMMM Do, YYYY")}</span>
            </div>
            <h3 className="list-tiem__data">{numeral(amount / 100).format('$0,0.00')}</h3>
        </Link>
);



export default connect()(ExpenseListItem);