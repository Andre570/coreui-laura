import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DistritosTable = ({ history})=> {

    const refFire = useFirestore();
    const [distritos, setDistritos] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosDistritos = []
            const snapshots = await refFire.collection('distritos').get();
            snapshots.docs.forEach(snap => {

                datosDistritos.push({
                    id: snap.doc.id,
                    ...snap.doc.data()
                })
            })
            setDistritos(datosDistritos)
        }

        traerDatos()

    }, [refFire])

    const eliminar = async (id) => {    
        const respuesta = window.confirm('¿Seguro que quiere eliminar?');
        if (respuesta) {
            await refFire.collection('distritos').doc(id).delete();
            toast('Eliminado')   
            const temp = distritos.filter ((distrito) => {
                console.log(distrito, id)
                return distrito.id !== id 
            })
            setDistritos(temp)
        }
       
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Distritos</h2>
                <Link className="btn btn-primary" to="/distritos/add">Crear</Link>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Zona</th>
                            <th>Asociacion_id</th>
                            <th>pastor</th>
                            <th>Tesorero</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        distritos.map((distrito, index)=> (
                            <tr key={distrito.id}>
                                <td>{
                                   
                                    index + 1

                                }</td>
                                <td>{
                                
                                    distrito.nombre
                                
                                }</td>
                                <td>{
                                    
                                    distrito.codigo
                                
                                }</td>
                                <td>{
                                    
                                    distrito.zona 
                                
                                }</td>
                                <td>{
                                    
                                    distrito.asociacion_id
                                
                                }</td><td>{
                                    
                                    distrito.pastor
                                
                                }</td>
                                <td>{
                                    
                                    distrito.tesorero
                                
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push('/distritos/edit/${distrito.id}')
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

export default DistritosTable