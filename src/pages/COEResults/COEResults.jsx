import React from 'react'
import './COEResults.css'
import MainNav from '../../Components/NavBarMain/MainNav'
import SideOptions from '../../Components/Sidebar/SideOptions'
import { useState, useEffect } from 'react'

const COEResults = () => {
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    const [data, setData] = useState([]);
    const [editingCell, setEditingCell] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (storedFormData) {
            const fetchData = async () => {
                try {
                    const response = await fetch("http://localhost:5001/results/api/submit", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(storedFormData),
                    });
                    const fetchedData = await response.json();
                    if (fetchedData) {
                        setData(fetchedData.data); // Directly set the merged data
                    }
                } catch (error) {
                    setError(error);
                    console.error("Error submitting form:", error);
                }
            };

            fetchData();
        }
    },[]);


    const handleEditClick = (rowId, fieldName) => {
        setEditingCell({ rowId, fieldName });
    };

    const handleInputChange = (event, rowId, fieldName) => {
        const updatedData = [...data];
        const row = updatedData.find((row) => row.stu_id === rowId);
        if (row) {
            row[fieldName] = event.target.value;
            setData(updatedData);
        } else {
            console.log("Row can't be updated", row, row[fieldName])
        }
    };



    const handleUpdateClick = async (stu_id) => {
        try {
            const updatedRow = data.find((row) => row.stu_id === stu_id);
            const updatedData = { marks: Number(updatedRow.externalMarks) }; // Example, adjust as needed
            console.log(JSON.stringify(updatedData))
            const collectionName = `${storedFormData.selectedProgram}.${storedFormData.selectedBatch}.${storedFormData.selectedSemester}.${storedFormData.selectedSubject.toLowerCase().replace(/ /g, '_')}.external`;

            const response = await fetch(`http://localhost:5001/results/api/update/${collectionName}/${stu_id}`, {
                method: 'PUT', // Or 'PATCH' if supported
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                // Handle successful update
                setEditingCell(false);
                // Optionally, fetch updated data from backend
                console.log('Data updated successfully!');
            } else {
                // Handle error
                const errorData = await response.json();
                console.error('Error updating data:', errorData);
            }
        } catch (error) {
            console.error('Error during update:', error);
        }

    };
    function calculateTotal(row) {
        return row.marks + Number(row.externalMarks);
    }

    return (
        <>
            <MainNav />
            <SideOptions />
            <div className='d-flex position-relative respagemain'>
                <div className="flex-grow-1 p-3">
                    <div className="mb-4">
                        <h4>Marks</h4>
                    </div>
                    <div className="mb-4">
                        <p>{storedFormData && storedFormData.selectedSubject ? storedFormData.selectedSubject : 'Subject Not Available'}</p>
                        <p>{storedFormData && storedFormData.selectedBatch ? storedFormData.selectedBatch : 'Batch Not Available'}</p>
                        <p>{storedFormData && storedFormData.selectedSemester ? `Semester ${storedFormData.selectedSemester}` : 'Semester Not Available'}</p>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered rounded">
                            <caption className='caption-top fs-4'>{storedFormData && storedFormData.selectedSubject ? storedFormData.selectedSubject : 'Subject Not Available'}</caption>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Reg No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Internal</th>
                                    <th scope="col">External</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.length ? (
                                    data.map((row, index) => (
                                        <tr key={row.stu_id}>
                                            <td>{index + 1}</td>
                                            <td>{row.stu_id}</td>
                                            <td>{row.name}</td>
                                            <td>{row.marks}</td>
                                            <td className='inputcontainer'>
                                                {editingCell && editingCell.rowId === row.stu_id && editingCell.fieldName === 'externalMarks' ? (
                                                    <input
                                                        type="text"
                                                        className="form-control inputboxes"
                                                        value={row.externalMarks}
                                                        onChange={(e) => handleInputChange(e, row.stu_id, 'externalMarks')}
                                                    />
                                                ) : (
                                                    row.externalMarks
                                                )}
                                            </td>
                                            <td>{calculateTotal(row)}</td>
                                            <td>
                                                <i alt="edit" className="bi bi-pencil-square icons" onClick={() => handleEditClick(row.stu_id, 'externalMarks')} ></i>
                                            </td>
                                            <td>
                                                <i alt="Update" className="bi bi-cloud-arrow-up icons" onClick={() => handleUpdateClick(row.stu_id)} ></i>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">Loading data...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default COEResults