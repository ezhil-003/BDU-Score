const express = require("express")
const app = express()
const mongoose = require("mongoose");
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const { Semester, Subject } = require('../schemas/Subjects')
const connectToDatabase = require('../db.js');

router.get('/api/batches', async (req, res) => {
    try {
        const semesters = await Subject.find({});
        console.log(semesters)

        const availableBatches = semesters.map((semester) => semester.batch);

        console.log(availableBatches);
        res.json({ availableBatches });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/semesters/:batch', async (req, res) => {
    const { batch } = req.params;
    try {
        const semester = await Semester.findOne({ batch });
        if (!semester) {
            return res.status(404).json({ message: 'Batch not found' });
        }
        res.json({ availableSemesters: semester.semscomp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/subjects/:batch/:semester', async (req, res) => {
    const { batch, semester } = req.params;

    try {
        const subject = await Subject.findOne({ batch });

        if (!subject) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        const semData = subject[`sem${semester}`]; // Access the correct semester property
        console.log(semData)

        if (!semData || semData.length === 0) {
            return res.status(404).json({ message: 'Semester not available for this batch' });
        }
        const availableSubjects = [];
        for (const paperName in semData) {
            if (semData.hasOwnProperty(paperName)) {
                console.log(`Processing data for ${paperName}`);

                // Extract subject names using map and filter
                const filteredSubjects = semData[paperName].map((subjectItem) => {
                    if (subjectItem && subjectItem['Subject-name']) {
                        return subjectItem['Subject-name'];
                    } else {
                        return null; // Return null for undefined items
                    }
                });

                console.log(`Filtered subjects for ${paperName}:`, filteredSubjects);

                availableSubjects.push(...filteredSubjects.filter((subjectName) => subjectName !== null));
            }
        }
        console.log(availableSubjects);
        res.json({ subjects: availableSubjects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/api/submit', async (req, res) => {
    try {
        const { selectedProgram, selectedBatch, selectedSemester, selectedSubject } = req.body;

        // Construct the collection names for internal and external data
        const internalCollectionName = `${selectedProgram.toLowerCase()}.${selectedBatch}.${selectedSemester}.${selectedSubject.toLowerCase()}.internal`.replace(/ /g, '_');;
        const externalCollectionName = `${selectedProgram.toLowerCase()}.${selectedBatch}.${selectedSemester}.${selectedSubject.toLowerCase()}.external`.replace(/ /g, '_');;

        // Use the collection names to query MongoDB for internal and external data
        const internalCollection = mongoose.connection.collection(internalCollectionName);
        const externalCollection = mongoose.connection.collection(externalCollectionName);
        // Check the constructed collection names
        console.log('Internal Collection Name:', internalCollectionName);
        console.log('External Collection Name:', externalCollectionName);

        // Fetch data from both collections
        const internalData = await internalCollection.find({}, { projection: { stu_id: 1, name: 1, marks: 1, _id: 0 } }).toArray();
        const externalData = await externalCollection.find({}, { projection: { stu_id: 1, name: 1, marks: 1, _id: 0 } }).toArray();
        console.log('Internal Data:', internalData);
        console.log('External Data:', externalData);

        // Combine internal and external data based on your requirements
        const mergedData = internalData.map((internal) => ({
            ...internal,
            externalMarks: externalData.find((external) => external.stu_id === internal.stu_id)?.marks,
        }));

        // Send the combined data to the client
        res.json({ data: mergedData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/api/update/:collectionName/:stu_id', async (req, res) => {
    try {
        const collectionName = req.params.collectionName; // Extract collection name from URL
        const stu_id = req.params.stu_id;
        const { marks } = req.body; // Extract updated data
        console.log('Incoming PUT request:', req.method, req.url);
        console.log('Request body:', req.body);
        console.log('Collection name:', collectionName);
        console.log('Student ID:', stu_id);
        console.log('Marks:', marks);

        // Validation (example)
        if (isNaN(marks)) {
            console.log('Marks valid?', !isNaN(marks));
            return res.status(400).json({ error: 'Invalid external marks' });
        }
        const externalCollection = mongoose.connection.collection(collectionName);
        // Apply updates
        const updatedData = await await externalCollection.findOneAndUpdate(
            { stu_id: stu_id },
            { $set: { marks: marks } },
            { new: true } // Return updated document
        );
        console.log('FindOneAndUpdate query:', { stu_id: stu_id }, { $set: { marks: marks } });
        console.log('Updated document:', updatedData);
        // Successful update, no content
        res.status(200).json(updatedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update data' });
    }
});


module.exports = router;