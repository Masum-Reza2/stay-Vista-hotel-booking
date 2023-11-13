import { useSearchParams } from "react-router-dom";
import Container from "../Shared/Container"
import { categories } from "./CategoriesData"
import CategoryBox from "./CategoryBox"

const Categories = () => {

    // new things
    const [params, setParams] = useSearchParams();
    const selected = params.get('category');

    return (
        <Container>
            <div className="flex justify-between items-center overflow-x-auto">
                {
                    categories.map((category, index) => <CategoryBox category={category} key={index} selected={selected} />)
                }
            </div>
        </Container>
    )
}

export default Categories