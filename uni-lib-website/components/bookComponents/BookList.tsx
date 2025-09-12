import { bookCardType, bookListType } from "@/types"
import BookCard from "./BookCard"

const BookList = (
    {
        bookListName,
        bookList 
    }: bookListType
) => {
    return(
        <section className="mt-16">
            <h1 className="text-30-semibold-light-100">{bookListName}</h1>
            <ul className="book-list">
                {
                    bookList.map((book: bookCardType) => <BookCard key={book.id} {...book}/>)
                }
            </ul>
        </section>
    )
}

export default BookList