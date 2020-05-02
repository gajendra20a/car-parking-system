import React, { useState, useEffect } from 'react';
import ParkCar from 'react-modal';
import './Parking.css';
import firebaseDb from "../firebase";
import ParkingLot from "./ParkingLot";

const Parking = () => {
    const [parkedSlots, setParkedSlots] = useState({});
    const [search, setSearch] = useState(''); 
    const [sortedField, setSortedField] = useState('');
    const [sortType, setSortType] = useState('desc');
    const [colorFilter, setColorFilter] = useState('');
    const [addCar, setAddCar] = React.useState(false);

    const styleNewCar = {
        content : {
          top                   : '40%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
  
    useEffect(() => {
        firebaseDb.child('parking').on('value', snapshot => {
            if (snapshot.val() != null) {
                setParkedSlots({
                    ...snapshot.val()
                });
            }
        })
    }, [])

    const openCarForm = () => {
        if(totalCarsParked<10){
            setAddCar(true);
        }
        else{
            window.confirm('Parking is full')
        }
    }
 
    const closeCarForm = () =>{
        setAddCar(false);
    }


    const parkCar = (obj) => {
        firebaseDb.child('parking').push(
            obj, err => err && console.log(err)
        )
    }

    const unparkCar = id => {
    if (window.confirm('Are you sure to take car out of parking?')) {
        firebaseDb.child(`parking/${id}`).remove(
            err => err && console.log(err)
        )
    }
}
    const carKeys = Object.keys(parkedSlots);
    var filteredCarKeys = carKeys.filter(key=>{
        return parkedSlots[key].CarNo.toLowerCase().includes(search.toLowerCase());
    })

    filteredCarKeys = filteredCarKeys.filter(key=>{
        return parkedSlots[key].Color.toLowerCase().includes(colorFilter.toLowerCase());
    })

    const uniqueCarColors = [...new Set(carKeys.map(key => parkedSlots[key].Color))];
    const totalCarsParked = filteredCarKeys.length;

    if (sortedField !== '') {
        filteredCarKeys.sort((a, b) => {
            if (parkedSlots[a][sortedField] < parkedSlots[b][sortedField]) {
            return sortType==='asc'? -1 : 1;
          }
          if (parkedSlots[a][sortedField] > parkedSlots[b][sortedField]) {
            return sortType==='asc'? 1 : -1;
          }
          return 0;
        });
      }
  
    return (
        <>
        <div className="parking-lot-space">
            <h2 className="text-center">Automated Parking Lot System</h2>
        </div>
        <div className=''>
            <ParkCar isOpen={addCar} onRequestClose={closeCarForm} style={styleNewCar}>
            <div className="col-md-12 park-car-btn">
                <h2 className='text-center'>Park a Car</h2>
                <ParkingLot {...({ setAddCar, parkedSlots, parkCar })} />
            </div>
            </ParkCar>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className='total-cars-parked'>
                    <div>Total Parking Slots - <span className='car-parked-color'>10</span></div>
                    <div>Available Parking Slot - <span className='car-parked-color'>{10 - (totalCarsParked)}</span></div>
                </div>
                <div className='park-car-btn-div'>
                    <button className ='btn btn-danger btn park-car-btn' onClick={openCarForm}>Park a Car</button>
                </div>   
                <div className='search-car-div'>           
                    <form className="form-inline search-car">
                        <input className="form-control mr-sm-2 search-car-form-input"  type='text' placeholder='TYPE REG NO' onChange={e=>setSearch(e.target.value)}/>
                        <select id="select" className='form-control search-car-form-input' onChange={e=>setColorFilter(e.target.value)}>
                            <option value=''>Choose Color</option>
                            {uniqueCarColors.map((key,i)=>(
                                <option key={i} value={key}>{key}</option>
                            ))}
                        </select>
                    </form>
                </div>
                <table className="table table-stripped parked-cars-table">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th className='car-setting' onClick={() => (setSortType(sortType==='asc'? 'desc':'asc'), setSortedField('CarNo'))}>Car No</th>
                            <th onClick={() => (setSortType(sortType==='asc'? 'desc':'asc'), setSortedField('Color'))}>Color</th>
                            <th onClick={() => (setSortType(sortType==='asc'? 'desc':'asc'), setSortedField('SlotNo'))}>Slot No</th>
                            <th onClick={() => (setSortType(sortType==='asc'? 'desc':'asc'), setSortedField('DateTime'))}>Date Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCarKeys.map((key,i) => (
                            <tr key={key}>
                                <td>{i+1}</td>
                                <td className='car-setting'>{parkedSlots[key].CarNo}</td>
                                <td>{parkedSlots[key].Color}</td>
                                <td>{parkedSlots[key].SlotNo}</td>
                                <td>{parkedSlots[key].DateTime}</td>
                                <td>
                                    <input type='submit' value='Remove' className="btn btn-warning btn-sm" 
                                    onClick={() => unparkCar(key)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Parking;