import { useEffect, useState, } from "react";
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '../../components/slider';
import SidebarItem from '../../components/sidebarItem';
import './styles.css';

const DEFAULT_OPTIONS = [
    {
        name: "Brillo",
        property: 'brightness',
        value: 100,
        range:{
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: "Contraste",
        property: 'contrast',
        value: 100,
        range:{
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: "Saturación",
        property: 'saturate',
        value: 100,
        range:{
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: "Escala de Grises",
        property: 'grayscale',
        value: 0,
        range:{
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: "Sepia",
        property: 'sepia',
        value: 0,
        range:{
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: "Tono",
        property: 'hue-rotate',
        value: 0,
        range:{
            min: 0,
            max: 360
        },
        unit: 'deg'
    },
    {
        name: "Desenfoque",
        property: 'blur',
        value: 0,
        range:{
            min: 0,
            max: 20
        },
        unit: 'px'
    },

]


function Edit(){
    const [card, setCard] = useState('');
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [options, setOptions] = useState(DEFAULT_OPTIONS);
    const selectedOption = options[selectedOptionIndex];
    let { id } = useParams();

    useEffect(()=>{
        const getOneCard = async () => {
            const res = await fetch(`http://localhost:4030/favorites/edit/${id}`);
            const data = await res.json();
            return setCard(data);
        }
        getOneCard()

    }, []);

    function handleSliderChange ({target}) {
        setOptions(prevOptions => {
            return prevOptions.map(( option, index) => { 
                if(index !== selectedOptionIndex) return option
                return{...option, value: target.value}
            })
        })
    } 
    function getImageStyle () {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        } )
        return{filter:filters.join(' ')}
    }

    return (
      <Box component="main" display='flex' flexDirection='column'>
        <Box  display='flex' flexDirection='row'>
        
        {!card ? (
          <p></p>
        ) : (
          card.map((c) => (
            <Box className="container">
              <img
                style={getImageStyle()}
                className="main-image"
                src={`http://localhost:4030/public/${c.img}`}
                alt={c.img}
                key={c._id}
              />
            </Box>
          ))
        )}
        <div className="sidebar">
          {options.map((o, index) => {
            return (
              <SidebarItem
                key={index}
                name={o.name}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
              />
            );
          })}
        </div>
        </Box>
        <Slider
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </Box>
    );
}
export default Edit;