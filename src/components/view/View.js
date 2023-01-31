import { useState } from "react";
import { Modal } from "../modals/Modal";

import Navbar from "../navbar/Navbar";
import "./view.css";
const View = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="view">
      <Navbar title={"View Audience"} />
      <div className="viewDetails">
        <button className="button" onClick={openModal}>
          View Segment
        </button>
        {showModal ? (
          <Modal openModal={openModal} setShowModal={setShowModal} />
        ) : null}
      </div>
    </div>
  );
};

export default View;
