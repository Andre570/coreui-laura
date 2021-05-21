import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UnionesTable = ({ history})=> {

    const refFire = useFirestore();
    const [uniones, setUniones] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosUniones = []
            const snapshots = await refFire.collection('uniones').get();
            snapshots.docs.forEach(snap => {
    
                datosUniones.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            setUniones(datosUniones)
        }

        traerDatos()

    }, [refFire])

    const eliminar = async (id) => {    
        const respuesta = window.confirm('¿Seguro que quiere eliminar?');
        if (respuesta) {
            await refFire.collection('uniones').doc(id).delete();
            toast('Eliminado')   
            const temp = uniones.filter ((union) => {
                console.log(union, id)
                return union.id !== id 
            })
            setUniones(temp)
        }
       
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Uniones</h2>
                <Link className="btn btn-primary" to="/uniones/add">Crear</Link>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Presidente</th>
                            <th>Pais</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        uniones.map((union, index)=> (
                            <tr key={union.id}>
                                <td>{
                                   
                                    index + 1

                                }</td>
                                <td>{
                                
                                    union.nombre
                                
                                }</td>
                                <td>{
                                    
                                    union.codigo
                                
                                }</td>
                                <td>{
                                    
                                    union.presidente
                                
                                }</td>
                                <td>{
                                    
                                    union.pais
                                
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push(`/uniones/edit/${union.id}`)
                                    }}
                                     className="btn btn-success btn-sm">
                                        <i className="cil-pencil"></i>
                                    </button>
                                     <button onClick={ () => eliminar(union.id)} className="btn btn-danger btn-sm">
                                        <i className="cil-trash"></i>
                                    </button>
                                
                                </td>
                            
                            </tr>
                        ))
                    }</tbody>
                </table>
            </div>
        </div>
    )
}

export default UnionesTable