import React from 'react';
import { Link } from 'react-router-dom';

function Table() {
  return (
    <div className=" border-4 m-8 border-red-600">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-red-500">
              <thead className="bg-gray-50">
                <tr className='h-8'>
                  <th
                    scope="col"
                    className="text-center  text-sm font-medium text-gray-500 tracking-wider"
                  >
                    ReporteID
                  </th>
                  <th
                    scope="col"
                    className="text-center text-sm font-medium text-gray-500 tracking-wider"
                  >
                    AccidenteID
                  </th>
                  <th
                    scope="col"
                    className="text-center text-sm font-medium text-gray-500 tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className='h-12'>
                  <td className=" text-center text-sm font-medium text-gray-900">1</td>
                  <td className="text-center text-sm text-gray-500">23</td>
                  <td className="text-center text-sm font-medium">
                    <Link to="" className="mr-4 text-indigo-600 hover:text-indigo-900">
                      Ver
                    </Link>
                    <Link to="" className="text-indigo-600 hover:text-indigo-900">
                      Actualizar
                    </Link>
                  </td>
                  
                </tr>
              </tbody>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className='h-12'>
                  <td className=" text-center text-sm font-medium text-gray-900">1</td>
                  <td className="text-center text-sm text-gray-500">23</td>
                  <td className="text-center text-sm font-medium">
                    <Link to="" className="mr-4 text-indigo-600 hover:text-indigo-900">
                      Ver
                    </Link>
                    <Link to="" className="text-indigo-600 hover:text-indigo-900">
                      Actualizar
                    </Link>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
