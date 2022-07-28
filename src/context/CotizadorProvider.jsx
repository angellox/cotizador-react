import { useState, createContext } from 'react';
import { 
    calcularMarcar, 
    obtenerDiferenciaYear, 
    calcularPlan, 
    formatearDinero 
} from '../helpers';

const CotizadorContext = createContext();

const CotizadorProvider = ({children}) => {
    // Defining globals functions/states
    // They are available in all app
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [error, setError] = useState('');
    const [resultado, setResultado] = useState(0);
    const [cargando, setCargando] = useState(false);


    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Base proporcionada por el usuario
        let resultado = 2000;
        // Obtener diferencia de año
        const diferencia = obtenerDiferenciaYear(datos.year);
        // Restar el 3% por cada año
        resultado -= ((resultado * (diferencia * 3)) / 100);
        // Americano 15%
        // Europeo 30%
        // Asiático 5%
        resultado *= calcularMarcar(datos.marca);
        // Básico 20%
        // Completo 50%
        resultado *= calcularPlan(datos.plan);
        // Formatear dinero
        resultado = formatearDinero(resultado);

        setCargando(true);

        setTimeout(() => {
            setResultado(resultado);
            setCargando(false);
        }, 3000);
        
    }


    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado, 
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
};

export {
    CotizadorProvider
}

export default CotizadorContext;