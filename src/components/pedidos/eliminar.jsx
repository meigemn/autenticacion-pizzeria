'use client'
import { eliminarPedido } from "@/lib/actions";
import { useActionState, useEffect, useId } from "react";



function PedidoEliminar({ pedido }) {

    const formId = useId()

    const [state, action, pending] = useActionState(eliminarPedido, {})

    useEffect(() => {
        if (state.success) {
            // toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state])

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-red-600">¿Desea eliminar los siguentes datos?</h1>
            <p>FECHA Y HORA: {new Date(pedido.fecha_hora).toLocaleString()}</p>
            <p>NOMBRE CLIENTE: {pedido.nombre_cliente}</p>
            <p>DIRECCIÓN CLIENTE: {pedido.direccion_cliente}</p>
            <form className="flex flex-col gap-4" action={action} id={formId}>
                <input type="hidden" name="id" defaultValue={pedido.id} />
                <button className="p-2 rounded-lg bg-indigo-500 text-white cursor-pointer">Eliminar</button>
            </form>
        </div>
    );
}

export default PedidoEliminar;