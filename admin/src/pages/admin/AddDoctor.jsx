import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const AddDoctor = () => {
    const [doctorImage, setDoctorImage] = useState(false);
    const [doctorName, setDoctorName] = useState('');
    const [doctorEmail, setDoctorEmail] = useState('');
    const [doctorPassword, setDoctorPassword] = useState('');
    const [doctorExperience, setDoctorExperience] = useState('');
    const [doctorSpeciality, setDoctorSpeciality] = useState('');
    const [doctorQualification, setDoctorQualification] = useState('');
    const [doctorFee, setDoctorFee] = useState('');
    const [doctorAddress1, setDoctorAddress1] = useState('');
    const [doctorAddress2, setDoctorAddress2] = useState('');
    const [doctorAbout, setDoctorAbout] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!doctorImage) {
                return toast.error('Please upload doctor image');
                //If we put required in the input field, it will not work
            }
            const formData = new FormData();
            formData.append('doctorImage', doctorImage);
            formData.append('doctorName', doctorName);
            formData.append('doctorEmail', doctorEmail);
            formData.append('doctorPassword', doctorPassword);
            formData.append('doctorExperience', doctorExperience);
            formData.append('doctorSpeciality', doctorSpeciality);
            formData.append('doctorQualification', doctorQualification);
            formData.append('doctorFee', doctorFee);
            formData.append('doctorAddress', JSON.stringify({ line1: doctorAddress1, line2: doctorAddress2 }));
            formData.append('doctorAbout', doctorAbout);

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message);
                setDoctorImage('');
                setDoctorName('');
                setDoctorEmail('');
                setDoctorPassword('');
                setDoctorExperience('');
                setDoctorSpeciality('');
                setDoctorQualification('');
                setDoctorFee('');
                setDoctorAddress1('');
                setDoctorAddress2('');
                setDoctorAbout('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Add doctor error:', error);
            toast.error(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    }

    return (
        <section className="add-doctor p-5 w-full">
            <div className="container">
                <div className="page-header mb-3">
                    <h2 className="page-title text-xl font-semibold">Add Doctor</h2>
                </div>
                <div className="add-doctor-form-wrapper">
                    <div className="add-doctor-form p-5 shadow-md rounded-lg bg-white">
                        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className="form-group">
                                <label htmlFor="doctor-img" className="flex items-center gap-3">
                                    <img src={doctorImage ? URL.createObjectURL(doctorImage) : assets.upload_area} alt="upload" className="w-16 md:w-18 cursor-pointer bg-gray-100 rounded-full" />
                                    <span className="">Upload Doctor <br /> Image</span>
                                </label>
                                <input onChange={(e) => { setDoctorImage(e.target.files[0]) }} type="file" id="doctor-img" hidden />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-name">Doctor Name</label>
                                <input onChange={(e) => { setDoctorName(e.target.value) }} value={doctorName} type="text" id="doctor-name" name="doctor-name" placeholder="Enter Doctor Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-email">Doctor Email</label>
                                <input onChange={(e) => { setDoctorEmail(e.target.value) }} value={doctorEmail} type="email" id="doctor-email" name='doctor-email' placeholder="Enter Doctor Email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-password">Doctor Password</label>
                                <input onChange={(e) => { setDoctorPassword(e.target.value) }} value={doctorPassword} type="text" id="doctor-password" name='doctor-password' placeholder="Enter Doctor Password" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-password">Doctor Experience</label>
                                <select onChange={(e) => { setDoctorExperience(e.target.value) }} value={doctorExperience} name="doctor-experience" id="doctor-experience" required>
                                    <option value="" disabled selected>Select Experience</option>
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Year">2 Year</option>
                                    <option value="3 Year">3 Year</option>
                                    <option value="4 Year">4 Year</option>
                                    <option value="5 Year">5 Year</option>
                                    <option value="6 Year">6 Year</option>
                                    <option value="7 Year">7 Year</option>
                                    <option value="8 Year">8 Year</option>
                                    <option value="9 Year">9 Year</option>
                                    <option value="10 Year">10 Year</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-speciality">Doctor Speciality</label>
                                <select onChange={(e) => { setDoctorSpeciality(e.target.value) }} value={doctorSpeciality} name="doctor-speciality" id="doctor-speciality" required>
                                    <option value="" disabled selected>Select Speciality</option>
                                    <option value="General Physician">General Physician</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Pediatrician">Pediatrician</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-qualification">Doctor Qualification</label>
                                <input onChange={(e) => { setDoctorQualification(e.target.value) }} value={doctorQualification} type="text" id="doctor-qualification" name='doctor-qualification' placeholder="Enter Doctor Qualification" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-fee">Doctor Fee</label>
                                <input onChange={(e) => { setDoctorFee(e.target.value) }} value={doctorFee} type="number" id="doctor-fee" name='doctor-fee' placeholder="Enter Doctor Fee" required />
                            </div>
                            <div className="form-group md:col-span-2">
                                <label htmlFor="doctor-address">Doctor Address</label>
                                <input onChange={(e) => { setDoctorAddress1(e.target.value) }} value={doctorAddress1} type="text" id="doctor-address" name='doctor-address' placeholder="Enter Doctor Address" required />
                                <input onChange={(e) => { setDoctorAddress2(e.target.value) }} value={doctorAddress2} type="text" id="doctor-address" name='doctor-address' placeholder="Enter Doctor Address" required />
                            </div>
                            <div className='form-group md:col-span-2'>
                                <label htmlFor="doctor-about">Doctor About</label>
                                <textarea onChange={(e) => { setDoctorAbout(e.target.value) }} value={doctorAbout} name="doctor-about" id="doctor-about" rows="5" placeholder="Enter Doctor About" required></textarea>
                            </div>
                            <div className="form-group md:col-span-2">
                                <button type="submit" className="btn btn-primary bg-primary text-white py-3 px-4 text-sm font-semibold rounded-lg border-blue-600 hover:bg-primary/90 transition ease-in-out duration-200">Add Doctor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default AddDoctor