import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import Modal from "./Modal";
import MedicineForm from "./MedicineForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { state, dispatch } = useInventory();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const pharmacy_id = parseInt(id, 10);

  const filteredMedicines = state.medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalMedicines = () => state.medicines.length;
  // const getLowStockCount = () =>
  //   state.medicines.filter(
  //     (med) => med.quantity < med.threshold && med.quantity > 0
  //   ).length;
  const getOutOfStockCount = () =>
    state.medicines.filter((med) => med.quantity === 0).length;

  const AddToDatabase = async (medicine) => {
    try {
      const response = await axios.post(
        `http://localhost:9090/userApp/addMedincine`,
        medicine
      );

      if (response) {
        alert("your product added successfully.");
      } else {
        alert("Failed adding process");
      }
    } catch (error) {
      console.log(error);        
    }
  };

  const handleAddMedicine = (medicine) => {
    const addMedicine = {
      ...medicine,
      pharmacy_id: pharmacy_id,
      quantity: parseInt(medicine.quantity),
      price: parseFloat(medicine.price),
      medicine_id: parseInt(medicine.medicine_id, 10) || 0,
    };

    dispatch({
      type: "ADD_MEDICINE",
      payload: addMedicine,
    });

    AddToDatabase(addMedicine);
    setShowAddForm(false);
  };

  const updateToDatabase = async (medicine) => {
    try {
      const response = await axios.put(
        `http://localhost:9090/userApp/updateMedincine`,medicine
      );

      if (response.status === 200 || response.data.success) {
        alert("your product updated successfully.");
      } else {
        alert("Failed updating process");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMedicine = (medicine) => {
    const updatedMedicine = {
      ...medicine,
      pharmacy_id: parseInt(pharmacy_id),
      quantity: parseInt(medicine.quantity),
      price: parseFloat(medicine.price),
      medicine_id: parseInt(medicine.medicine_id, 10) || 0,
    };
    dispatch({
      type: "UPDATE_MEDICINE",
      payload: updatedMedicine,
      // payload: {
      //   ...medicine,
      //   quantity: parseInt(medicine.quantity),
      //   threshold: parseInt(medicine.threshold),
      //   price: parseFloat(medicine.price),
      // },
    });

    updateToDatabase(updatedMedicine);
    setShowUpdateForm(false);
    setSelectedMedicine(null);
  };

  const deleteToDatabase = async (name)=>{
    try{
      const response = await axios.delete(`http://localhost:9090/userApp/deleteMedincine/${pharmacy_id}`, {
        params: { name }
      })
      if (response.status ===200 || response.data.status){
        alert("Product deleted Successfully.")
      }else{
        alert("error while data deleting !")
      }

    }catch(error){
      console.log(error);
    }
  }

  const handleDelete = (name) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      dispatch({ type: "DELETE_MEDICINE", payload: name });
    }
    deleteToDatabase(name);
  };

  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pharmacy Inventory Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
        >
          Add New Medicine
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Medicines</h3>
          <p className="text-3xl font-bold">{getTotalMedicines()}</p>
        </div>
        {/* <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Low Stock</h3>
          <p className="text-3xl font-bold text-orange-500">
            {getLowStockCount()}
          </p>
        </div> */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Out of Stock</h3>
          <p className="text-3xl font-bold text-red-500">
            {getOutOfStockCount()}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search medicines..."
          className="w-full p-3 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {medicine.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {medicine.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        medicine.quantity === 0
                          ? "text-red-500"
                          : // : medicine.quantity < medicine.threshold
                            // (?) "text-orange-500"
                            "text-green-500"
                      }
                    >
                      {medicine.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${medicine.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        medicine.quantity === 0
                          ? "bg-red-100 text-red-800"
                          : // : medicine.quantity < medicine.threshold
                            // (?) "bg-orange-100 text-orange-800"
                            "bg-green-100 text-green-800"
                      }`}
                    >
                      {medicine.quantity === 0
                        ? "Out of Stock"
                        : // : medicine.quantity < medicine.threshold
                          // (?) "Low Stock"
                          "In Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedMedicine(medicine);
                        setShowUpdateForm(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(medicine.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medicine Modal */}
      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <h2 className="text-xl font-bold mb-4">Add New Medicine</h2>
        <MedicineForm
          onSubmit={handleAddMedicine}
          onCancel={() => setShowAddForm(false)}
        />
      </Modal>

      {/* Update Medicine Modal */}
      <Modal isOpen={showUpdateForm} onClose={() => setShowUpdateForm(false)}>
        <h2 className="text-xl font-bold mb-4">Update Medicine</h2>
        <MedicineForm
          initialData={selectedMedicine}
          onSubmit={handleUpdateMedicine}
          onCancel={() => setShowUpdateForm(false)}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
