import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestore } from 'reactfire'
import { toast } from 'react-toastify'

const schema = yup.object().shape({
    id: yup.string(),
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
    createAt: yup.date(). default(function () {
    }),
  });

  

const AddEdditUnion = ({history, match})=> {

    const { id } = match.params;
    const isAddMode = !id;
    const refFirestore = useFirestore().collection('uniones');

    const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })
