import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import DataListView from "./components/DataListView";
import Pagination from "../../containers/pages/Pagination";
import ListPageHeading from "./components/ListPageHeading";
import AppLayout from "../../layout/AppLayout";
import { LoraxLoader } from "../../components/LoraxLoader";
import axios from "axios";
import { toast } from "react-toastify";
import ViewBottleHistoryModal from "./components/ViewBottleHistoryModal";
import "./bottles.scss";
import { useSelector } from "react-redux";

const Bottles = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, settotalPage] = useState("");
    const [toggleModal, settoggleModal] = useState(false);
    const [sortingStatus, setSortingStatus] = useState("All");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [bottles, setBottles] = useState([]);
    const [pageSize, setpageSize] = useState(20);
    const [pageNumber, setpageNumber] = useState(1);
    
    let retrievedUserDetails = useSelector(state => state.auth.user);

    const manufacturerId = retrievedUserDetails._id;

    useEffect(() => {
            setIsLoading(true);
            var config = {
                method: 'get',
                url: `http://localhost:5000/api/manufacturerbottles?manufacturerId=${manufacturerId}&bottleStatus=${sortingStatus}&startDate=${startDate}&endDate=${endDate}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
                headers: { }
              };
              
              axios(config)
              //Success
              .then(function (response) {
                setBottles(response.data.bottles);
                settotalPage(response.data.count);
                setIsLoading(false);
              })
              //Failure
              .catch(function (error) {
                setIsLoading(false);
                toast.error("Something went wrong while getting bottles")
              });

            }, [sortingStatus, startDate, endDate, pageNumber, pageSize]);    
            
            const onChangePage = (i) => {
                setpageNumber(i);
              };
            
            return(
        <AppLayout>
        <div className="disable-text-selection">
            <ListPageHeading
                setSortingStatus={setSortingStatus}
                setstartDate={setstartDate}
                setEndDate={setendDate}
                heading="menu.data-list"
                totalPage={totalPage}
                selectedOrderOption={sortingStatus}
                orderOptions={
                    [
                        "All",
                        "Manufactured",
                        "Outgoing",
                        "Delivered",
                        "Purchased",
                        "Deposited",
                        "Recycled",
                    ]
                }
            />
           
            {
                loading ?
                <LoraxLoader />
                :
                <>
                <Row>
                    {
                        bottles.length === 0 ?
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;No bottles were found, try modifying filters or uploading new bottles</p>
                        :
                        bottles.slice(0).reverse().map((item, i) => 
                        <DataListView
                            settoggleModal={settoggleModal}
                            key={i}
                            product={item}
                        />   
                        )
                    }
                </Row>
                <Pagination
              currentPage={pageNumber}
              totalPage={totalPage}
              onChangePage={(i) => onChangePage(i)}
              numberLimit={10}
            />
                </>
            }
           
        </div>
        {
            toggleModal !== false &&
            <ViewBottleHistoryModal
                modalOpen={true}
                product={toggleModal}
                toggleModal={() => settoggleModal(false)}
                // categories={categories}
          />
        }

        </AppLayout>
    )
}

export default Bottles;