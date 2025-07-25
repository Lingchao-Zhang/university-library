import BookList from "@/components/bookComponents/BookList";
import BookOverview from "@/components/bookComponents/BookOverview";
import Image from "next/image";
import { sampleBooks } from "@/constants";
const Home= () => {
  return (
    <section>
      <BookOverview {...sampleBooks[0]}/>
      <BookList bookListName="Popular Books" bookList={sampleBooks} />
    </section>
  );
}

export default Home