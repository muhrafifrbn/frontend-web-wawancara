import React, {useState, useEffect} from 'react'
import Dashboard from '../template/Dashboard'
import { get } from '../utils/api'
import { sortLatedData } from '../utils/sortLatedData'
import Tabel from '../template/Tabel'
import useTitle from '../utils/useTitle'

function Logging() {
    useTitle('Logging - Dashboard');

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchData = async () => { 
        try {
            const response = await get('/logging/get-all-log');
            const sortedData = sortLatedData(response);
            setData(sortedData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching logging data:", error);
            setData([]);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        const refreshInterval = import.meta.env.VITE_REFRESH_INTERVAL || 10000;

        const refreshData = setInterval(() => {
            fetchData();
        }, refreshInterval);

        return () => clearInterval(refreshData);
    }, []);

    const headTable = [
        {judul: "User"},
        {judul: "Action"},
        {judul: "Timestamp"},
    ];

    const rendeerParentRow = (item, index) => (
        <tr className="bg-white border-b" key={item.id || index}>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900'>{item.full_name}</th>
            <td className='px-6 py-4 text-gray-900'>{item.action}</td>
            <td className='px-6 py-4 text-gray-900'>  {new Date(item.timestamp).toLocaleString('id-ID')}</td>
        </tr>
    )

    return (
        <Dashboard title="Logging">
            <Tabel 
                title="Logging"
                headers={headTable} 
                data={data}
                itemsPerPage={5}
                renderRow={rendeerParentRow}
            >
                {isLoading && (
                    <tr>
                        <td colSpan={headTable.length} className="text-center py-4">
                            Loading...
                        </td>
                    </tr>
                )}
            </Tabel>
        </Dashboard>
    )
}

export default Logging
