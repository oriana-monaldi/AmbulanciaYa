import React from 'react';

const Skeleton = ({columns = 8, rows = 5}) => {
    return (
        <div className="m-8 border-4 border-red-600 rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-50">
                    <tr className="h-8">
                        {Array(columns)
                            .fill(0)
                            .map((_, index) => (
                                <th key={`skeleton-header-${index}`} className="px-4 py-2">
                                    <div className="h-4 animate-pulse rounded bg-gray-200"></div>
                                </th>
                            ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {Array(rows)
                        .fill(0)
                        .map((_, rowIndex) => (
                            <tr key={`skeleton-row-${rowIndex}`} className="h-12">
                                {Array(columns)
                                    .fill(0)
                                    .map((_, colIndex) => (
                                        <td key={`skeleton-cell-${rowIndex}-${colIndex}`} className="px-4 py-2">
                                            <div className="h-4 animate-pulse rounded bg-gray-200"></div>
                                        </td>
                                    ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Skeleton;
