import React from 'react';
import {Link} from 'react-router-dom';
import NavAdmi from './NavAdmi';
import {FiPlusCircle} from 'react-icons/fi';
import swal from 'sweetalert';

function Table() {
  const handleOnClick = () => {
      swal({
          title: '¿Esta seguro que desea eliminarlo?',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
      }).then((willDelete) => {
          if (willDelete) {
              swal('Se ha eliminado de manera correcta', {
                  icon: 'success',
              });
          } else {
              swal('Operacion cancelada');
          }
      });
  };

  return (
      <div>
          <NavAdmi />
          <h2 className="m-10 text-2xl">Gestion de Ambulancias</h2>
          <div className="m-8 flex justify-end">
              <Link to="/alta">
                  <FiPlusCircle color="red" size="40" />
              </Link>
              <div></div>
          </div>
          <div className="m-8 border-4 border-red-600">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                          <table className="min-w-full divide-y divide-red-500">
                              <thead className="bg-gray-50">
                                  <tr className="h-8">
                                      <th
                                          scope="col"
                                          className="text-center text-sm font-medium tracking-wider text-gray-500"
                                      >
                                          AmbulanciaID
                                      </th>
                                      <th
                                          scope="col"
                                          className="text-center text-sm font-medium tracking-wider text-gray-500"
                                      >
                                          Patente
                                      </th>
                                      <th
                                          scope="col"
                                          className="text-center text-sm font-medium tracking-wider text-gray-500"
                                      >
                                          Inventario
                                      </th>
                                      <th
                                          scope="col"
                                          className="text-center text-sm font-medium tracking-wider text-gray-500"
                                      >
                                          VTV
                                      </th>
                                      <th
                                          scope="col"
                                          className="text-center text-sm font-medium tracking-wider text-gray-500"
                                      >
                                          Seguro
                                      </th>
                                      <th
                                          scope="col"
                                          className="text-center text-sm font-medium tracking-wider text-gray-500"
                                      >
                                          Paramedico
                                      </th>
                                      <th
                                          scope="col"
                                          className="text-center text-sm font-medium tracking-wider text-gray-500"
                                      >
                                          Chofer
                                      </th>
                                      <th
                                          scope="col"
                                          className="text-center text-sm font-medium tracking-wider text-gray-500"
                                      >
                                          Acciones
                                      </th>
                                      
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                  <tr className="h-12">
                                      <td className="text-center text-sm font-medium text-gray-900">
                                          1
                                      </td>
                                      <td className="text-center text-sm text-gray-500">
                                          AB763HB
                                      </td>
                                      <td className="text-center text-sm text-gray-500">
                                          TRUE
                                      </td>
                                      <td className="text-center text-sm text-gray-500">
                                          FALSE
                                      </td>
                                      <td className="text-center text-sm text-gray-500">
                                          TRUE
                                      </td>
                                      <td className="text-center text-sm text-gray-500">
                                          Carlos Martinez
                                      </td>
                                      <td className="text-center text-sm text-gray-500">
                                          Pedro Sanchez
                                      </td>
                                      <td className="text-center text-sm font-medium">
                                          <Link
                                              to=""
                                              className="mr-4 text-indigo-600 hover:text-indigo-900"
                                          >
                                              Ver
                                          </Link>
                                          <Link
                                              to=""
                                              className="mr-4 text-indigo-600 hover:text-indigo-900"
                                          >
                                              Modificar
                                          </Link>
                                          <Link
                                              to=""
                                              onClick={handleOnClick}
                                              className="mr-4 text-indigo-600 hover:text-indigo-900"
                                          >
                                              Eliminar
                                          </Link>
                                      </td>
                                  </tr>
                              </tbody>
                            
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Table;
