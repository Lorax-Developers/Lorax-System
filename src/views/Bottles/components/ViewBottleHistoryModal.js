import React, { useEffect, useState } from "react";
import { Colxx } from "../../../components/common/CustomBootstrap";
import {Table } from "reactstrap";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import { LoraxLoader } from "../../../components/LoraxLoader";

const ViewBottleHistoryModal = ({ modalOpen, product, toggleModal }) => {
  const [loading, setIsLoading] = useState(true);
  const [response, setresponse] = useState({history:[]});
  
  useEffect(() => {
      var config = {
        method: 'get',
        url: `http://localhost:5000/api/bottlehistory?qrCode=${product.bottleQr}`,
        headers: { }
      };
      
      axios(config)
      //Success
      .then(function (response) {
        setresponse(response.data)
        setIsLoading(false)
      })
      //Failure
      .catch(function (error) {
        console.log(error);
        setIsLoading(false)
      });
  }, [])
 
  return (
    
    <Modal
      isOpen={modalOpen}
      toggle={() => toggleModal(false)}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={() => toggleModal(false)}>
        Bottle History for {product.bottleTitle}
      </ModalHeader>
      <ModalBody>
      {
        loading ?
        <LoraxLoader />
        :
        <Colxx xxs="12">
                <p>{response.message}</p>

                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Date Updated</th>
                      {/* <th>User</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      response.history.map((history, i) => 
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td><span class></span>{history.status}</td>
                        <td>{new Date(history.updated).toUTCString()}</td>
                        {/* <td>{history.userId}</td> */}
                      </tr>
                      )
                    }
                  </tbody>
                </Table>
          </Colxx>
      }
      
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={() => toggleModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewBottleHistoryModal;