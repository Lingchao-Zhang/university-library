import Image from "next/image"
import starIcon from "@/public/icons/star.svg"
import bookIcon from "@/public/icons/book.svg"
import { Button } from "../ui/button"
import { bookOverviewType } from "@/types"
import Link from "next/link"
const BookOverview = (
    {
        id,
        title,
        author,
        genre,
        rating,
        totalCopies,
        availableCopies,
        description,
        coverUrl
    }
: bookOverviewType) => {
    return(
        <section className="book-overview">
            <div className="flex flex-col gap-5">
                <Link href={`/bookDetails/${id}`}>
                    <h1 className="gap-6.5">{title}</h1>
                </Link>
                <div className="book-contents-block">
                    <div className="book-single-content">
                        <span className="text-20-normal-light-100">By: </span>
                        <span className="text-20-semibold-light-200">{author}</span>
                    </div>
                    <div className="book-single-content">
                        <span className="text-20-normal-light-100">Category: </span>
                        <span className="text-20-semibold-light-200">{genre}</span>
                    </div>
                    <div className="book-single-content">
                        <Image 
                         src={starIcon}
                         alt="star-icon"
                         height={22}
                         width={22}
                        />
                        <span className="text-20-semibold-light-200">{rating}</span>
                    </div>                   
                </div>
                <div className="book-contents-block">
                    <div className="book-single-content">
                        <span className="text-20-normal-light-100">Total books: </span>
                        <span className="text-20-semibold-light-200">{totalCopies}</span>
                    </div>
                    <div className="book-single-content">
                        <span className="text-20-normal-light-100">Available books: </span>
                        <span className="text-20-semibold-light-200">{availableCopies}</span>
                    </div>
                </div>
                <p className="text-20-normal-light-100">{description}</p>
                <Button className="book-overview-btn">
                    <Image 
                         src={bookIcon}
                         alt="star-icon"
                         height={20}
                         width={20}
                        />
                    <span className="btn-text">BORROW REQUEST</span>
                </Button>
            </div>
            <Image 
                src={coverUrl}
                alt="book-cover"
                height={400}
                width={300}
            />
        </section>
    )
}

export default BookOverview