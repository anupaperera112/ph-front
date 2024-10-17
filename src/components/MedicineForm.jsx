import { useState } from "react";

const MedicineForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      medicine_id: "",
      name: "",
      description: "",
      quantity: null,
      threshold: "",
      price: null,
      // batchNumber: "",
      // expiryDate: "",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          required
          disabled={!!initialData}
          className="search_input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          type="text"
          name="description"
          required
          className="search_input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            required
            min="0"
            className=" search_input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Threshold
          </label>
          <input
            type="number"
            name="threshold"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.threshold}
            onChange={handleChange}
          />
        </div> */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="0.01"
            className="search_input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Batch Number
          </label>
          <input
            type="text"
            name="batchNumber"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.batchNumber}
            onChange={handleChange}
          />
        </div> */}
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Expiry Date
        </label>
        <input
          type="date"
          name="expiryDate"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.expiryDate}
          onChange={handleChange}
        />
      </div> */}

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {initialData ? "Update" : "Add"} Medicine
        </button>
      </div>
    </form>
  );
};

export default MedicineForm;
