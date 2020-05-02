import React, { useState, useEffect } from 'react';

const ParkingLot = (props) => {
    const parkingDetails = {
        CarNo:'',
        Color:'',
        SlotNo:'',
        DateTime:''
    }

    var [values, setValues] = useState(parkingDetails)

    useEffect(() => {setValues({ ...parkingDetails })}, [props.parkedSlots])

    const carParkChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const carParkFormSubmit = e => {
        props.setAddCar(false);
        e.preventDefault()
        props.parkCar(values);
    }

    const parkedCarsDetail = Object.values(props.parkedSlots);
    const parkSlotsTaken = parkedCarsDetail.map(car => parseInt(car.SlotNo));
    const totalSlots = [1,2,3,4,5,6,7,8,9,10];
    const availableSlots = totalSlots.filter((item) => {
        return !parkSlotsTaken.includes(item); 
      })
    
      console.log(availableSlots);
    return (
        <form autoComplete="off" onSubmit={carParkFormSubmit}>
            <div className="form-group input-group">
                <input className="form-control" name="CarNo" placeholder="Car No"
                    value={values.CarNo}
                    onChange={carParkChange}
                    required
                />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <input className="form-control" name="Color" placeholder="Color"
                        value={values.Color}
                        onChange={carParkChange}
                        required
                    />
                </div>

                <div className="form-group input-group col-md-6">
                    <select id="select" name="SlotNo" className='form-control' onChange={carParkChange} required>
                        <option value=''>Choose Slot</option>
                        {availableSlots.map((key,i)=>(
                            <option key={i} value={key}>{key}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group">
               <input className="form-control" name="DateTime" placeholder="Date and Time"
                    value={values.DateTime}
                    onChange={carParkChange}
                    required
                />
            </div>
            <div className="form-group">
                <input type="submit" value={"Park Car"} className="btn btn-primary btn-block" />
            </div>
            
  </form>
    );
}

export default ParkingLot;