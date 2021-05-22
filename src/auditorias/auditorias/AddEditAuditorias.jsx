import { useEffect, useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestore } from 'reactfire'
import { toast } from 'react-toastify'
import Select from 'react-select';

const schema = yup.object().shape({
    fecha: yup.string().required('Es requerido'),
    activo: yup.boolean(),
    iglesia_id: yup.string(),
    iglesia: yup.object().shape({
        id: yup.string(),
        nombre: yup.string(),
        direccion: yup.string(),
        telefono: yup.string(),
    }),
    actual: yup.boolean(),
    createdAt: yup.date().default(function (){
        return new Date();
    }),
  });

  const AddEdditAuditorias = ({history, match})=> {

    const { id } = match.params;
    const isAddMode = !id;
    const refFirestore = useFirestore(); 

    const { register, handleSubmit, control, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const [iglesias, setIglesias] = useState([])

    useEffect(() =>{
        const traerDatos = async () =>{
           const snapshots = await refFirestore.collection('iglesias').get()
           const temporales = []
           snapshots.docs.forEach( (doc) => {
                const elem = {
                    id: doc.id,     
                    ...doc.data(),
                    value: doc.id,
                    label: doc.data().nombre 
                }
                temporales.push(elem)
           })
           setIglesias(temporales)
        }

        traerDatos()

    }, [refFirestore])

    const onSubmit = (datos)=> {
        return isAddMode
        ? crear (datos)
        : actualizar(id, datos)
    }

    const crear = async  (datos) =>{
        console.log(datos)
        await refFirestore.doc().set(datos)
        toast('Auditoria Creada con éxito')
        history.push('/auditorias')
    }

    const actualizar = async  (id, datos) =>{
        console.log(datos)
        await refFirestore.doc(id).set(datos)
        toast('Auditoria Editada con éxito')
        history.push('/auditorias')
    }

    const onCancelar = ()=> {
        history.push('/auditorias')
    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
        
                    <div className="input-gruop">
                            
                        <label>Fecha</label>
                        <input type="date" className="form-control" {...register('fecha')} />
                        { errors.nombre?.message}
                        
                    </div>
                    <div className="input-gruop">
                            
                        <label>Activo</label>
                        <input value="0" type="radio" {...register('activo')} />
                        <label>Inactivo</label>
                        <input value="1" type="radio" {...register('activo')} />

                    </div>
                    <div className="input-gruop">
                            
                            <label>Actual</label>
                            <input value="0" type="radio" {...register('actual')} />
                            <label>No actual</label>
                            <input value="1" type="radio" {...register('actual')} />
    
                    <Controller
                            name="iglesia"
                            control={control}
                            render={({ field }) => <Select 
                              {...field} 
                              options={iglesias} 
                        />}
                    />

                     </div>

                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default AddEdditAuditorias
