import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button variation="primary" size="medium">
            Add new cabine
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="table">
        <Button variation="primary" size="medium" >Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

{
  /* // function AddCabin() {
//   const [isOpenModal, setisOpenModal] = useState(false);
//   return (
//     <div>
//       <Button
//         variation="primary"
//         size="medium"
//         onClick={() => setisOpenModal((show) => !show)}
//       >
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setisOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setisOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }  */
}

export default AddCabin;
