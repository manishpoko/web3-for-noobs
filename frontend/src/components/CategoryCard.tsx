
import { Link } from "react-router-dom"

interface CategoryCard{
    title: string;
    description: string;
    slug: string;

}



export default function CategoryCard(categoryCard: CategoryCard) {

    return (
        <Link to= {`/categories/${categoryCard.slug}`}>
            this is the {categoryCard.title} card!
        </Link>

    )

}