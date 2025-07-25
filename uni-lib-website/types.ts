export type bookOverviewType = {
    id: number,
    title: string,
    author: string,
    genre: string,
    rating: number,
    totalCopies: number,
    availableCopies: number,
    description: string,
    coverUrl: string
} 

export type bookDetailsType = {
    id: number,
    title: string,
    author: string,
    genre: string,
    rating: number,
    totalCopies: number,
    availableCopies: number,
    description: string,
    coverUrl: string,
    videoUrl: string,
    summary: string,
    isLoaned: boolean
}

export type bookCardType = {
    id: number,
    title: string,
    author: string,
    genre: string,
    coverUrl: string,
    isLoaned: boolean
}
export type bookListType = {
    bookListName: string,
    bookList: bookCardType[] 
}