import DoctorModel from "../models/Doctor.js"

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const doctorData = await DoctorModel.findById(docId);

        if (!doctorData) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        await DoctorModel.findByIdAndUpdate(docId,{availability: !doctorData.availability});

        return res.status(200).json({
            success: true,
            message: "Availability updated successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

const doctorList = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({}).select(["-password",'-email']) //select all fields except password and email
        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            doctors,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}

export {changeAvailability,doctorList}