import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';

const Iglesias = ()=> {

    const refFire = useFirestore();
    const [iglesias, setIglesias] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosIgle = []
            const snapshots = await refFire.collection('iglesias').get();
            snapshots.docs.forEach(snap => {

                datosIgle.push({
                    id: snap.doc.id,
                    ...snap.doc.data()
                })
            })
            setIglesias(datosIgle)
        }

        traerDatos()

    }, [refFire])

    return (
        <div>
            <Link to="/iglesias/add">Crear</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nro</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    iglesias.map((iglesia)=> (
                        <tr>
                            <td>1</td>
                            <td>Emmanuel</td>
                            <td>1</td>
                            <td>Calle 14</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Iglesias