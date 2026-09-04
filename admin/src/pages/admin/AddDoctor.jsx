import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
    return (
        <section className="add-doctor p-5 w-full">
            <div className="container">
                <div className="page-header mb-3">
                    <h2 className="page-title text-xl font-semibold">Add Doctor</h2>
                </div>
                <div className="add-doctor-form-wrapper">
                    <div className="add-doctor-form p-5 shadow-md rounded-lg bg-white">
                        <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className="form-group">
                                <label htmlFor="doctor-img" className="flex items-center gap-3">
                                    <img src={assets.upload_area} alt="upload" className="w-16 md:w-18 cursor-pointer bg-gray-100 rounded-full" />
                                    <span className="">Upload Doctor <br /> Image</span>
                                </label>
                                <input type="file" id="doctor-img" hidden required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-name">Doctor Name</label>
                                <input type="text" id="doctor-name" name="doctor-name" placeholder="Enter Doctor Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-email">Doctor Email</label>
                                <input type="email" id="doctor-email" name='doctor-email' placeholder="Enter Doctor Email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-password">Doctor Password</label>
                                <input type="text" id="doctor-password" name='doctor-password' placeholder="Enter Doctor Password" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-password">Doctor Experience</label>
                                <select name="doctor-experience" id="doctor-experience" required>
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
                                <select name="doctor-speciality" id="doctor-speciality" required>
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
                                <input type="text" id="doctor-qualification" name='doctor-qualification' placeholder="Enter Doctor Qualification" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctor-fee">Doctor Fee</label>
                                <input type="number" id="doctor-fee" name='doctor-fee' placeholder="Enter Doctor Fee" required />
                            </div>
                            <div className="form-group md:col-span-2">
                                <label htmlFor="doctor-address">Doctor Address</label>
                                <input type="text" id="doctor-address" name='doctor-address' placeholder="Enter Doctor Address" required />
                                <input type="text" id="doctor-address" name='doctor-address' placeholder="Enter Doctor Address" required />
                            </div>
                            <div className='form-group md:col-span-2'>
                                <label htmlFor="doctor-about">Doctor About</label>
                                <textarea name="doctor-about" id="doctor-about" rows="5" placeholder="Enter Doctor About" required></textarea>
                            </div>
                            <div className="form-group md:col-span-2">
                                <button type="submit" className="btn btn-primary">Add Doctor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default AddDoctor