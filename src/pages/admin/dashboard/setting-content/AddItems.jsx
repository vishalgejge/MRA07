import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { fireDB } from '../../../../firebase/firebaseConfig';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';

const AddItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isInputOpen, setIsInputOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsCollectionRef = collection(fireDB, 'agreementTypes');
        const snapshot = await onSnapshot(itemsCollectionRef, (querySnapshot) => {
          const data = querySnapshot.docs[0]?.data().items || [];
          setItems(data);
        });

        return () => snapshot(); // Cleanup function to unsubscribe from the snapshot listener
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  const toggleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  const handleAddItem = async () => {
    try {
      if (newItem.trim() !== '') {
        const itemsCollectionRef = collection(fireDB, 'agreementTypes');
        const docRef = doc(fireDB, 'agreementTypes', 'IocbfsiPvaU8d6ZPsDu7');
        const docSnapshot = await setDoc(docRef, { items: [...items, newItem] }, { merge: true });

        // setItems((prevItems) => [...prevItems, newItem]);
        setNewItem('');
        console.log('Item added successfully:', newItem);
      }
    } catch (error) {
      console.error('Error adding item to Firebase:', error);
    }
  };

  const handleDeleteItem = async (index) => {
    try {
      const docRef = doc(fireDB, 'agreementTypes', 'IocbfsiPvaU8d6ZPsDu7');
      const docSnapshot = await updateDoc(docRef, {
        items: items.filter((_, i) => i !== index),
      });

      setItems((prevItems) => prevItems.filter((_, i) => i !== index));
      console.log('Item deleted successfully:', items[index]);
    } catch (error) {
      console.error('Error deleting item from Firebase:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  return (
    <div className="col-xxl-9">
      <div className="card mt-xxl-n5">
        <div className="card-body p-4">
          <div className="tab-content">
            <div className="table-responsive">
              <table className="invoice-table table table-borderless table-nowrap mb-0">
                <thead className="align-middle">
                  <tr className="table-active">
                    <th scope="col" style={{ width: '100px' }}>
                      Sr/no
                    </th>
                    <th scope="col" style={{ width: '50px' }}>
                      Name
                    </th>
                    <th scope="col" className="text-mid">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <th scope="row" className="product-id">
                        {index + 1}
                      </th>
                      <td className="text-start w-11/12">{item}</td>
                      <td className="product-removal">
                        <button
                          onClick={() => handleDeleteItem(index)}
                          className="btn btn-danger btn-sm flex align-middle gap-2"
                        >
                          Delete
                          <FiTrash className='mt-1' />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {isInputOpen && (
                    <tr>
                      <td colSpan="3">
                        <input
                          type="text"
                          placeholder="Name"
                          value={newItem}
                          onChange={handleInputChange}
                          className="form-control bg-light border-0"
                        />
                        <button
                          onClick={handleAddItem}
                          className="btn btn-danger btn-sm flex align-middle gap-2"
                        >
                          Add
                          <FiPlus />
                        </button>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="3">
                      <button
                        onClick={toggleInput}
                        className="btn mt-3 btn-soft-secondary fw-medium bg-green-500 text-slate-800 text-sm "
                      >
                        <i
                          className={`ri-add-fill me-1 align-bottom ${isInputOpen ? 'rotate-45' : ''
                            }`}
                        ></i>{' '}
                        Add Item
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
