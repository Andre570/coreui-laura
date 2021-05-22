import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Auditorias = ({history}) => {

    const refFirestore = useFirestore();
    const [auditorias, setAuditorias] = useState([])
    
    useEffect(() =>{
        const traerDatos = async () =>{
           const snapshots = await refFirestore.collection('auditorias').get()
           const temporales = []
           snapshots.docs.forEach( (doc) => {
                const elem = {
                    id: doc.id, 
                    ...doc.data()
                }
                temporales.push(elem)
           })
           setAuditorias(temporales)
        }

        traerDatos()

    }, [refFirestore])

    const eliminar = async (id) => {    
        const respuesta = window.confirm('¿Seguro que quiere eliminar?');
        if (respuesta) {
            await refFirestore.collection('auditorias').doc(id).delete();
            toast('Eliminado')   
            const temp = auditorias.filter ((auditoria) => {
                console.log(auditoria, id)
                return auditoria.id !== id 
            })
            setAuditorias(temp)
        }
       
    }
    

    return(
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Auditorias</h2>
                <Link className="btn btn-primary" to="/auditorias/add">Crear</Link>
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Fecha</th>
                                <th>Activo</th>
                                <th>Iglesia_id</th>
                                <th>Actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                auditorias.map((auditoria, index) => (
                                    <tr key={auditoria.id}>
                                        <td>{index + 1}</td>
                                            <td>{
                                            
                                                auditoria.nombre
                                            
                                            }</td>
                                            <td>{
                                                
                                                auditoria.fecha
                                            
                                            }</td>
                                            <td>{
                                                
                                                auditoria.iglesia
                                            
                                            }</td>
                                            <td>{
                                                
                                                auditoria.actual
                                            
                                            }</td>
                                            <td>{
                                                
                                                auditoria.editar
                                            
                                            }</td>
                                            <td>
                                            <button onClick={ () => {
                                                    history.push(`/auditorias/edit/${auditoria.id}`)
                                                }}
                                                className="btn btn-success btn-sm">
                                                    <i className="cil-pencil"></i>
                                                </button>
                                                <button onClick={ () => eliminar(auditoria.id)} className="btn btn-danger btn-sm">
                                                    <i className="cil-trash"></i>
                                                </button>
                                            
                                            </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
            </div>
        </div>
    )
}

export default Auditorias