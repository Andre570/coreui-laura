//import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestore } from 'reactfire'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const schema = yup.object().shape({
    id: yup.string(),
    nombre: yup.string().required('Es requerido'),
    codigo: yup.string(),
    zona: yup.string(),
    union_id: yup.string(),
    tesorero: yup.string(),
  });


const AddEdditAsociacion = ({history, match})=> {

    const { id } = match.params;
    const isAddMode = !id;
    const refFirestore = useFirestore().collection('asociaciones');

    const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        const traerDatos = async ()=> {
            const res = await (await refFirestore.doc(id).get()).data()
            const fields = ['nombre', 'codigo', 'presidente', 'pais']
            fields.forEach(field => setValue(field, res[field]))
        }

        if (!isAddMode)  {
            traerDatos()
        }

    }, [refFirestore, setValue, isAddMode, id])

    const onSubmit = (datos)=> {
        return isAddMode
        ? crear (datos)
        : actualizar(id, datos)
    }

    const crear = async  (datos) =>{
        console.log(datos)
        await refFirestore.doc().set(datos)
        toast('Asociacion Creada con éxito')
        history.push('/asociaciones')
    }

    const actualizar = async  (id, datos) =>{
        console.log(datos)
        await refFirestore.doc(id).set(datos)
        toast('Asociacion Editada con éxito')
        history.push('/asociaciones')
    }

    const onCancelar = ()=> {
        history.push('/asociaciones')
    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-gruop">
                            
                            <label>Id</label>
                            <input className="form-control" {...register('id')} />
                        </div>
                    <div className="input-gruop">
                            
                        <label>Nombre</label>
                        <input className="form-control" {...register('nombre')} />
                        { errors.nombre?.message}
                    </div>
                    <div className="input-gruop">
                            
                        <label>Código</label>
                        <input className="form-control" {...register('codigo')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Zona</label>
                        <input className="form-control" {...register('zona')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Asociacion_Id</label>
                        <input className="form-control" {...register('asociacion_id')} />
                    </div>
                    <div className="input-gruop">
                            
                        <label>Tesorero</label>
                        <input className="form-control" {...register('tesorero')} />
                    </div>

                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default AddEdditAsociacion