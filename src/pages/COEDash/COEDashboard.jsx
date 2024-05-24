import React from 'react'
import MainNav from '../../Components/NavBarMain/MainNav'
import SideOptions from '../../Components/Sidebar/SideOptions.jsx'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './COEDash.css'

function COEDashboard() {

    const [selectedProgram, setSelectedProgram] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [batches, setBatches] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    const handleProgramChange = async (event) => {
        const selectedProgram = event.target.value;
        setSelectedProgram(selectedProgram);
        console.log("Program changed:", selectedProgram);
        console.log("Fetching batches...");

        // Fetch batches based on the selected program
        try {
            const batchResponse = await fetch(`http://localhost:5001/results/api/batches`); // Fetch all batches
            const batchesData = await batchResponse.json();
            setBatches(batchesData.availableBatches); // Access the correct property
            console.log("Fetched batches:", batchesData);
        } catch (error) {
            console.log("Error fetching batches:", error);
            // Handle error appropriately (e.g., display an error message)
        }
    };

    const handleBatchChange = async (event) => {
        const selectedBatch = event.target.value;
        setSelectedBatch(selectedBatch);

        // Fetch semesters based on the selected batch
        try {
            const semesterResponse = await fetch(`http://localhost:5001/results/api/semesters/${selectedBatch}`);
            const semesterData = await semesterResponse.json();
            setSemesters(semesterData.availableSemesters); // Access the correct property
        } catch (error) {
            console.error("Error fetching semesters:", error);
            // Handle error appropriately
        }
    };

    const handleSemesterChange = async (event) => {
        const selectedSemester = event.target.value;
        setSelectedSemester(selectedSemester);

        // Fetch subjects based on the selected semester and batch
        try {
            const subjectResponse = await fetch(
                `http://localhost:5001/results/api/subjects/${selectedBatch}/${selectedSemester}`
            );
            const subjectData = await subjectResponse.json();
            setSubjects(subjectData.subjects || []); // Use the correct property, and handle undefined
            console.log('Received Subject Data:', subjectData);
        } catch (error) {
            console.error("Error fetching subjects:", error);
            // Handle error appropriately
        }
    };

    const handleSubjectChange = (event) => {
        const selectedSubject = event.target.value;
        setSelectedSubject(selectedSubject);
        console.log("Subject changed:", selectedSubject);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create an object with the selected data
        const formData = {
            selectedProgram,
            selectedBatch,
            selectedSemester,
            selectedSubject,
        };

        // Store the selected data in local storage
        localStorage.setItem('formData', JSON.stringify(formData));

        // Redirect to the next page using history.push
        navigate("/results");
    };

    return (
        <>
            <MainNav />
            <SideOptions />
            <main className='mainpagecontent position-relative' >
                <div className="container-fluid res_input_box1">
                    <div className="container-flex res_marks_label">
                        <h2 className="h-4">Marks</h2>
                    </div>
                    <form onSubmit={handleSubmit} method="post" className="">
                        <div className="col-md-6  res_box_wrapper">
                            <label htmlFor="programme" className="form-label res_input_label4">Programme</label>
                            <select id="programme" className="form-select res_input_tag" onChange={handleProgramChange} required>
                                <option value=""></option>
                                <option value="m.tech">M.Tech</option>
                                <option value="mca">MCA</option>
                                <option value="msccs">M.Sc(CS)</option>
                                <option value="mscds">M.Sc(DS)</option>
                                <option value="mscai">M.Sc(AI)</option>
                            </select>
                        </div>
                        <div className="col-md-6 res_box_wrapper">
                            <label htmlFor="batch" className="form-label res_input_label1">Batch</label>
                            <select id="batch" className="form-select res_input_tag" onChange={handleBatchChange} required>
                                <option value=""> </option>
                                {batches.map((batch) => (
                                    <option key={batch} value={batch}>{batch}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 res_box_wrapper">
                            <label htmlFor="semester" className="form-label res_input_label3">Semester</label>
                            <select id="semester" className="form-select res_input_tag" onChange={handleSemesterChange} required>
                                <option value=""> </option>
                                {semesters && semesters.map((semester) => (
                                    <option key={semester} value={semester}>{semester}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 res_box_wrapper">
                            <label htmlFor="subject" className="form-label res_input_label2">Subject</label>
                            <select id="subject" className="form-select res_input_tag" onChange={handleSubjectChange} required>
                                <option value=""> </option>
                                {subjects && subjects.map((subject, index) => (
                                    <option key={index} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-12 res_box d-flex mt-3 mb-5">
                            <button type="submit" className="btn btn-primary res_btn">Edit</button>
                        </div>
                    </form>
                </div>

                <div className="container-fluid res_input_box2">
                    <div className="container-flex res_marks_label">
                        <h2 className="fs-3">Consolidate Marks</h2>
                    </div>
                    <div className="col-md-6 res_box_wrapper">
                        <label htmlFor="programme2" className="form-label res_input_label5">Programme</label>
                        <select id="programme2" className="form-select res_input_tag" required>
                            <option value=""> </option>
                            <option value="M.Tech">M.Tech</option>
                            <option value="MCA">MCA</option>
                            <option value="">M.Sc(CS)</option>
                        </select>
                    </div>
                    <div className="col-md-6 res_box_wrapper">
                        <label htmlFor="batch2" className="form-label res_input_label1">Batch</label>
                        <select id="batch2" className="form-select res_input_tag" required>
                            <option value=""> </option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                    <div className="col-md-6 res_box_wrapper">
                        <label htmlFor="semester2" className="form-label res_input_label3">Semester</label>
                        <select id="semester2" className="form-select res_input_tag" required>
                            <option value=""> </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="col-md-12 res_box d-flex mt-3 mb-4" >
                        <button type="submit" className="btn btn-primary res_btn">View</button>
                    </div>
                </div>

            </main>
        </>
    )
}

export default COEDashboard