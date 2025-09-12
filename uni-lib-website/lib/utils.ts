import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getNameInitial = (fullName: string) => {
  const nameArray = fullName.split(" ")
  let initial = ""
  nameArray.map((name: string) => {
    initial += name[0].toUpperCase()
  })

  return initial
}