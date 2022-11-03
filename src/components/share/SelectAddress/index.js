import React, { useEffect, useState } from 'react'
import './style.scss'
import vari from '../../../assets/scss/vari.module.scss';
import Select from 'react-select'

const customStylesSelect = {
  option: (provided, state) => ({
    ...provided,
    //borderBottom: '1px dotted pink',
    //color: state.isSelected ? 'red' : 'blue',
    //backgroundColor: state.isSelected ? 'red' : 'white',

    backgroundColor: state.isDisabled
      ? undefined
      : state.isSelected
        ? vari.selectItemChoosed
        : state.isFocused
          ? vari.selectItemHover
          : undefined,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, fontSize: "20px" };
  }
}


export default function SelectAddress({
  getAddressChoose,
  eng = false
}) {
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [cityChoose, setCityChoose] = useState(null);
  const [districtChoose, setDistrictChoose] = useState(null);
  const [wardChoose, setWardChoose] = useState(null);


  useEffect(() => {
    fetch('/assets/json/locations/cities.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(cities => {
        console.log(cities)
        setCityList(cities.map(({ id, name }) => ({ value: id, label: name })))

      })
  }, [])

  useEffect(() => {
    if (!cityChoose) return;
    fetch(`/assets/json/locations/districts/${cityChoose.value}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(districts => {
        //console.log(districts)
        setDistrictList(districts.data.map(({ id, name }) => ({ value: id, label: name })))

      })
  }, [cityChoose]);

  useEffect(() => {
    if (!districtChoose) return;
    fetch(`/assets/json/locations/wards/${districtChoose.value}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(wards => {
        //console.log(wards)
        setWardList(wards.data.map(({ id, name }) => ({ value: id, label: name })))
      })
  }, [districtChoose]);

  useEffect(() => {
    // addressChoose = {
    //   "city": cityChoose,
    //   "district": districtChoose,
    //   "ward": wardChoose,
    // }
    // console.log(addressChoose)
    if(cityChoose && districtChoose && wardChoose){
      getAddressChoose({
        city: cityChoose.label,
        district: districtChoose.label,
        ward: wardChoose.label
      })
    }
    
    
  }, [wardChoose]);

  const handleChangeCity = (option) => {
    setCityChoose(option);
    setDistrictList([]);
    setDistrictChoose(null);
    setWardList([]);
    setWardChoose(null);
  }

  const handleChangeDistrict = (option) => {
    setDistrictChoose(option);
    setWardList([]);
    setWardChoose(null);

  }

  const handleChangeWard = (option) => {
    setWardChoose(option);
  }

  return (
    <div className="select-address-container">
      <div className="row-hh">
        <div className="col-4">
          <div className="form-group">
            {
              eng ? <label className="label">Province/city</label> : <label className="label">Tỉnh/TP</label> 
            }
            <Select options={cityList}
              className="select-hh"
              key={`cityId_${cityChoose?.value}`}
              defaultValue={cityChoose}
              placeholder="T/TP"
              menuColor="red"
              styles={customStylesSelect}
              // value={formData.gender} 
              onChange={(option) => handleChangeCity(option)}
            />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            {
              eng ? <label className="label">District</label> : <label className="label">Quận/Huyện</label> 
            }
            <Select options={districtList}
              isDisabled={districtList.length === 0}
              key={`districtId_${districtChoose?.value}`}
              className="select-hh"
              defaultValue={districtChoose}
              placeholder="Q/H"
              menuColor="red"
              styles={customStylesSelect}
              // value={formData.gender} 
              onChange={(option) => handleChangeDistrict(option)}
            />

          </div>

        </div>

        <div className="col-4">
          <div className="form-group">
           {
              eng ? <label className="label">Ward/Commune</label> : <label className="label">Phường/Xã</label> 
            }
            <Select options={wardList}
              isDisabled={wardList.length === 0}
              key={`wardId_${wardChoose?.value}`}
              className="select-hh"
              defaultValue={wardChoose}
              placeholder="P/X"
              menuColor="red"
              styles={customStylesSelect}
              // value={formData.gender} 
              onChange={(option) => handleChangeWard(option)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}