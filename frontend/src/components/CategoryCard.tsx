
import { Link } from "react-router-dom"

interface CategoryCard{
    title: string;
    description: string;
    slug: string;

}



export default function CategoryCard(categoryCard: CategoryCard) {

    return (
        <Link className="bg-amber-600 rounded-xl flex flex-col justify-between  p-6 aspect-square" to= {`/categories/${categoryCard.slug}`}>
            {categoryCard.title} : this is the {categoryCard.title} card!
        </Link>

    )

}