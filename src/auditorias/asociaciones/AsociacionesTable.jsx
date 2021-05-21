import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';

const AsociacionesTable = ({ history})=> {

    const refFire = useFirestore();
    const [asociaciones, setAsociaciones] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosAsociaciones = []
            const snapshots = await refFire.collection('asociaciones').get();
            snapshots.docs.forEach(snap => {

                datosAsociaciones.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            setAsociaciones(datosAsociaciones)
        }

        traerDatos()

    }, [refFire])

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Asociaciones</h2>
                <Link className="btn btn-primary" to="/asociaciones/add">Crear</Link>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Zona</th>
                            <th>Union_id</th>
                            <th>Tesorero</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        asociaciones.map((asociacion, index)=> (
                            <tr key={asociacion.id}>
                                <td>{
                                   
                                    index + 1

                                }</td>
                                <td>{
                                
                                    asociacion.nombre
                                
                                }</td>
                                <td>{
                                    
                                    asociacion.codigo
                                
                                }</td>
                                <td>{
                                    
                                    asociacion.zona
                                
                                }</td>
                                <td>{
                                    
                                    asociacion.union_id
                                
                                }</td>
                                <td>{
                                    
                                    asociacion.tesorero
                                
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push(`/asociaciones/edit/${asociacion.id}`)
                                    }}
                                     className="btn btn-success btn-sm">
                                        <i className="cil-pencil"></i>
                                    </button>
                                     <button className="btn btn-danger btn-sm">
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

export default AsociacionesTable