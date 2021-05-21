import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestore } from 'reactfire'
import { toast } from 'react-toastify'

const schema = yup.object().shape({
    nro: yup.string().required('Es requerido'),
    nombre: yup.string(),
    codigo: yup.string(),
    presidente: yup.string(),
    pais: yup.string(),
  });


const AddEdditDistrito = ({history, match})=> {

    const { id } = match.params;
    const isAddMode = !id;
    const refFirestore = useFirestore().collection('distritos');

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
        toast('Distrito Editado con éxito')
        history.push('/distritos')
    }

    const actualizar = async  (id, datos) =>{
        console.log(datos)
        await refFirestore.doc(id).set(datos)
        toast('Distrito Editado con éxito')
        history.push('/distritos')
    }

    const onCancelar = ()=> {
        history.push('/distritos')
    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-gruop">
                            
                            <label>Nro</label>
                            <input className="form-control" {...register('nro')} />
                            { errors.nombre?.message}
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
                            
                            <label>zona</label>
                            <input className="form-control" {...register('zona')} />
                    </div>
                    <div className="input-gruop">
                            
                            <label>asociacion_id</label>
                            <input className="form-control" {...register('asociacion_id')} />
                    </div>
                    <div className="input-gruop">
                            
                            <label>pastor</label>
                            <input className="form-control" {...register('pastor')} />
                    </div>
                    <div className="input-gruop">
                            
                            <label>tesorero</label>
                            <input className="form-control" {...register('tesorero')} />
                    </div>
                    <button className="btn btn-primary" type="submit">Guardar</button>
                    <button className="btn btn-warning" type="button" onClick={() => onCancelar()}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}

export default AddEdditDistrito