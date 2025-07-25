import { bookCardType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import calenderIcon from "@/public/icons/calendar.svg"
const BookCard = (
    {
        id,
        title,
        author,
        genre,
        coverUrl,
        isLoaned
    }: bookCardType
) => {
    return(
        <li className="book-card">
            <Image 
             src={coverUrl}
             alt="book-cover"
             width={144}
             height={200}
            />
            <Link href={`/bookDetails/${id}`} className="book-card-title text-20-semibold-white ">
                {title} - By {author}
            </Link>
            <span className="text-16-regular-italic-light-100 line-clamp-1">{genre}</span>
            {
                isLoaned && 
                <div className="mt-3">
                    <div className="flex gap-2 mb-2.5">
                        <Image 
                        src={calenderIcon}
                        alt="calendar"
                        width={20}
                        height={20}
                        />
                        <span className="text-14-regular-light-100">11 days left to return</span>
                    </div>
                    <button className="book-card-btn">DOWNLOAD RECEIPT</button>
                </div>
            }
        </li>
    )
}

export default BookCard