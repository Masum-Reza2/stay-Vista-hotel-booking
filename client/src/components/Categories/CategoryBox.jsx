import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom"

/* eslint-disable react/prop-types */
const CategoryBox = ({ category, selected }) => {
    const { label, icon: Icon } = category;

    //  introducing new hook
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();


    //  introducing new npm package queryString
    const handleClick = () => {
        let currentQuery = {}
        if (params) {
            currentQuery = queryString.parse(params.toString()); //converted the query into object
            // console.log(currentQuery)
            const updatedQuery = { ...currentQuery, category: label }
            // console.log(updatedQuery)

            const url = queryString.stringifyUrl({ //converting the object into query
                url: '/',
                query: updatedQuery,
            })
            // console.log(url)

            navigate(url);
        }
    }

    params.get('category')


    return (
        <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 ${selected === label ? 'border-b-2 border-black' : ''} hover:text-neutral-800 transition cursor-pointer`}>

            <Icon size={25} />
            <div className="text-sm font-medium">{label}</div>
        </div>
    )
}

export default CategoryBox